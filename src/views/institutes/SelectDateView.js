import React, {Component} from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import isEmpty from 'lodash/isEmpty'
import EventOptions from './EventOptions'

class SelectDateView extends Component{
  state = {pressEvents: false}

  onDayPress = (day,events,openEventView) =>{
    if(!isEmpty(events)){
      let dayPressEvents=  events.filter(event => { return event.fullFormatDate.slice(0, 10) == day.dateString })
      if(dayPressEvents.length>1){
        return <EventOptions events={dayPressEvents} openEventView={openEventView} />
      }
      else if(dayPressEvents.length==1){
        return <EventOptions events={dayPressEvents} openEventView={openEventView} />
      }
    } 
    return null
  }

  render() {
    const {events,eventDates,openEventView} = this.props
    return (
    <View style={styles.container}>
      { eventDates ?
      <ScrollView style={styles.container}>
        <CalendarList 
          onDayPress={(day) => {res = this.onDayPress(day,events,openEventView); this.setState({pressEvents:res})}}
          style={styles.calendar}
          hideExtraDays
          markedDates={eventDates}
          markingType={'multi-dot'}
          horizontal={true}
          showScrollIndicator={true}
        />
      { isEmpty(eventDates) ?
        <Text style={styles.messageBox}> אין פעילויות זמינות כרגע בבית חולים זה </Text>
        :
        this.state.pressEvents
      }
      </ScrollView>
      :
      <ActivityIndicator size='large' color='#C2185B'/> 
      }
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4B7BA',
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350,
  },
  messageBox: {
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
    marginHorizontal: "10%",
    width: "80%",
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    color: '#C2185B',
    borderColor:'#C2185B',
    backgroundColor: '#fff',
  },
});

export default SelectDateView;
