import React, {Component} from 'react'
import {View, Text, Modal, TouchableOpacity, ActivityIndicator} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from './styles' 
import { FontAwesome } from '@expo/vector-icons';

class AdminActivityView extends Component{
    state = {displayCancelEventDialog: false,};

    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});

    
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.showCancelEventDialog}>
                    <View style={styles.cancelButton}>
                        <Text style={styles.cancelText}>בטל התנדבות</Text>
                        <FontAwesome style={styles.cancelIcon} name='trash' size={30}/>
                    </View>
                </TouchableOpacity>
                <Modal
                    transparent
                    visible={this.state.displayCancelEventDialog}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({displayCancelEventDialog:true})}
                    >
                    { !this.props.deleteProcess ?
                    <View style={modalStyles.modalContainer}>
                            <Text style={[modalStyles.title,{color:'white'}]}> האם לבטל את ההתנדבות? {'\n'} </Text>
                            <View style={modalStyles.buttonsContainer}>
                                <TouchableOpacity
                                    rounded
                                    style={modalStyles.modalButton}
                                    onPress={() => {this.props.deleteActivity()}}
                                    >
                                    <Text style={modalStyles.modalButtonText}>בטל התנדבות</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    rounded
                                    style={[modalStyles.modalButton,{backgroundColor:'#009B77'}]}
                                    onPress={() => { this.hideCancelEventDialog()}}
                                    >
                                    <Text style={modalStyles.modalButtonText}>השאר התנדבות</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    :
                    <View style={modalStyles.modalContainer}>
                        <Text style={[modalStyles.title,{color:'white'}]}> מבטל התנדבות... {'\n'} </Text>
                        <ActivityIndicator size='large' color='white'/> 
                    </View>
                    }
                </Modal>

            </View>
        )
    }
}

export default AdminActivityView