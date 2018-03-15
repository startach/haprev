import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'
import RegisterView from '../register/RegisterView'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

class Profile extends Component{
    render(){
        return(
            <RegisterView user={this.props.user} title="פרטי משתמש" actionTitle="עדכן"       
          onAction = {(user) => {console.log(user); this.props.navigation.navigate('Home')}} />
        )}
}

const mapStateToProps =state =>{ 
    return ({
                user:state.user.user
            })
}

export default connect(mapStateToProps)( Profile)