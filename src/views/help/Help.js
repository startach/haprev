import React, { Component } from 'react'
import HelpView from './HelpView'
import { connect } from 'react-redux'
import * as firebase from 'firebase';

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
    let currDate =new Date().toJSON().slice(0,10);
    let res = await firebase.database().ref('contactUs').child(currDate).push()
        .set({
            name: first + ' ' + last, 
            email: email,
            content: content
        })
        .then(() => {return 'ok'})
        .catch(error => {console.log('Data could not be saved.',error); return 'err'});
    return res
}

const mapStateToProps = state =>{
return ({
           first:state.user.user.first,
           last:state.user.user.last,
           email:state.user.user.email,
        })
}

export default connect(mapStateToProps)(Help)