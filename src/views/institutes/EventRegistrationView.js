import React, {Component} from 'react'
import {View, Text, Modal, TouchableOpacity, ActivityIndicator,Dimensions,ToastAndroid} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from '../adminActivities/styles' 
import { FontAwesome } from '@expo/vector-icons';
const { width } = Dimensions.get('screen');

class EventRegistrationView extends Component{
    state = {
        displayCancelEventDialog: false,
    }
    
    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});

    registration= async()=>{
        res = await this.props.registerUserEventHandler()
        if(res!=='ok')
            alert("שגיאה בהרשמה, אנא נסה שנית מאוחר יותר")
        this.hideCancelEventDialog()
    }

    render() {
        return (
            <View>
                { this.props.registeredNow ? 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={async() =>{ await this.props.createEventOnDeviceCalendar()}}>
                        <View style={[styles.cancelButton,{width:width*0.333,backgroundColor:'#4283F2',flexDirection:'column',alignSelf: 'center'}]}>
                            <Text style={[styles.cancelText,{fontSize:14,marginBottom:3}]}>עדכן בלוח שנה</Text>
                            <FontAwesome style={[styles.cancelIcon,{backgroundColor:'transparent'}]} name='calendar-o' size={20}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => ToastAndroid.show('אתה כבר רשום לפעילות זו', ToastAndroid.SHORT)}>
                        <View style={[styles.cancelButton,{width: width*0.333,backgroundColor:'#009B77',flexDirection:'column',alignSelf: 'center'}]}>
                            <Text style={[styles.cancelText,{fontSize:14,marginBottom:3}]}>נרשמת לפעילות</Text>
                            <FontAwesome style={[styles.cancelIcon,{backgroundColor:'transparent'}]} name='check-circle' size={20}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Institutes');this.props.navigation.navigate('HomeRoute')}}>
                        <View style={[styles.cancelButton,{width: width*0.333,backgroundColor:'#C2185B',flexDirection:'column',alignSelf: 'center'}]}>
                            <Text style={[styles.cancelText,{fontSize:14,marginBottom:3}]}>חזור למסך הבית</Text>
                            <FontAwesome style={[styles.cancelIcon,{backgroundColor:'transparent'}]} name='home' size={20}/>
                        </View>
                    </TouchableOpacity>
                </View>
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