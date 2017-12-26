import React, { Component } from 'react';
import { Text, View, ScrollView, Image,TouchableOpacity } from 'react-native';
import styles from './RegisterViewStyles'
import RegisterInput from './RegisterInputField';

const RegisterView = () =>(
  <View style= {styles.container}>
    <Image style={styles.background} source={require('../../images/bg.jpg')}>
    <View><Image style = {styles.backIcon} source ={require('../../images/back.png')} /></View>
    <View style={styles.userView}>
      <TouchableOpacity>
        <Image style = {styles.userImage} source ={require('../../images/EmptyUserIcon.png')} />
      </TouchableOpacity>
      <Text style={styles.title}>חשבון חדש</Text>
    </View>
    <RegisterInput/>
    </Image>
  </View>
);

export default RegisterView;
