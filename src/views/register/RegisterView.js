import React from 'react';
import {Text, View, Image, ImageBackground,ScrollView, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform} from 'react-native';
import styles from './RegisterViewStyles';
import RegisterInput from './RegisterInputField';
import { ImagePicker } from 'expo';
import * as Permissions from 'expo-permissions'
import {registerForPushNotificationsAsync} from '../notification/NotificationService'
import Toast from 'react-native-easy-toast';
import {showToast} from '../../utils/taost';

const FIRSTNAME = 'first';
const LASTNAME = 'last';
const PHONE = 'phone';
const EMAIL = 'email';
const PASSWORD = 'password';
const AVATAR_URL = 'avatarUrl';

class RegisterView extends React.Component {
    constructor(props) {
      super(props);
  
      this.focusNextField = this.focusNextField.bind(this);

      this.inputs = {};
      this.base64Img = null;
      this.state = {
          disabled: true,
          first: this.props.user.first || null,
          last: this.props.user.last || null,
          phone: this.props.user.phone || null,
          password: this.props.user.password || null,
          email: this.props.user.email || null,
          avatarUrl: this.props.user.avatarUrl || null,
          spinner: false,
          firstValidate:this.props.user.first ? true : false,
          lastValidate: this.props.user.last ? true : false,
          phoneValidate: this.props.user.phone ? true : false,
          passwordValidate: this.props.user.password ? true : false,
        };
    }
  
    focusNextField(id) {
      this.inputs[id].focus();
    }

    validField=(text,len) => { return text && text.length > len }

    validateFirst=(value) => {
        if(this.validField(value,0)){
            disabled = !this.state.lastValidate || !this.state.phoneValidate || !this.state.passwordValidate
            this.setState({first:value,firstValidate:true,disabled:disabled})
        }
        else
            this.setState({first:value,firstValidate:false,disabled:true})
    }

    validateLast=(value) => {
        if(this.validField(value,0)){
            disabled = !this.state.firstValidate || !this.state.phoneValidate || !this.state.passwordValidate
            this.setState({last:value,lastValidate:true,disabled:disabled})
        }
        else
            this.setState({last:value,lastValidate:false,disabled:true})
    }

    validatePhone=(value) => {
        if(this.validField(value,9)){
            disabled = !this.state.firstValidate || !this.state.lastValidate || !this.state.passwordValidate
            this.setState({phone:value,phoneValidate:true,disabled:disabled})
        }
        else
            this.setState({phone:value,phoneValidate:false,disabled:true})
    }

    validatePassword=(value) => {
        if(this.validField(value,3)){
            disabled = !this.state.firstValidate || !this.state.lastValidate || !this.state.phoneValidate 
            this.setState({password:value,passwordValidate:true,disabled:disabled})
        }
        else
            this.setState({password:value,passwordValidate:false,disabled:true})
    }

    validateEmail=(value) => {
            disabled = !this.state.firstValidate || !this.state.lastValidate || !this.state.phoneValidate || !this.state.passwordValidate
            this.setState({email:value,disabled:disabled})
    }

    getAvatarImage(){
        const avatarImage = this.state.avatarUrl ? 
            (<Image style={styles.userImage} source={{ uri: this.state.avatarUrl }} />) 
            : 
            (<Image
                style={styles.emptyUserImage}
                source={require('../../images/emptyUserIcon.png')}
            />);
        return (<TouchableOpacity onPress={this.pickImage}>{avatarImage}</TouchableOpacity>)
    }

    pickImage = async () => {
        let cameraPermission = true;
        if (Platform.OS === "ios"){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            cameraPermission = status === 'granted';
        }
        if(cameraPermission){
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images 
            });
            
            if (!pickerResult.cancelled) {
                const disabled = !this.state.firstValidate || !this.state.lastValidate || !this.state.phoneValidate || !this.state.passwordValidate
                this.setState({ avatarUrl: pickerResult.uri, disabled: disabled});
                let base64Img = `data:image/jpg;base64,${pickerResult.base64}`
                this.base64Img = base64Img;
            }
        } else {
            alert('אתה חייב לאשר גישה ללוח השנה של המכשיר בכדי לעדכן אותו');
        }
    };

    updateAvatar = async () =>{
        this.setState({spinner: true})
        let userFolder = this.state.email || this.state.phone;
        try {
            newAvatarUrl = await this.props.onUploadImage(userFolder,this.base64Img);
            this.setState({ avatarUrl: newAvatarUrl });
        } catch (e) {
            alert('Upload failed',e);
        }
        finally{
            this.setState({spinner: false})
        }      
    };
    
    handlePress = async ()=>{
            if(this.base64Img)
                await this.updateAvatar();
            let user = {...this.props.user};
            user[FIRSTNAME] = this.state.first;
            user[LASTNAME] = this.state.last;
            user[PHONE] = this.state.phone;
            user[EMAIL] = this.state.email || null;
            user[AVATAR_URL] = this.state.avatarUrl || null;
            user[PASSWORD] = this.state.password
            let register = await this.props.onAction(user);
            if(!register)
                showToast(this.refs, 'מספר הפלאפון קיים במערכת');
            else if(this.props.registerScreen){
                let notificationSettingsUser = await registerForPushNotificationsAsync()
                await this.props.updateNotificationSettingUser(notificationSettingsUser)
            }
    }

    render() {
      return(
        <ImageBackground style={styles.background} source={require('../../images/backGround.jpg')}>
        <KeyboardAvoidingView style={styles.topContainer} behavior="padding">
            <ScrollView horizontal={false} style={{flex:1}}>
            {this.props.registerScreen ?<View style={{height:25}}/>:null}        
                <View style={styles.userView}>
                    { this.getAvatarImage() }
                    <Text style={styles.title}>{this.props.title}</Text>
                    {this.props.registerScreen ? 
                    <TouchableOpacity onPress={ () => this.props.signIn()}>
                        <Text style={styles.signIn}>משתמש רשום?</Text>
                    </TouchableOpacity>
                    :null}
                </View>
                <RegisterInput placeholder="שם פרטי"
                    value={this.props.user.first}
                    ref={input => {this.inputs[FIRSTNAME] = input;}}
                    editable
                    onChangeText={(value) => this.validateFirst(value)}
                    onSubmitEditing={() => {this.focusNextField(LASTNAME);}}
                    iconName='user-circle'/>
                <RegisterInput placeholder="שם משפחה"
                    value={this.props.user.last}
                    ref={input => {this.inputs[LASTNAME] = input;}}
                    editable
                    onChangeText={(value) => this.validateLast(value)}
                    onSubmitEditing={() => {this.focusNextField(PHONE);}}
                    iconName='user-circle'/>
                <RegisterInput placeholder='מספר טלפון'
                    value={this.props.user.phone}
                    keyboardType='phone-pad'
                    ref={input => {this.inputs[PHONE] = input;}}
                    editable={this.props.registerScreen}
                    onChangeText={(value) => this.validatePhone(value)}
                    onSubmitEditing={() => {this.focusNextField(PASSWORD);}}
                    iconName='phone-square'/>
                <RegisterInput placeholder='סיסמה (לפחות 4 תווים)'
                    value={this.props.user.password}
                    keyboardType='phone-pad'
                    ref={input => {this.inputs[PASSWORD] = input;}}
                    editable
                    onChangeText={(value) => this.validatePassword(value)}
                    onSubmitEditing={() => {this.focusNextField(EMAIL);}}
                    iconName='shield'/>
                <RegisterInput placeholder='כתובת דוא"ל'
                    value={this.props.user.email}
                    keyboardType='email-address'
                    ref={input => {this.inputs[EMAIL] = input;}}
                    editable
                    returnKeyType={"done"}
                    onChangeText={(value) => this.validateEmail(value)}
                    onSubmitEditing={() => {}}
                    iconName='envelope-square'/>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        rounded
                        title={this.props.actionTitle} 
                        disabled={this.state.disabled} 
                        style={[styles.registerButton, this.state.disabled ? { backgroundColor:'#c6c6c6'} : { }] }
                        onPress={ this.handlePress}
                        >
                        {
                        !this.state.spinner ?
                        <Text style={styles.registerButtonText}>{this.props.actionTitle}</Text>
                        :
                        <ActivityIndicator size='large' color='#fff' /> 
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        <Toast ref="toast" style={{backgroundColor:'#555'}} opacity={0.8}/>
        </ImageBackground>
    );}
};

export default RegisterView;