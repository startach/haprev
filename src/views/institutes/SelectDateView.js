import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const SelectDateView = ({vols}) =>
 (
  <ScrollView style={styles.container}>
    <Calendar
      onDayPress={this.onDayPress}
      style={styles.calendar}
      hideExtraDays
      markedDates={vols}
      hideArrows
      markingType={'period'}
    />
  </ScrollView>
)

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
