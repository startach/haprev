import React from 'react'
import AdminActiviyListView from './AdminActivitiyListView'
import { connect } from 'react-redux'
import {getEvents,addNewActivity} from '../../store/modules/events'
import {getHospitalName, makeArrayFromObjects, makeArrayParticipants,getUserAvatar,sortArrayByDate} from './AdminActivitiesService'

class AdminActivitiyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          hospitalName: '',
          displayCreateEventDialog: false,
          events:'',
          participants:''
        };
    }
    async componentWillMount() {
        let _hospitalName = await getHospitalName(this.props.coordinator)
        if(this.props.eventsStatus===null){
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
        let participantsArray = makeArrayParticipants(this.props.events)
        this.setState({
            events:eventsArray,
            participants:participantsArray,
            hospitalName:_hospitalName
        })
    }

    openEventView = async (event,participants) =>{
        this.props.navigation.navigate('AdminActivity',{event,participants})
    };

    async refreshScreen(){
        await this.componentWillMount()
    }

    createActivityView = (first,last,hospital)=>{
        appId = this.props.appId;
        coordinator = this.props.coordinator;
        this.props.navigation.navigate('CreateActivity',
            {
                first,
                last,
                hospital,
                appId,
                coordinator,
                onRefresh: this.refreshScreen.bind(this),
                addNewActivity: this.props.addNewActivity.bind(this),
            });
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
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AdminActivitiyList)