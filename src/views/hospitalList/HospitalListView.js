import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Region from './Region';
import Hospital from './Hospital';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#D81A4C',
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  main: {
    marginTop: 20,
    marginBottom: 40,
  },
});

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>בתי חולים</Text>
  </View>
);


class HospitalListView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView horizontal={false} style={styles.main}>
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
        </ScrollView>
      </View>
    );
  }
}

export default HospitalListView;
