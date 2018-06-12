import React, { Component } from 'react'
import RegisterView from './RegisterView'
import { connect } from 'react-redux'
import { register, signInWithAnotherDevice } from '../../store/modules/user';
import { uploadImageHandler } from './RegisterService';

class Register extends Component{

    signIn = () => {
        console.log('SignInSignInSignIn')
        this.props.navigation.navigate('SignIn', {signInWithAnotherDevice: this.props.signInWithAnotherDevice});
    }

    render(){
        return(
        <RegisterView 
            user={this.props.user} 
            title="חשבון חדש" 
            actionTitle="הרשמה"
            onAction = {async(user) => { return await this.props.register(user)}}
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

export default connect(mapStateToProps, { register, signInWithAnotherDevice })( Register)