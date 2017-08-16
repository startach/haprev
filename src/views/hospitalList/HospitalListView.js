import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import _ from 'lodash';
import Header from '../../app/Header';
import Region from './Region';
import Hospital from './Hospital';


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

class HospitalListView extends Component {
  render() {
    const { navigation, avatar, hospitals } = this.props;

    const regions = _.groupBy(hospitals, 'region');
    const res = _.map(regions, (hospitalsInRegion, region) => {
      const hospitalsElemnts = _.map(hospitalsInRegion, hospital => (
        <Hospital
          key={hospital.id}
          name={hospital.name}
          city={hospital.city}
          pictureUrl={hospital.pictureUrl}
        />
      ));
      return (
        <Region
          name={region}
          key={region}
        >
          {hospitalsElemnts}
        </Region>
      );
    });

    return (
      <View style={styles.container}>
        <Header
          caption="בחר בית חולים"
          userAvatar={avatar}
          navigation={navigation}
        />

        <ScrollView horizontal={false} style={styles.main}>
          {res}
        </ScrollView>
      </View>
    );
  }
}

export default HospitalListView;
