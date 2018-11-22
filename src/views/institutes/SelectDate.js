import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectDateView from './SelectDateView';
import {addUserToEvent} from '../../store/modules/events'
import {addEventToUser} from '../../store/modules/user'

class SelectDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventDates:'',
      events:'',
    };
}
  async componentWillMount(){
    eventsObj = this.props.events
    let eventDates={}
    let eventsArray={}
    if(eventsObj){
      eventsArray = Object.keys(eventsObj).map(key => {return eventsObj[key]})
      eventDates = eventsArray.map(event => {return event.fullFormatDate.slice(0, 10)})
      eventDates = await eventDates.reduce((datesObj,date,i) => {
        if(datesObj[date])
          datesObj[date]['dots'].push({key:'event'+i, color: '#fff'})
        else
          datesObj[date] = {dots: [{key:'event'+i, color: '#fff'}], selected: true}
        return datesObj
      }, {});
    }
    this.setState({events:eventsArray,eventDates:eventDates})
  }

  openEventView = (event) =>{
    const {params} = this.props.navigation.state
    hospitalName = params.hospitalName
    this.props.navigation.navigate('EventView',
    {
        event:this.props.events[event.id],
        hospital:hospitalName,
        adminActivityScreen: false,
        addEventToUser: this.props.addEventToUser,
        addUserToEvent: this.props.addUserToEvent,
        userId:this.props.userId,
        appId:this.props.appId,
        fullName:this.props.fullName,
        updateParticipants: this.updateParticipants,
    })
  }

  updateParticipants = (eventId)=>{
    return this.props.events[eventId].participants
  }

  render() {
    return (
      <SelectDateView
        navigation = {this.props.navigation}
        events={this.state.events} 
        eventDates={this.state.eventDates}
        openEventView={this.openEventView}
      />
    );
  }

}

mapStateToProps = state =>{
  return {
    events:state.events.events,
    userId:state.user.user.userId,
    appId:state.user.user.appId,
    fullName:state.user.user.first + ' ' + state.user.user.last,
  }
}

export default connect (mapStateToProps, {addEventToUser, addUserToEvent})(SelectDate);