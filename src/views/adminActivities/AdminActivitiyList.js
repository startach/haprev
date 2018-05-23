import React from 'react'
import AdminActiviyListView from './AdminActivitiyListView'
import { connect } from 'react-redux'
import {getEvents,addNewActivity,deleteActivity} from '../../store/modules/events'
import {getHospitalName, makeArrayFromObjects, makeArrayParticipants, sortArrayByDate} from './AdminActivitiesService'

class AdminActivitiyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          hospitalName: '',
          displayCreateEventDialog: false,
          events:'',
          participants:'',
          reload:false,
        };
    }
    async componentWillMount(refreshDatabase) {
        this.setState({reload:true})
        let _hospitalName = this.state.hospitalName
        if(!_hospitalName)
            _hospitalName = await getHospitalName(this.props.coordinator)
        if(this.props.eventsStatus===null || refreshDatabase){
            let res = await this.props.onGetEvents(this.props.coordinator)
            if(res=='ok')
                this.eventsDataHandle(_hospitalName)
            else if(res=='err')
                alert('בעיה במסד הנתונים, נסה שנית מאוחר יותר')
        }
        else if(this.props.eventsStatus==='')
            this.eventsDataHandle(_hospitalName)            
    }

    eventsDataHandle(_hospitalName){
        eventsArray = makeArrayFromObjects(this.props.events)
        eventsArray = sortArrayByDate(eventsArray)
        let participantsArray = makeArrayParticipants(eventsArray)
        this.setState({
            events:eventsArray,
            participants:participantsArray,
            hospitalName:_hospitalName,
            reload:false,
        })
    }

    openEventView = async (event,participants) =>{
        this.props.navigation.navigate('AdminActivity',
        {
            event,
            participants,
            hospital:this.state.hospitalName,
            onDeleteActivity: this.props.deleteActivity.bind(this),
            onRefresh: this.refreshScreen.bind(this),
        })
    }

    createActivityView = (first,last)=>{
        appId = this.props.appId;
        coordinator = this.props.coordinator;
        this.props.navigation.navigate('CreateActivity',
        {
            first,
            last,
            hospital:this.state.hospitalName,
            appId,
            coordinator,
            addNewActivity: this.props.addNewActivity.bind(this),
            onRefresh: this.refreshScreen.bind(this),
        })
    }

    async refreshScreen(refreshDatabase){
        await this.componentWillMount(refreshDatabase)
    }

    render() {
        const {navigation:{navigate}} =this.props;
        return (
            <AdminActiviyListView 
                events= {this.state.events} 
                participants={this.state.participants}
                openEventView={this.openEventView}
                createActivityView={this.createActivityView}
                displayDialog = {this.state.displayCreateEventDialog}
                firstName = {this.props.first}
                lastName = {this.props.last}
                avatarUrl={this.props.avatarUrl}
                myHospital = {this.state.hospitalName}
                navigation = {this.props.navigation}
                reload = {this.state.reload}
                onRefreshList={this.refreshScreen.bind(this)}
            />
        )
    }
}
const mapStateToProps = state =>{
    return ({
               first: state.user.user.first,
               last: state.user.user.last,
               coordinator: state.user.user.coordinator,
               appId: state.user.user.appId,
               avatarUrl: state.user.user.avatarUrl,
               events:state.events.events,
               eventsStatus:state.events.status,
            })
}

const mapDispatchToProps = dispatch => {
    return {
        onGetEvents: (instituteId) => dispatch(getEvents(instituteId)),
        addNewActivity: (activityName,appId,coordinator,date,time,fullFormatDate) => dispatch(addNewActivity(activityName,appId,coordinator,date,time,fullFormatDate)),
        deleteActivity: (activityId) => dispatch(deleteActivity(activityId)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AdminActivitiyList)