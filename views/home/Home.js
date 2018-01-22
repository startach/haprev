import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  main: {
    marginTop: 20,
    marginBottom: 40,
  },
});

class Home extends Component {
  
  render() {
    retrun (
        <View>
            <Text>This will be Home Screen</Text>
        </View>
    )}
}

export default Home;
