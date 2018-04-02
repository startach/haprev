import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'
import RegisterView from '../register/RegisterView'
import { connect } from 'react-redux'
import { update } from '../../store/modules/user';

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

class Profile extends Component{
    render(){
        return(
            <RegisterView user={this.props.user} title="פרטי משתמש" actionTitle="עדכן"       
          onAction = {(user) => {
            //   console.log('Profile.js updating user:', user);
              this.props.update(user)}} />
        )}
}

const mapStateToProps = state =>{ 
    // console.log('Profile.js: Current redux storage', state.user)
    return ({
        user:state.user.user
    })
}

export default connect(mapStateToProps, {update})( Profile)