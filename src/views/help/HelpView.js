import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../app/Header';
import { style } from 'expo/src/Font';
import { Hoshi } from 'react-native-textinput-effects';
import { MaterialDialog } from 'react-native-material-dialog';

class HelpView extends Component {
  constructor(props) {
    super(props);
    this.state = { fullName: '', email:'', content:'', visiblePopup: false
    ,fullNameValidate:true ,emailValidate:true ,contentValidate:true};
  }

  clearFields(){
    this.setState({fullName : ''}); this.setState({email : ''}); this.setState({content : ''});
  }

  Validation(){
      email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      alph_regex = /^.{1,}$/
      valid=true; 
      if(!alph_regex.test(this.state.fullName)){ 
        this.setState({fullNameValidate:false});
        valid=false;
      }  
      else
        this.setState({fullNameValidate:true});
      if(!email_regex.test(this.state.email.trim())){
        this.setState({emailValidate:false});
        valid=false;
      }
      else
        this.setState({emailValidate:true});
      if(!alph_regex.test(this.state.content)){
        this.setState({contentValidate:false});
        valid=false;
      }
      else
        this.setState({contentValidate:true});
      return valid;
  }
  render() { 
    const { navigation, avatar } = this.props;
    return (
      <View style={styles.container}>
         <Header style={{marginBottom:100}}
          caption="עזרה"
          userAvatar={avatar}
          navigation={navigation}
          />
        <View style={styles.titlesContaine}>
          <Text style={styles.title}>נתקלת בבעיה? צריך עזרה?</Text>
          <Text style={styles.subtitle}>בדיוק בשביל זה אנחנו פה! {"\n"} שלח לנו הודעה ונחזור אליך בהקדם.</Text>
        </View>
        <View style={styles.formContainer}>
            <Hoshi
                ref="fullName"
                label="שם מלא"
                borderColor={'#D81A4C'}
                value= {this.state.fullName}
                onChangeText={ (text) => this.setState({fullName:text}) }
                inputStyle={{paddingRight:25, color:'black' }}
                style={!this.state.fullNameValidate ? styles.errorField : null}
                returnKeyType = {"next"}
                maxLength = {25}
                numberOfLines = {1}
            />
            <Hoshi
                ref="email"
                label="אימייל" 
                value= {this.state.email}
                onChangeText={ (text) => this.setState({email:text}) }
                borderColor={'#D81A4C'}
                inputStyle={{paddingRight:25, color:'black' }}
                style={!this.state.emailValidate ? styles.errorField : null}
                returnKeyType = {"next"}
                maxLength = {35}
                numberOfLines = {1}
            />
            <Hoshi
                ref="content"
                label="תוכן" 
                value= {this.state.content}
                onChangeText={ (text) => this.setState({content:text}) }
                isMultiline={true}
                borderColor={'#D81A4C'}
                inputStyle={{paddingRight:25, color:'black' }}
                style={[styles.multiLineInput,!this.state.contentValidate ? styles.errorField : null]}
                returnKeyType = {"done"}
                multiline = {true}
                maxLength = {120}
                numberOfLines = {4}
            />
            <View style={[styles.buttonsContainer,{paddingBottom:50}]}>
              <TouchableOpacity rounded style={styles.registerButton} 
                onPress={ () => { this.Validation() ? this.setState({visiblePopup : true}) : null } } 
                 style={styles.bottunStyle}>
                <Text style={{color:'white',fontSize: 28, fontFamily: 'Roboto_medium',fontWeight: 'bold',textAlign:'center'}}>שלח</Text>
              </TouchableOpacity>
            </View>
          </View>

          <MaterialDialog
            title="ההודעה נשלחה בהצלחה!"
            titleColor='#D81A4C'
            colorAccent='#D81A4C'
            okLabel="אוקי"
            cancelLabel=''
            visible={this.state.visiblePopup}
            onOk={() => { this.clearFields(); this.setState({ visiblePopup: false }); navigation.goBack(); } }
            onCancel={() => { this.setState({ visiblePopup: false }); navigation.goBack(); } }
          >
            <Text style={{textAlign:'center',alignItems: 'flex-end'}}>
              {this.state.fullName} 
              {"\n"} 
              צוות מהפכה של שמחה יענה בהקדם
            </Text>        
          </MaterialDialog>
        </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer:{
    flex: 1, 
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginRight: 30,
    marginLeft: 30,
  },
  bottunStyle:{
    width:200,
    padding:10, 
    backgroundColor:'#D81A4C',
     borderRadius:15,
     alignSelf:'center'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontFamily: 'Roboto_medium', 
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginTop: 20 
  },
  titlesContainer: {
      padding: 20,
      paddingBottom:10,
  }, 
  subtitle: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 22,
      fontFamily: 'Roboto_medium',
      textAlign: 'center',
      color: 'black'
  },
  errorField: {
    borderRadius: 8,
    borderWidth : 1,
    borderColor:'red' 
  },
  multiLineInput:{
    marginBottom:20,
  }
});

export default HelpView;
