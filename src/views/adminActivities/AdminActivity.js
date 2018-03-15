import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, FlatList, Modal,TouchableOpacity} from 'react-native'
//import { MaterialDialog } from 'react-native-material-dialog';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-around',
    },
    h1:{
        textAlign:'center',
        fontSize:18,
        padding:10,
    },
    h2:{
        textAlign:'center',
        fontSize:16,
        paddingTop:30,
    },
    participantItem: {
        marginHorizontal: '10%',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopColor: '#333',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    img:{
        height: 40,
        width: 40,
        backgroundColor:'#080',
        margin: 5,
    },
    bottomButtons:{
        bottom:0,
    },
    button:{
        margin: 20
    },
    modalContainer: {
        marginTop: "40%",
        justifyContent: 'center',
        alignSelf:'center',        
        backgroundColor: 'grey',
        height:'50%',
        width: '90%',
        borderWidth:2,
        borderRadius:15,
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalButton:{
        width:200,
        margin:20,
        padding:10,
        backgroundColor:'#D81A4C',
        borderRadius:15,
        alignSelf:'center'
      },
      modalButtonText: {
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
      },
})

const ParticipantItem = ({participant}) => {
    return <View style={styles.participantItem}>
        <View style={styles.img}></View>
        <Text>{participant.name}</Text>
    </View>
}

class AdminActivity extends Component
{
    state = {cancelDialogVisible: false};
    cancelActivity() {
        this.setState({cancelDialogVisible: false});
        console.log('cancel activity');
    };

    render() {
        const {params} = this.props.navigation.state;
        const activity = params ? params.activity : null;


        const toggleCancelDialog = () => this.setState({cancelDialogVisible: true})

        return (
            <View style={styles.container}>
                <Text style={styles.h2}> התנדבות {activity.date} </Text>
                <Text style={styles.h1}> לפעילות זו
                    רשומים {activity.participants ? activity.participants.length : 0} מתנדבים </Text>
                <FlatList data={activity.participants}
                          renderItem={({item}) => <ParticipantItem participant={item}/>}
                          keyExtractor={(item) => item.id}/>
                <View style={styles.bottomButtons}>
                    <Button style={styles.button} title="בטל התנדבות" onPress={toggleCancelDialog}/>
                </View>

                <Modal
                    transparent
                    visible={this.state.cancelDialogVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({cancelDialogVisible:true})}
                >
                    <View style={styles.modalContainer}>
                        <View>
                            <Text style={[styles.title,{color:'white'}]}> האם לבטל את ההתנדבות? {"\n"} </Text>
                            <TouchableOpacity
                                rounded
                                style={styles.modalButton}
                                onPress={() => { this.setState({cancelDialogVisible:false}); this.cancelActivity(); this.props.navigation.goBack()}}
                                >
                                <Text style={styles.modalButtonText}>בטל התנדבות</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                rounded
                                style={[styles.modalButton,{backgroundColor:'green'}]}
                                onPress={() => { this.setState({cancelDialogVisible:false});}}
                                >
                                <Text style={styles.modalButtonText}>השאר התנדבות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

export default AdminActivity