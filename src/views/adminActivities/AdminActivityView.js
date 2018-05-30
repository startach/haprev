import React, {Component} from 'react'
import {View, Text, Modal, TouchableOpacity, ActivityIndicator,Dimensions} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from './styles' 
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

class AdminActivityView extends Component{
    state = {displayCancelEventDialog: false,};

    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});
    
    render() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.showCancelEventDialog}>
                    <View style={[styles.cancelButton,{width:width*0.5}]}>
                        <Text style={[styles.cancelText,{fontSize:18}]}>בטל התנדבות</Text>
                        <FontAwesome style={styles.cancelIcon} name='trash' size={25}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={{}}>
                    <View style={[styles.cancelButton,{backgroundColor:'#009B77',width:width*0.5}]}>
                        <View style={{flexDirection: 'column',alignSelf: 'center',}}>
                            <Text style={[styles.cancelText,{fontSize:16}]}>שלח הודעה</Text>
                            <Text style={[styles.cancelText,{fontSize:16}]}> למתנדבים</Text>
                        </View>
                        <FontAwesome style={styles.cancelIcon} name='comments' size={25}/>
                    </View>
                </TouchableOpacity>
                </View>
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