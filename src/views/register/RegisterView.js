import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
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
      <RegisterInput placeholder="שם משתמש"
      imageSource={require('../../images/person_icon.png')}/>
      <RegisterInput placeholder='כתובת דוא"ל'
      imageSource={require('../../images/email_icon.png')}/>
      <RegisterInput placeholder="סיסמה חדשה"
      secured={true}
      imageSource={require('../../images/password_icon.png')}/>
      <RegisterInput placeholder="חזור על הסיסמה"
      secured={true}
      imageSource={require('../../images/password_retype_icon.png')}/>
      <View style={styles.buttonsContainer}>
        <Button rounded danger style={styles.registerButton} onPress={() => this.props.navigation.navigate('LoggedIn')}                        >
          <Text style={styles.buttonText}>הרשמה</Text>
        </Button>
      </View>
    </Image>
  </View>
);

export default RegisterView;
