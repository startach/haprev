import React, { Component } from 'react'
import RegisterView from './RegisterView'
import { connect } from 'react-redux'
import { register, signInWithAnotherDevice, updateNotificationSettingUser } from '../../store/modules/user';
import { uploadImageHandler } from './RegisterService';

class Register extends Component{

    signIn = () => {
        this.props.navigation.navigate('SignIn', {signInWithAnotherDevice: this.props.signInWithAnotherDevice});
    }

    render(){
        return(
        <RegisterView 
            user={this.props.user} 
            title="חשבון חדש" 
            actionTitle="הרשמה"
            onAction = {async(user) => { return await this.props.register(user)}}
            updateNotificationSettingUser = {async(sttings) => { return await this.props.updateNotificationSettingUser(sttings)}}
            onUploadImage = {uploadImageHandler}
            registerScreen={true}
            signIn={this.signIn}
            />
        )};
};

const mapStateToProps = state => {
    return ({
            user:state.user.user
        })
}

export default connect(mapStateToProps, { register, signInWithAnotherDevice, updateNotificationSettingUser })( Register)