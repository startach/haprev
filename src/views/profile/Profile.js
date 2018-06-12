import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'
import RegisterView from '../register/RegisterView'
import { connect } from 'react-redux'
import { update } from '../../store/modules/user';
import { uploadImageHandler } from '../register/RegisterService';

class Profile extends Component{
    render(){
        return(
            <RegisterView 
            user={this.props.user} 
            title="פרטי משתמש" 
            actionTitle="עדכן"       
            onAction = {async(user) => {return await this.props.update(user)}}
            onUploadImage = {uploadImageHandler}            
        />
        )};
}

const mapStateToProps = state =>{ 
    return ({
        user:state.user.user
    })
}

export default connect(mapStateToProps, {update})( Profile)