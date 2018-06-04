import React, {Component} from 'react'
import {View, Text, Modal, TouchableOpacity, ActivityIndicator} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from '../adminActivities/styles' 
import { FontAwesome } from '@expo/vector-icons';

class EventRegistrationView extends Component{
    state = {
        displayCancelEventDialog: false,
        alreadyRegistered:null,
    }
    
    async componentWillMount(){
        alreadyRegistered = await this.checkAlreadyRegistered(this.props.appId)
        this.setState({alreadyRegistered:alreadyRegistered})
    }

    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});

    checkAlreadyRegistered = async(appId) =>{
        participants = this.props.participants
        result = Object.keys(participants).filter(key => {return participants[key].appId===appId}) || []
        return result.length > 0
    }

    registration= async()=>{
        res = await this.props.registerUserEventHandler()
        if(res!=='ok')
            alert("שגיאה בהרשמה, אנא נסה שנית מאוחר יותר")
        this.hideCancelEventDialog()
        await this.componentWillMount()
    }

    render() {
        return (
            <View>
                {this.state.alreadyRegistered ? 
                <TouchableOpacity onPress={() => alert('אתה כבר רשום לפעילות זו')}>
                    <View style={[styles.cancelButton,{backgroundColor:'#009B77'}]}>
                        <Text style={styles.cancelText}>נרשמת לפעילות</Text>
                        <FontAwesome style={[styles.cancelIcon,{backgroundColor:'transparent'}]} name='check-circle' size={30}/>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this.showCancelEventDialog}>
                    <View style={[styles.cancelButton,{backgroundColor:'#009B77'}]}>
                        <Text style={styles.cancelText}>הרשם להתנדבות</Text>
                        <FontAwesome style={[styles.cancelIcon,{backgroundColor:'transparent'}]} name='thumbs-up' size={30}/>
                    </View>
                </TouchableOpacity>
                }
                <Modal
                    transparent
                    visible={this.state.displayCancelEventDialog}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({displayCancelEventDialog:true})}
                    >
                    { !this.props.process ?
                    <View style={modalStyles.modalContainer}>
                            <Text style={[modalStyles.title,{color:'white'}]}> האם להירשם לההתנדבות? {'\n'} </Text>
                            <View style={modalStyles.buttonsContainer}>
                                <TouchableOpacity
                                    rounded
                                    style={modalStyles.modalButton}
                                    onPress={() => {this.hideCancelEventDialog()}}
                                    >
                                    <Text style={modalStyles.modalRegisterButtonText}>ביטול</Text>
                                </TouchableOpacity> 
                                <TouchableOpacity
                                    rounded
                                    style={[modalStyles.modalButton,{backgroundColor:'#009B77'}]}
                                    onPress={async()=>await this.registration()}
                                    >
                                    <Text style={modalStyles.modalRegisterButtonText}>הירשם</Text>
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