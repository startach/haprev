import React, { Component } from 'react'
import RegisterView from './RegisterView'
import { connect } from 'react-redux'
import { register } from '../../store/modules/user';
import { uploadImageHandler } from './RegisterService';
class Register extends Component{
    render(){
        return(
        <RegisterView 
            user={this.props.user} 
            title="חשבון חדש" 
            actionTitle="הרשמה"
            onAction = {(user) => {this.props.register(user)}}
            onUploadImage = {uploadImageHandler}            
            />
        )};
};

const mapStateToProps = state => {
    return ({
            user:state.user.user
        })
}

export default connect(mapStateToProps, { register })( Register)