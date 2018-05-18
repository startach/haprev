import React from 'react'
import {View, Text, FlatList, TouchableHighlight, Image, ScrollView, ActivityIndicator} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {adminActivityStyle, modalActivityStyle, adminActivityListStyle } from './styles';

const  renderParticipantsText = (participants)=> {
    if (!participants || participants.length === 0 ){return 'עדיין לא נרשמו מתנדבים';}
    if (participants.length === 1 ){return 'נרשם מתנדב אחד';}
    return 'נרשמו ' + participants.length + ' מתנדבים';
}

const ActivityItem = ({activity, index, openActivity, participants}) => {
    return  <TouchableHighlight underlayColor='#fff' onPress={() => {openActivity(activity,participants[index])}}>
        <View style={(index%2 === 0) ? adminActivityListStyle.activityItemEven : adminActivityListStyle.activityItemOdd}>
            <Text style={[activity.fullFormatDate<new Date().toISOString()?{color:'red'}:{color:'green'} ,{width: '25%'}]}>{activity.date}</Text>
            <Text>|</Text>
            <Text style={{width: '60%'}}>{renderParticipantsText(participants[index])}</Text>
            <FontAwesome name="chevron-left"/>
        </View>
    </TouchableHighlight>
}

getAvatar=(avatarUrl,navigation)=>{
    if(avatarUrl) 
        return (<TouchableHighlight onPress={()=>{navigation.navigate('Profile')}}>
                    <Image style={adminActivityListStyle.userImage} source={{uri: avatarUrl}}/>
                </TouchableHighlight>)
    else
        return(<FontAwesome style={adminActivityListStyle.withoutImg} name='user-circle' size={65}
            onPress={()=>{navigation.navigate('Profile')}}/>)
}

const AdminActivities = (props) =>{
    const {events, participants, openEventView, createActivityView, firstName, lastName, avatarUrl, myHospital,navigation} = props;
    return (
       <View  style={{flex:1}}>
            <View style={adminActivityListStyle.header}>
            {this.getAvatar(avatarUrl,navigation)}
               <Text style={adminActivityListStyle.h1}> {firstName + ' ' + lastName } </Text>
               <Text style={adminActivityListStyle.h2}> רכז ביה״ח { myHospital } </Text>
               { myHospital ?
               <TouchableHighlight underlayColor='#fff' style={adminActivityListStyle.plusButton}
                    onPress = { ()=>createActivityView(firstName,lastName,myHospital) }   
                >
                    <FontAwesome name='plus-circle' size={50} color='#080'/>
                </TouchableHighlight>
                :
                null 
               }
           </View>
           { myHospital ? 
            <ScrollView horizontal={false}>
                <FlatList
                    data={events}
                    renderItem={({item, index}) => <ActivityItem activity={item} index={index} participants={participants} openActivity={openEventView}/>}
                    keyExtractor={(item) => item.caption}/>
            </ScrollView>
            :
            <ActivityIndicator size='large' color='#C2185B' /> 
            }
       </View>
    )
}

export default AdminActivities
