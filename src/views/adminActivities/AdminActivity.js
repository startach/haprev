import React, {Component} from 'react'
import {View, Text, FlatList, Modal, TouchableOpacity, Image, Linking, ActivityIndicator,ScrollView} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from './styles' 
import { FontAwesome } from '@expo/vector-icons';
import {getUserData,setMessage} from './AdminActivitiesService'

const ParticipantItem = ({participant,avatarUrl,phone}) => {
    return (
        <View style={modalStyles.participantItem}>
            {avatarUrl ?
            <Image style={styles.userImageList} source={{uri: avatarUrl}}/>
            :
            <FontAwesome style={styles.withoutImgList} name='user-circle' size={35}/>
            }
            <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={{fontSize:18,flexDirection:'column',alignSelf:'center'}}>{participant.name}</Text>
                { phone ?
                <FontAwesome style={styles.phoneIcon} name='phone-square' size={35}
                    onPress={()=>{Linking.openURL('tel:'+phone)}}/>
                :
                <FontAwesome style={[styles.phoneIcon,{color:'grey'}]} name='phone-square' size={35}/>
                }
            </View>
        </View>)
}

class AdminActivity extends Component{
    state = {
        displayCancelEventDialog: false,
        avatarsArray:null,
        phonesArray:null,
        userIdArray:null,
    };
    async componentWillMount() {
        const {params} = this.props.navigation.state
        const participants = params ? params.participants : null
        avatarsArray=[]
        phonesArray=[]
        userIdArray=[]
        for(var i in participants){
            userInfo = await getUserData(participants[i].appId)
            avatarsArray.push(userInfo.avatarUrl)
            phonesArray.push(userInfo.phone)
            userIdArray.push(userInfo.userId)
        }
        this.setState({
            avatarsArray:avatarsArray,
            phonesArray:phonesArray,
            userIdArray:userIdArray,
            deleteProcess:false,
        })
    }
    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});

    deleteActivity = async(params) =>{
        this.setState({deleteProcess:true})
        let res = await params.onDeleteActivity(params.event.id)
        if(res=='ok'){
            if(params.participants.length>0){
                //todo - delete all user activity from users in database
                msg = 'הפעילות '+ params.event.caption + ' בתאריך ' + params.event.date + ' בבית חולים ' +params.hospital + ' התבטלה! '
                for(var i in this.state.userIdArray){
                    let resMsg = await setMessage({id:params.event.id,message:msg},this.state.userIdArray[i])
                    if(resMsg=='err')
                        alert('Error\nבעיה בשליחת הודעה למשתמש - ' + params.participants[i].name)
                }
            }
            await params.onRefresh()
            this.props.navigation.goBack();
        }
        else
            alert('בעיה בבקשה - נסה שוב מאוחר יותר')
        this.hideCancelEventDialog();
    }
    
    render() {
        const {params} = this.props.navigation.state
        const activity = params ? params.event : null
        const participants = params ? params.participants : null
        return (
            <View style={styles.container}>
                <Text style={styles.h1}> התנדבות {activity.caption} </Text>
                <Text style={styles.h3}> בתאריך {activity.date} בשעה {activity.time} </Text>
                <Text style={styles.h2}> לפעילות זו
                    רשומים {participants ? participants.length : 0} מתנדבים </Text>
                {this.state.avatarsArray && this.state.phonesArray ?
                <ScrollView horizontal={false}>
                    <FlatList data={participants}
                        renderItem={({item,index}) => 
                        <ParticipantItem 
                            participant={item} 
                            avatarUrl={this.state.avatarsArray[index]} 
                            phone={this.state.phonesArray[index]}
                        />}
                        keyExtractor={(item) => item.appId}
                        refreshing={true}
                    />
                </ScrollView>
                :
                <View style={{flex:1}}>
                    <ActivityIndicator size='large' color='#C2185B'/>
                </View>
                }
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
                    { !this.state.deleteProcess ?
                    <View style={modalStyles.modalContainer}>
                            <Text style={[modalStyles.title,{color:'white'}]}> האם לבטל את ההתנדבות? {'\n'} </Text>
                            <View style={modalStyles.buttonsContainer}>
                                <TouchableOpacity
                                    rounded
                                    style={modalStyles.modalButton}
                                    onPress={() => this.deleteActivity(params)}
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

export default AdminActivity