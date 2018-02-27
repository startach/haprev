<<<<<<< HEAD
import React, { Component } from 'react'
import HelpView from './HelpView'
import { connect } from 'react-redux'
import {HelpRequest} from '../../services'

class Help extends Component{
    render(){
        return(
        <HelpView 
            first={this.props.first} 
            last={this.props.last} 
            email={this.props.email}
            navigation={this.props.navigation}
        />
        )}
}

helpReqHandler = async (first,last,email,content) => {
    return await HelpRequest(first,last,email,content);
}

const mapStateToProps = state =>{
return ({
           first:state.user.user.first,
           last:state.user.user.last,
           email:state.user.user.email,
        })
}

export default connect(mapStateToProps)(Help)
=======
import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Help = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be Help screen </Text>
        </View>
    )
}

export default Help
>>>>>>> 6f83c1c3d0a5c3f9c80ee9fde336779a17c9172c
