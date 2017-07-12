import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Header, Title, Left, Body, Right } from 'native-base';
import Region from './Region';
import Hospital from './Hospital';


class HospitalListView extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body><Title>בתי חולים</Title></Body>
          <Right />
        </Header>
        <Region name="בצפון הארץ" >
          <Hospital
            name="מרכז רפואי בני ציון"
            city="חיפה"
            pictureUrl=""
          />
          <Hospital
            name="בית חולים  ממשלתי פוריה"
            city="טבריה"
            pictureUrl=""
          />
        </Region>
        <Region name="במרכז הארץ" />
        <Region name="בדרום הארץ" />
      </Container>
    );
  }
}

export default HospitalListView;
