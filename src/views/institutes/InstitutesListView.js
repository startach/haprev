import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import _ from 'lodash';
import Region from './Region';
import Institute from './Institute'

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

class InstitutesListView extends Component {
  
  render() {
    const { institutes, onInstSelected } = this.props;

    const regions = _.groupBy(institutes, 'region');
    const res = _.map(regions, (hospitalsInRegion, region) => {
      const hospitalsElemnts = _.map(hospitalsInRegion, hospital => (
        <Institute
          key={hospital.id}
          id={hospital.id}
          name={hospital.name}
          city={hospital.city}
          pictureUrl={hospital.pictureUrl}
          instituteSelected={onInstSelected}
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
        <ScrollView horizontal={false} style={styles.main}>
          {res}
        </ScrollView>
      </View>
    );
  }
}

export default InstitutesListView;
