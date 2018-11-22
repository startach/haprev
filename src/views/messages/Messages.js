import React, { Component } from 'react'
import MessagesView from './MessagesView'
import { connect } from 'react-redux'
import {readMessage} from '../../store/modules/user'

class Messages extends Component{
    readMessageHandler = async (msgId) => {
        await this.props.onReadMessage(msgId);
    }

    render(){
        let msgs = this.props.messages
        let messagesArr=null
        if(msgs)
            messagesArr=Object.keys(msgs).map(e => {return msgs[e]});
        return(
            <MessagesView
            loading={false}
            messages={messagesArr} 
            navigation={this.props.navigation} 
            onReadMessageHandler={this.readMessageHandler}
            />
           )
    }
}

const mapStateToProps = (state) => {
    return (
        state.user.user.messages ?  
        { messages: state.user.user.messages } : { messages: null } 
        )
}

const mapDispatchToProps = dispatch => {
    return {
        onReadMessage: (msgId) => dispatch(readMessage(msgId)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Messages)