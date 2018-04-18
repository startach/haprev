import React, { Component } from 'react';
import { Button, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import styles from './RegisterViewStyles';
import RegisterInput from './RegisterInputField';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
{/* https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580 */}
{/* https://medium.com/reactnative/tabbing-through-input-fields-ef283f923ab1 */}

const FIRSTNAME = 'first';
const LASTNAME = 'last';
const PHONE = 'phone';
const EMAIL = 'email';
const AVATAR_URL = 'avatarUrl';

function notEmpty(s) {return s && s.length > 0}

class RegisterView extends React.Component {
    constructor(props) {
      super(props);
  
      this.focusNextField = this.focusNextField.bind(this);
      this.updateField = this.updateField.bind(this);
      this.validInput = this.validInput.bind(this);

      this.inputs = {};
      this.base64Img = null;
      this.state = {
          disabled: true,
          first: this.props.user.first,
          last: this.props.user.last,
          phone: this.props.user.phone,
          email: this.props.user.email,
          avatarUrl: this.props.user.avatarUrl,
          spinner: false
        };
    }
  
    focusNextField(id) {
      this.inputs[id].focus();
    }
  
    validInput() {
        return notEmpty(this.state.first) &&
            notEmpty(this.state.last) &&
            notEmpty(this.state.phone);
    }
    
    updateField(key, value) {
        let obj = {};
        obj[key] = value;
        this.setState(obj);
        this.setState({disabled: !this.validInput()});
    }

    pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images 
        });
        
        if (!pickerResult.cancelled) {
            console.log("avatarUrl:", pickerResult.uri)
            this.setState({ avatarUrl: pickerResult.uri, disabled: false});
            let base64Img = `data:image/jpg;base64,${pickerResult.base64}`
            this.base64Img = base64Img;
        }
    };

    updateAvatar = async () =>{
        this.setState({spinner: true})
        try {
            //Cloudinary api
            let apiUrlUpload = 'https://api.cloudinary.com/v1_1/startach/image/upload';
            let userFolder = this.state.email || this.state.phone;
            let dataUp = {
                "file": this.base64Img,
                "upload_preset": 'atuhnhof',
                "public_id": userFolder + '_' + Date.now(),
                "folder": 'avatars/' + userFolder ,
            }
            
            await fetch(apiUrlUpload, {
            body: JSON.stringify(dataUp),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            })
            .then( response => {
            let data = response._bodyText
            let newAvatarUrl = JSON.parse(data).secure_url;
            console.log("Avatar URL:",newAvatarUrl);
            this.setState({ avatarUrl: newAvatarUrl });
            })
            .catch(err => console.log(err))
            
        } catch (e) {
            console.log(e);
            alert('Upload failed',e);
        }
        finally{
            this.setState({spinner: false})
        }      
    };

    render() {
      return(
        <ImageBackground style={styles.background} source={require('../../images/backGround.jpg')}>
        <KeyboardAvoidingView
            style={styles.topContainer}
            behavior="padding">
            <View style={styles.userView}>
                <TouchableOpacity onPress={this.pickImage}>
                    { this.state.avatarUrl ? 
                        <Image style = {styles.userImage} source={{ uri: this.state.avatarUrl }} />
                        :
                        <Image style = {styles.emptyUserImage} source = {require('../../images/emptyUserIcon.png')} />  
                    }
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <RegisterInput placeholder="שם פרטי"
                value={this.props.user.first}
                ref={input => {this.inputs[FIRSTNAME] = input;}}
                onChangeText={(value) => this.updateField(FIRSTNAME, value)}
                onSubmitEditing={() => {this.focusNextField(LASTNAME);}}
                imageSource={require('../../images/personIcon.png')}/>
            <RegisterInput placeholder="שם משפחה"
                value={this.props.user.last}
                ref={input => {this.inputs[LASTNAME] = input;}}
                onChangeText={(value) => this.updateField(LASTNAME, value)}
                onSubmitEditing={() => {this.focusNextField(PHONE);}}
                imageSource={require('../../images/personIcon.png')}/>
            <RegisterInput placeholder='מספר טלפון'
                value={this.props.user.phone}
                keyboardType='phone-pad'
                ref={input => {this.inputs[PHONE] = input;}}
                onChangeText={(value) => this.updateField(PHONE, '' + value)}
                onSubmitEditing={() => {this.focusNextField(EMAIL);}}
                imageSource={require('../../images/phoneIcon.png')}/>
            <RegisterInput placeholder='כתובת דוא"ל'
                value={this.props.user.email}
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
                    onPress={ async () => {
                        if(this.base64Img)
                            await this.updateAvatar();
                        let user = {...this.props.user};
                        console.log("this.state.email",this.state.email)
                        user[FIRSTNAME] = this.state.first;
                        user[LASTNAME] = this.state.last;
                        user[PHONE] = this.state.phone;
                        user[EMAIL] = this.state.email || null;
                        user[AVATAR_URL] = this.state.avatarUrl || null;
                        this.props.onAction(user);
                    }}
                    >
                    {
                    !this.state.spinner ?
                    <Text style={styles.registerButtonText}>{this.props.actionTitle}</Text>
                    :
                    <ActivityIndicator size='large' color='white' /> 
                    }
                </TouchableOpacity>
            </View>
             <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
        </ImageBackground>
    );}
};

export default RegisterView;