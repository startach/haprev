import React, { Component } from 'react';
//import { StyleSheet, Text, View, Button } from 'react-native';
import {Container,Header,Title,Left,Body,Right} from 'native-base';
import Region from './Region';


class HospitalListView extends Component{
  render(){
    return (
      <Container>
        <Header>
          <Left />
          <Body><Title>בתי חולים</Title></Body>
          <Right />
        </Header>
        <Region name="צפון" />
        <Region name="מרכז" />
        <Region name="דרום" />
      </Container>
    );
  }
}

export default HospitalListView;
