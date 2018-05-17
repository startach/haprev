import React from 'react'
import AdminActiviyListView from './AdminActivitiyListView'
import { connect } from 'react-redux'
import {getHospitalName, getEvents, makeArrayFromObjects, makeArrayParticipants,getUserAvatar} from './AdminActivitiesService'

class AdminActivitiyList extends React.Component  {
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
        let _events = await getEvents(this.props.coordinator)
        eventsArray = makeArrayFromObjects(_events)
        let participantsArray = makeArrayParticipants(_events)
        this.setState({
            events:eventsArray,
            participants:participantsArray,
            hospitalName:_hospitalName
        })
    }

    openEventView = async (event,participants) =>{
        avatarsArray=[]
        phonesArray=[]
        for (var i in participants){
            userInfo = await getUserAvatar(participants[i].appId)
            avatarsArray.push(userInfo.avatarUrl)
            phonesArray.push(userInfo.phone)
        }
        this.props.navigation.navigate('AdminActivity',{event,participants,avatarsArray,phonesArray})
    };

    async refreshScreen(){
        await this.componentWillMount()
    }

    createActivityView = (first,last,hospital)=>{
        appId = this.props.appId;
        coordinator = this.props.coordinator;
        this.props.navigation.navigate('CreateActivity',{first,last,hospital,appId,coordinator,onRefresh: this.refreshScreen.bind(this)});
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
               avatarUrl: state.user.user.avatarUrl
            })
    }
    
export default connect(mapStateToProps)(AdminActivitiyList)