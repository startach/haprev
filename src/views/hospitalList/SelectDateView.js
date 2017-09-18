import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const SelectDateView = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.text}>This will be select date View</Text>
    <Calendar
      onDayPress={this.onDayPress}
      style={styles.calendar}
      hideExtraDays
      markedDates={{
        '2017-09-17': [{ selected: false, marked: true }],
        '2017-09-18': [{ selected: true }],
        '2017-09-20': [{ startingDay: true, color: 'green' }],
        '2017-09-21': [{ endingDay: true, color: 'green', textColor: 'gray' }],
        '2017-09-22': [{ startingDay: true, endingDay: true, color: 'blue', textColor: 'white' }],
      }}
      hideArrows
      markingType={'interactive'}

    />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
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
});

export default SelectDateView;
