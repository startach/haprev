import React, { Component } from 'react';
import {View, Text, TouchableOpacity,TextInput,Keyboard,ScrollView,Modal,TouchableWithoutFeedback,KeyboardAvoidingView } from 'react-native';
import styles from './HelpViewStyle';

const ERRORMESSAGE = "יש להזין תוכן (לפחות 2 תווים)";
const SUCCESS_SEND = {title: "ההודעה נשלחה בהצלחה!", subtitle: "צוות מהפכה של שמחה יענה בהקדם"};
const FAIL_SEND ={title: "בעיה בשליחה!", subtitle: "נסה שוב מאוחר יותר"};

class HelpView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      content:'',
      modalVisible: false,
      contentValidate:true,
      isButtonDisabled:false,
      success:false,
    };
  }
  Validation(){
      alph_regex = /^.{2,}$/
      if(!alph_regex.test(this.state.content.trim())){
        this.setState({contentValidate:false});
        return false;
      }
      this.setState({contentValidate:true,isButtonDisabled:true});
      return true;
  }

 async SandMessage(){
    const { first, last, email } = this.props;
    res = await helpReqHandler(first, last, email, this.state.content)
    if(res.request ==='ok') 
      this.setState({success : true});
    this.setState({modalVisible : true});
  }

  render() { 
    const { first, last, email, navigation } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.titlesContainer}>
            <Text style={styles.title}>נתקלת בבעיה? צריך עזרה?</Text>
            <Text style={styles.subtitle}>בדיוק בשביל זה אנחנו פה! {"\n"} שלח לנו הודעה ונחזור אליך בהקדם.</Text>
          </View>
          <Text style={[styles.inputField,styles.untouchableField]}>{first + ' ' + last}</Text>
          <Text style={[styles.inputField,styles.untouchableField]}>{email}</Text>
          <TextInput
            ref="content"
            label="תוכן" 
            style={[styles.inputField,!this.state.contentValidate ? styles.errorField : null]}
            placeholder= "תוכן"
            underlineColorAndroid='transparent'
            onChangeText={ (text) => this.setState({content:text}) }
            value={this.state.content}
            maxLength={500}
            multiline = {true}
          />
          {!this.state.contentValidate ? <Text style={styles.errorMessage}>{ERRORMESSAGE}</Text> : <Text style={styles.errorMessage}> </Text>}
          <View style={{paddingBottom:50}}>
            <TouchableOpacity 
              rounded
              disabled = {this.state.isButtonDisabled}
              onPress={ () => { this.Validation() ? this.SandMessage(): null } } 
              style={styles.button}>
              <Text style={styles.buttonText}>שלח</Text>
          </TouchableOpacity>
          </View> 
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={this.state.modalVisible}
        animationType={'slide'}
        onRequestClose={() => this.setState({modalVisible:true})}
        >
        <View style={styles.modalContainer}>
          <Text style={[styles.title,{color:'white'}]}>{this.state.success ? SUCCESS_SEND.title : FAIL_SEND.title} </Text>
          <Text style={[styles.subtitle,{color:'white'}]}>{"\n"} {this.state.success ? SUCCESS_SEND.subtitle : FAIL_SEND.subtitle} {"\n"}  </Text>        
            <TouchableOpacity
              rounded
              style={styles.button}
              onPress={() => { this.state.success ? navigation.goBack() : this.setState({modalVisible:false,isButtonDisabled: false})}}
            >
            <Text style={styles.buttonText}>סגור</Text>
            </TouchableOpacity>
        </View>
      </Modal>
      </KeyboardAvoidingView> 
    );
  }
} 

export default HelpView;