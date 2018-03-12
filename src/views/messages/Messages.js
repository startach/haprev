import React, { Component } from 'react'
import {View, Text, TouchableOpacity, Modal } from 'react-native';
import MessagesView from './MessagesView'
import { connect } from 'react-redux'
import {messageResult, readMessagesRes,readMessagesReq} from '../../store/modules/messages'
import {ReadMessage} from '../../services'

class Messages extends Component{
    componentDidMount(){
        this.props.onMessageResult(Expo.Constants.deviceId);
    }

    readMessageHandler = async (msgId) => {
        await this.props.onReadMessagesReq();
        res = await ReadMessage(msgId);
        if(res.status==='ok')
            await this.props.onReadMessagesRes(msgId);
    }

    render(){
        return(
            this.props.messages[0] ?
                <MessagesView messages={this.props.messages} navigation={this.props.navigation} onReadMessageHandler={this.readMessageHandler}/>  
                : 
                null
            )
    }
}

const mapStateToProps = (state) => {
    return ({
            messages: state.messages.messages,
            })
}

const mapDispatchToProps = dispatch => {
    return {
        onMessageResult: (appId) => dispatch(messageResult(appId)),
        onReadMessagesReq: () => dispatch(readMessagesReq()),
        onReadMessagesRes: (msgId) => dispatch(readMessagesRes(msgId)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Messages)