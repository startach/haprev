import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import Region from './Region';
import Institute from './Institute'
import * as Animatable from 'react-native-animatable'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  main: {
    marginTop: 10,
    marginBottom: 10,
  },
});

class InstitutesListView extends Component {
  render() {
    const { institutes, onInstSelected } = this.props;

    const regions = groupBy(institutes, 'region');
    const res = map(regions, (hospitalsInRegion, region) => {
    const hospitalsElemnts = map(hospitalsInRegion, hospital => (
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
        <Animatable.View key={region} animation="flipInY" duration={1000} iterationCount={1}>
          <Region
            name={region}
            key={region}
          >
            {hospitalsElemnts}
          </Region>
        </Animatable.View>
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
