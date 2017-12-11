import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

var Dashboard = React.createClass({
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.slide}>
          <Text style={styles.text}>Picture 1</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Picture 2</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Picture 3</Text>
        </View>
      </Swiper>
    )
  }
})

export default Dashboard;
