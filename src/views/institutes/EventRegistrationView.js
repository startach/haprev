import React, {Component} from 'react'
import {View, Text, Modal, TouchableOpacity, ActivityIndicator} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from '../adminActivities/styles' 
import { FontAwesome } from '@expo/vector-icons';

class EventRegistrationView extends Component{
    state = {displayCancelEventDialog: false,};

    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});
    
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.showCancelEventDialog}>
                    <View style={[styles.cancelButton,{backgroundColor:'#009B77'}]}>
                        <Text style={styles.cancelText}>הרשם להתנדבות</Text>
                        <FontAwesome style={[styles.cancelIcon,{backgroundColor:'#009B77'}]} name='thumbs-up' size={30}/>
                    </View>
                </TouchableOpacity>
                <Modal
                    transparent
                    visible={this.state.displayCancelEventDialog}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({displayCancelEventDialog:true})}
                    >
                    { !this.props.registarProcess ?
                    <View style={modalStyles.modalContainer}>
                            <Text style={[modalStyles.title,{color:'white'}]}> האם להירשם לההתנדבות? {'\n'} </Text>
                            <View style={modalStyles.buttonsContainer}>
                                <TouchableOpacity
                                    rounded
                                    style={modalStyles.modalButton}
                                    onPress={() => {this.hideCancelEventDialog()}}
                                    >
                                    <Text style={modalStyles.modalRegistarButtonText}>ביטול</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    rounded
                                    style={[modalStyles.modalButton,{backgroundColor:'#009B77'}]}
                                    onPress={() => { }}
                                    >
                                    <Text style={modalStyles.modalRegistarButtonText}>הירשם</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    :
                    <View style={modalStyles.modalContainer}>
                        <Text style={[modalStyles.title,{color:'white'}]}> רושם להתנדבות... {'\n'} </Text>
                        <ActivityIndicator size='large' color='white'/> 
                    </View>
                    }
                </Modal>

            </View>
        )
    }
}

export default EventRegistrationView