import React, {Component} from 'react'
import {View, Text, Modal, TouchableOpacity, ActivityIndicator,Dimensions,TextInput} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from './styles' 
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

class AdminActivityView extends Component{
    state = {
        displayCancelEventDialog: false,
        displaySendMessagesDialog:false,
        msg:'',
        resSendMessages:''
    };

    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});

    showSendMessagesDialog = () => 
        this.setState({displaySendMessagesDialog: true})

    hideSendMessagesDialog = () => 
        this.setState({displaySendMessagesDialog: false});

    render() {
        return (
            <View>
                <TouchableOpacity onPress={async() =>{ await this.props.createEventOnDeviceCalendar()}}>
                    <View style={[styles.cancelButton,{backgroundColor:'#4283F2',alignSelf: 'center',marginTop: 20}]}>
                        <Text style={[styles.cancelText,{fontSize:18,marginBottom:3}]}>עדכן בלוח שנה</Text>
                        <FontAwesome style={[styles.cancelIcon,{backgroundColor:'transparent'}]} name='calendar-o' size={25}/>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.showCancelEventDialog}>
                    <View style={[styles.cancelButton,{width:width*0.5}]}>
                        <Text style={[styles.cancelText,{fontSize:18}]}>בטל התנדבות</Text>
                        <FontAwesome style={styles.cancelIcon} name='trash' size={25}/>
                    </View>
                </TouchableOpacity>
                { this.state.resSendMessages==='' ?
                <TouchableOpacity onPress={this.props.emptyList ? ()=> {alert('אין מתנדבים לפעילות זו')} : this.showSendMessagesDialog }>
                    <View style={[styles.cancelButton,{backgroundColor:'#009B77',width:width*0.5}]}>
                        <View style={{flexDirection: 'column',alignSelf: 'center',}}>
                            <Text style={[styles.cancelText,{fontSize:16}]}>שלח הודעה</Text>
                            <Text style={[styles.cancelText,{fontSize:16}]}> למתנדבים</Text>
                        </View>
                        <FontAwesome style={styles.cancelIcon} name='comments' size={25}/>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>{}}>
                    { this.state.resSendMessages==='ok' ?
                    <View style={[styles.cancelButton,{backgroundColor:'#009B77',width:width*0.5}]}>
                        <View style={{flexDirection: 'column',alignSelf: 'center'}}>
                            <Text style={[styles.cancelText,{fontSize:16}]}> הודעה{'\n'}נשלחה</Text>
                        </View>
                        <FontAwesome style={styles.cancelIcon} name='check' size={25}/>
                    </View>
                    :
                    <View style={[styles.cancelButton,{backgroundColor:'#b30000',width:width*0.5}]}>
                        <View style={{flexDirection: 'column',alignSelf: 'center'}}>
                            <Text style={[styles.cancelText,{fontSize:16}]}> שגיאה{'\n'}בשליחה</Text>
                        </View>
                        <FontAwesome style={styles.cancelIcon} name='times-circle' size={25}/>
                    </View>
                    }
                </TouchableOpacity>
                }
                </View>
                <Modal
                    transparent
                    visible={this.state.displayCancelEventDialog}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({displayCancelEventDialog:true})}
                    >
                    { !this.props.process ?
                    <View style={modalStyles.modalContainer}>
                            <Text style={[modalStyles.title,{color:'#fff'}]}> האם לבטל את ההתנדבות? {'\n'} </Text>
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
                        <Text style={[modalStyles.title,{color:'#fff'}]}> מבטל התנדבות... {'\n'} </Text>
                        <ActivityIndicator size='large' color='#fff'/> 
                    </View>
                    }
                </Modal>
                <Modal
                    transparent
                    visible={this.state.displaySendMessagesDialog}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({displaySendMessagesDialog:true})}
                    >
                    { !this.props.process ?
                    <View style={[modalStyles.modalContainer]}>
                            <Text style={[modalStyles.title,{color:'#fff'}]}> שלח הודעה למתנדבים {'\n'} </Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder= 'הודעה'
                                underlineColorAndroid='transparent'
                                onChangeText={ (text) => { this.setState({msg:text}) } }
                                value={this.state.msg}
                                maxLength={60}
                            />
                            <View style={[modalStyles.buttonsContainer,{marginBottom:15}]}>
                            <TouchableOpacity
                                rounded
                                style={[modalStyles.modalButton,{backgroundColor:'#009B77'}]}
                                onPress={this.state.msg.length>0 ? 
                                    async() => {
                                    res = await this.props.SendMessageForAll(this.state.msg)
                                    this.setState({resSendMessages:res})
                                    this.hideSendMessagesDialog()
                                    }
                                    : 
                                    () => {}
                                }
                                >
                                <Text style={modalStyles.modalButtonText}>שלח הודעה</Text>
                            </TouchableOpacity>
                                <TouchableOpacity
                                    rounded
                                    style={modalStyles.modalButton}
                                    onPress={() => {this.hideSendMessagesDialog()}}
                                    >
                                    <Text style={modalStyles.modalButtonText}>ביטול</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    :
                    <View style={modalStyles.modalContainer}>
                        <Text style={[modalStyles.title,{color:'#fff'}]}> שולח הודעות... {'\n'} </Text>
                        <ActivityIndicator size='large' color='#fff'/> 
                    </View>
                    }
                </Modal>
            </View>
        )
    }
}

export default AdminActivityView