import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, FlatList, Modal,TouchableOpacity} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles } from './styles' 

const ParticipantItem = ({participant}) => {
    return <View style={styles.participantItem}>
        <View style={styles.img}></View>
        <Text>{participant.name}</Text>
    </View>
}

class AdminActivity extends Component
{
    state = {displayCancelEventDialog: false};
    
    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});

    deleteActivity = () =>{
        //todo delete the event
        console.log('todo - come on - really delete the event')
        this.hideCancelEventDialog();
        this.props.navigation.goBack();
    }
    
    render() {
        
        const {params} = this.props.navigation.state;
        const activity = params ? params.event : null;

        return (
            <View style={styles.container}>
                <Text style={styles.h2}> התנדבות {activity.date} </Text>
                <Text style={styles.h1}> לפעילות זו
                    רשומים {activity.participants ? activity.participants.length : 0} מתנדבים </Text>
                <FlatList data={activity.participants}
                          renderItem={({item}) => <ParticipantItem participant={item}/>}
                          keyExtractor={(item) => item.id}/>
                <View style={styles.bottomButtons}>
                    <Button style={styles.button} title="בטל התנדבות" onPress={this.showCancelEventDialog}/>
                </View>

                <Modal
                    transparent
                    visible={this.state.displayCancelEventDialog}
                    animationType={'slide'}
                >
                    <View style={modalStyles.modalContainer}>
                        <View>
                            <Text style={[modalStyles.title,{color:'white'}]}> האם לבטל את ההתנדבות? {"\n"} </Text>
                            <TouchableOpacity
                                rounded
                                style={modalStyles.modalButton}
                                onPress={() =>  this.deleteActivity()}
                                >
                                <Text style={modalStyles.modalButtonText}>בטל התנדבות</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                rounded
                                style={[modalStyles.modalButton,{backgroundColor:'green'}]}
                                //onPress={() => { this.setState({cancelDialogVisible:false});}}
                                onPress={() => { this.hideCancelEventDialog()}}
                                >
                                <Text style={modalStyles.modalButtonText}>השאר התנדבות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

export default AdminActivity