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
          {/*
          <Region name="בצפון הארץ" >
            <Hospital
              name="מרכז רפואי בני ציון"
              city="חיפה"
              pictureUrl="https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a"
            />
            <Hospital
              name="בית חולים  ממשלתי פוריה"
              city="טבריה"
              pictureUrl="https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a"
            />
          </Region>
          <Region name="במרכז הארץ" >
            <Hospital
              name="איכילוב"
              city="תל אביב"
              pictureUrl="https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a"
            />
            <Hospital
              name="שניידר"
              city="פתח תקווה"
              pictureUrl="https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a"
            />
          </Region>
          <Region name="בדרום הארץ" />
          */}
        </ScrollView>
      </View>
    );
  }
}

export default HospitalListView;
