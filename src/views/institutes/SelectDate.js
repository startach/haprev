import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectDateView from './SelectDateView';
import {makeArrayFromObjects} from '../adminActivities/AdminActivitiesService'
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
    let eventDates={}; let eventsArray = {}
    if(eventsObj){
      eventsArray = Object.keys(eventsObj).map(key => {return eventsObj[key]})
      eventDates = eventsArray.map(event => {return event.fullFormatDate.slice(0, 10)})
      eventDates = await eventDates.reduce((datesObj,date,i) => {
        if(datesObj[date])
          datesObj[date]['dots'].push({key:'event'+i, color: 'white'})
        else
          datesObj[date] = {dots: [{key:'event'+i, color: 'white'}], selected: true}
        return datesObj
      }, {});
    }
    this.setState({events:eventsArray,eventDates:eventDates})
  }

  openEventView = async(event) =>{
    const {params} = this.props.navigation.state
    hospitalName = params.hospitalName
    let participantsArray = await makeArrayFromObjects(event.participants)
    this.props.navigation.navigate('EventView',
    {
        event,
        participants:participantsArray,
        hospital:hospitalName,
        adminActivityScreen: false
    })
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
    vols:state.institues.vols,
    events:state.events.events
  }
}

export default connect (mapStateToProps)(SelectDate);
