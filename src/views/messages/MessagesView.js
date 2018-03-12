import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './MessagesViewStyle';

class MessagesView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        modalVisible: true,
        };
  }

async messageAction(){
    await this.props.onReadMessageHandler(this.props.messages[0].id);
    this.setState({modalVisible:false});
    if(this.props.messages[0])
        this.setState({modalVisible:true});
  }

switchMessages(messages){
    return( 
        <View style={styles.modalContainer}>
        <Text style={[styles.title,{color:'white'}]}>  {messages[0].message}  </Text>
            <TouchableOpacity
                rounded
                style={styles.button}
                onPress={() => { this.messageAction()}}
                >
                <Text style={styles.buttonText}>קראתי</Text>
            </TouchableOpacity>
        </View>
        );
};

  render() { 
    const { messages, navigation } = this.props;
    return ( 
        <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            transparent
            onRequestClose={() => this.setState({modalVisible:true})}
            >
            {messages[0] ? this.switchMessages(messages) : null  }
       </Modal>
    );
  } 
};

export default MessagesView;