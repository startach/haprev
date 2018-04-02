import React, { Component } from 'react'
import {View, Text, TouchableOpacity, Modal } from 'react-native';
import MessagesView from './MessagesView'
import { connect } from 'react-redux'
import {readMessage} from '../../store/modules/user'

class Messages extends Component{

    readMessageHandler = async (msgId) => {
        await this.props.onReadMessage(msgId);
    }

    render(){
        let msgKey = Object.keys(this.props.messages);
        return(
            this.props.messages[msgKey[0]] ?
               <MessagesView message={this.props.messages[msgKey[0]]} navigation={this.props.navigation} onReadMessageHandler={this.readMessageHandler}/>  
               :
               null
           )
    }
}

const mapStateToProps = (state) => {
        return (
            state.user.user.messages ?  
            { messages: state.user.user.messages } : { messages: [] } 
            )
}

const mapDispatchToProps = dispatch => {
    return {
        onReadMessage: (msgId) => dispatch(readMessage(msgId)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Messages)