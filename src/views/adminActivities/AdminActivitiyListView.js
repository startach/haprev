import React from 'react'
import { 
    View, 
    Text,
    FlatList, 
    TouchableHighlight
    } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {adminActivityStyle, modalActivityStyle, adminActivityListStyle } from './styles';

const  renderParticipantsText = (participants)=> {
    if (!participants || participants.length === 0 ){return 'עדיין לא נרשמו מתנדבים';}
    if (participants.length === 1 ){return 'נרשם מתנדב אחד';}
    return 'נרשמו ' + participants.length + ' מתנדבים';
}

const ActivityItem = ({activity, index, openActivity}) => {
    return  <TouchableHighlight underlayColor='#fff' onPress={() => {openActivity(activity)}}>
        <View style={(index%2 === 0) ? adminActivityListStyle.activityItemEven : adminActivityListStyle.activityItemOdd}>
            <Text style={{width: '25%'}}>{activity.date}</Text>
            <Text>|</Text>
            <Text style={{width: '60%'}}>{renderParticipantsText(activity.participants)}</Text>
            <FontAwesome name="chevron-left"/>
        </View>
    </TouchableHighlight>
}

const AdminActivities = (props) =>
{
    const {events,openEventView,createActivityView} = props;
    return (
       <View >
           <View style={adminActivityListStyle.header}>
               <View style={adminActivityListStyle.img}></View>
               <Text style={adminActivityListStyle.h1}> שבי מור </Text>
               <Text style={adminActivityListStyle.h2}> רכז ביה״ח אסף </Text>
               <TouchableHighlight underlayColor='#fff' style={adminActivityListStyle.plusButton}
                   //onPress={() => openEventView() {activity: {participants:[]}})}>
                   onPress = { ()=>createActivityView() }
                >
                    <FontAwesome name='plus-circle' size={50} color='#080'/>
               </TouchableHighlight>
           </View>
           <FlatList
               data={events}
               renderItem={({item, index}) => <ActivityItem activity={item} index={index} openActivity={()=> openEventView(item)}/>}
               keyExtractor={(item) => item.id}/>
       </View>
    )
}

export default AdminActivities
