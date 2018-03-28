import React, { Component } from 'react';
import { Button, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './RegisterViewStyles';
import RegisterInput from './RegisterInputField';
import { connect } from 'react-redux';
import {YellowBox} from 'react-native';

{/* https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580 */}
{/* https://medium.com/reactnative/tabbing-through-input-fields-ef283f923ab1 */}

const FIRSTNAME = 'firstName';
const LASTNAME = 'lastName';
const PHONE = 'phone';
const EMAIL = 'email';

function notEmpty(s) {return s && s.length > 0}

class RegisterView extends React.Component {
    constructor(props) {
      super(props);
  
      this.focusNextField = this.focusNextField.bind(this);
      this.updateField = this.updateField.bind(this);
      this.validInput = this.validInput.bind(this);

      this.inputs = {};
      this.state = {disabled: true};
    }
  
    focusNextField(id) {
      this.inputs[id].focus();
    }
  
    validInput() {
        return notEmpty(this.state.firstName) &&
            notEmpty(this.state.lastName) &&
            notEmpty(this.state.phone);
    }
    
    updateField(key, value) {
        let obj = {};
        obj[key] = value;
        this.setState(obj);
        this.setState({disabled: !this.validInput()});
    }
    
    render() {
      return(
        <ImageBackground style={styles.background} source={require('../../images/backGround.jpg')}>
        <KeyboardAvoidingView
            style={styles.topContainer}
            behavior="padding">
            <View style={styles.userView}>
                <TouchableOpacity>
                <Image style = {styles.userImage} source ={require('../../images/emptyUserIcon.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <RegisterInput placeholder="שם פרטי"
                ref={input => {this.inputs[FIRSTNAME] = input;}}
                onChangeText={(value) => this.updateField(FIRSTNAME, value)}
                onSubmitEditing={() => {this.focusNextField(LASTNAME);}}
                imageSource={require('../../images/personIcon.png')}/>
            <RegisterInput placeholder="שם משפחה"
                ref={input => {this.inputs[LASTNAME] = input;}}
                onChangeText={(value) => this.updateField(LASTNAME, value)}
                onSubmitEditing={() => {this.focusNextField(PHONE);}}
                imageSource={require('../../images/personIcon.png')}/>
            <RegisterInput placeholder='מספר טלפון'
                keyboardType='phone-pad'
                ref={input => {this.inputs[PHONE] = input;}}
                onChangeText={(value) => this.updateField(PHONE, '' + value)}
                onSubmitEditing={() => {this.focusNextField(EMAIL);}}
                imageSource={require('../../images/phoneIcon.png')}/>
            <RegisterInput placeholder='כתובת דוא"ל'
                keyboardType='email-address'
                ref={input => {this.inputs[EMAIL] = input;}}
                returnKeyType={"done"}
                onChangeText={(value) => this.updateField(EMAIL, value)}
                onSubmitEditing={() => {}}
                imageSource={require('../../images/emailIcon.png')}/>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    rounded
                    title={this.props.actionTitle} 
                    disabled={this.state.disabled} 
                    style={[styles.registerButton, this.state.disabled ? { backgroundColor:'#c6c6c6'} : { }] }
                    onPress={() => {
                        let user = {};
                        user[FIRSTNAME] = this.state.firstName;
                        user[LASTNAME] = this.state.lastName;
                        user[PHONE] = this.state.phone;
                        user[EMAIL] = this.state.email;
                        this.props.onAction(user);
                    }}
                    >
                    <Text style={styles.registerButtonText}>{this.props.actionTitle}</Text>
                </TouchableOpacity>
            </View>
             <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
        </ImageBackground>
    );}
};

const mapStateToProps = (state) => {
  return (
    {
      avatar: state.user.user.avatar,
      firstName: state.user.user.firstName,
      lastName: state.user.user.lastName,
      phone: state.user.user.phone,
      email: state.user.user.email,
    }
  );
};
  
export default RegisterView;