import React, {Component} from 'react'
import {View, Text, FlatList, Image, Linking, ActivityIndicator,ScrollView} from 'react-native'
import AdminActivityView from './AdminActivityView'
import EventRegistrationView from '../institutes/EventRegistrationView'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from './styles' 
import { FontAwesome } from '@expo/vector-icons';
import {getUserData,setMessage} from './AdminActivitiesService'

const ParticipantItem = ({participant,avatarUrl,phone,isCoordinator}) => {
    return (
        <View style={[modalStyles.participantItem,isCoordinator? styles.coordinatorLine: null]}>
            {avatarUrl ?
            <Image style={styles.userImageList} source={{uri: avatarUrl}}/>
            :
            <FontAwesome style={styles.withoutImgList} name='user-circle' size={35}/>
            }
            <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={styles.participantText}>{participant.name.length > 14 ? participant.name.slice(0, 11)+'...' : participant.name}</Text>
                { isCoordinator ?
                <Text style={[styles.participantText,{color:'#009B77'}]}>רכז פעילות</Text>
                :
                null
                }
                { phone ?
                <FontAwesome style={styles.phoneIcon} name='phone-square' size={35}
                    onPress={()=>{Linking.openURL('tel:'+phone)}}/>
                :
                <FontAwesome style={[styles.phoneIcon,{color:'grey'}]} name='phone-square' size={35}/>
                }
            </View>
        </View>)
}

class EventView extends Component{
    state = {
        displayCancelEventDialog: false,
        avatarsArray:null,
        phonesArray:null,
        userIdArray:null,
        process:false,
    };
    async componentWillMount() {
        const {params} = this.props.navigation.state
        const participants = params ? params.participants : null
        avatarsArray=[]
        phonesArray=[]
        userIdArray=[]
        coordinatorData = await getUserData(params.event.coordinator)
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
            coordinatorData:coordinatorData,
            process:false,
        })
    }

    deleteActivity = async() =>{
        const {params} = this.props.navigation.state
        this.setState({process:true})
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
    }
    
    render() {
        const {params} = this.props.navigation.state
        const activity = params ? params.event : null
        const participants = params ? params.participants : null
        const adminActivityScreen = params.adminActivityScreen
        return (
            <View style={styles.container}>
                <Text style={styles.h1}> התנדבות {activity.caption} </Text>
                <Text style={styles.h3}> בתאריך {activity.date} בשעה {activity.time} </Text>
                <Text style={styles.h2}> לפעילות זו
                    רשומים {participants ? participants.length : 0} מתנדבים </Text>
                {this.state.avatarsArray && this.state.phonesArray ?
                <ScrollView horizontal={false}>
                    <ParticipantItem 
                        participant={this.state.coordinatorData} 
                        avatarUrl={this.state.coordinatorData.avatarUrl} 
                        phone={this.state.coordinatorData.phone}
                        isCoordinator
                    />
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
                { adminActivityScreen ?
                <AdminActivityView 
                    deleteProcess = {this.state.process}
                    deleteActivity={this.deleteActivity}
                />
                :
                <EventRegistrationView
                    registarProcess = {this.state.process}
                />
                }
            </View>
        )
    }
}

export default EventView