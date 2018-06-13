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
    await this.props.onReadMessageHandler(this.props.message.id);
  }

  render() { 
    const { message } = this.props;
    return ( 
        <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            transparent
            onRequestClose={() => this.setState({modalVisible:true})}
            >
            <View style={styles.modalContainer}>
                <Text style={[styles.title,{color:'white'}]}>  {message.message}  </Text>
                <TouchableOpacity
                    rounded
                    style={styles.button}
                    onPress={() => { this.messageAction()}}
                    >
                    <Text style={styles.buttonText}>אישור</Text>
                </TouchableOpacity>
            </View>
       </Modal>
    );
  } 
};

export default MessagesView;