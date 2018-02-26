import React from 'react'
import { View, Text, FlatList, TouchableHighlight} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header:{
        margin: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
    },
    img:{
        height: 60,
        width: 60,
        backgroundColor:'#080',
        marginBottom: 10,
    },
    h1:{
        fontSize:20,
    },
    h2:{
        fontSize:16,
    },
    plusButton:{
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -10
    },
    activityItemOdd: {
        height:50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    activityItemEven: {
        height:50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ddd'
    }
});

function renderParticipantsText(participants) {
    if (!participants || participants.length === 0 ){return 'עדיין לא נרשמו מתנדבים';}
    if (participants.length === 1 ){return 'נרשם מתנדב אחד';}
    return 'נרשמו ' + participants.length + ' מתנדבים';
}

const ActivityItem = ({activity, index, openActivity}) => {
    return  <TouchableHighlight underlayColor='#fff' onPress={() => {openActivity(activity)}}>
        <View style={(index%2 === 0) ? styles.activityItemEven : styles.activityItemOdd}>
            <Text style={{width: '25%'}}>{activity.date}</Text>
            <Text>|</Text>
            <Text style={{width: '60%'}}>{renderParticipantsText(activity.participants)}</Text>
            <FontAwesome name="chevron-left"/>
        </View>
    </TouchableHighlight>
}

const AdminActivities = (props) =>
{
    const openActivity = (activity) => props.navigation.navigate('AdminActivity',{activity})

    return (
       <View>
           <View style={styles.header}>
               <View style={styles.img}></View>
               <Text style={styles.h1}> שבי מור </Text>
               <Text style={styles.h2}> רכז ביה״ח אסף </Text>
               <TouchableHighlight underlayColor='#fff' style={styles.plusButton}
                   onPress={() => props.navigation.navigate('AdminActivity',{activity: {participants:[]}})}>
                   <FontAwesome name='plus-circle' size={50} color='#080'/>
               </TouchableHighlight>
           </View>
           <FlatList
               data={activities}
               renderItem={({item, index}) => <ActivityItem activity={item} index={index} openActivity={openActivity}/>}
               keyExtractor={(item) => item.id}/>
       </View>
    )
}

export default AdminActivities

const participant = [
    {id: 1, name: 'מיכאל כהן'},
    {id: 2, name: 'דניאלה קציר'},
    {id: 3, name: 'האני מועלם'},
    {id: 4, name: 'יובל דנן'},
    {id: 5, name: 'אנה לובליאן'},
    {id: 6, name: 'יוסף לוי'},
    {id: 7, name: 'מיכאלה ברש'},
    {id: 8, name: 'איגור דלינסקי'},
    {id: 9, name: 'אהרון הכהן'},
    {id: 10, name: 'יהודה דהן'},
    {id: 11, name: 'שרה נתן'},
    {id: 12, name: 'טלי שחר'},
    {id: 13, name: 'מורן אורן'},
    {id: 14, name: 'כוכבה ליפקין'},
    {id: 15, name: 'ליאור סיגלר'},
]

const activities = [
    {id: 1, participants: participant, date: '12-02-2018'},
    {id: 2, participants: participant.filter(x => x.id > 5), date: '20-02-2018'},
    {id: 3, participants: [], date: '22-02-2018'},
    {id: 4, participants: participant, date: '01-03-2018'},
    {id: 5, participants: [], date: '08-03-2018'},
    {id: 6, participants: participant.filter(x => x.id === 2), date: '12-02-2018'},
    {id: 7, participants: participant.filter(x => x.id < 5), date: '20-02-2018'},
    {id: 8, participants: participant.filter(x => x.id % 2 === 0), date: '22-02-2018'},
    {id: 9, participants: participant.filter(x => x.id > 5), date: '01-03-2018'},
    {id: 10, participants: participant.filter(x => x.id > 12), date: '08-03-2018'},
    {id: 11, participants: participant.filter(x => x.id > 5), date: '12-02-2018'},
    {id: 12, participants: participant.filter(x => x.id % 3 === 1), date: '20-02-2018'},
    {id: 13, participants: participant.filter(x => x.id > 13), date: '22-02-2018'},
    {id: 14, participants: [], date: '01-03-2018'},
    {id: 15, participants: participant.filter(x => x.id %5 === 0), date: '08-03-2018'},
    {id: 16, participants: participant, date: '12-02-2018'},
    {id: 17, participants: participant, date: '20-02-2018'},
    {id: 18, participants: participant, date: '22-02-2018'},
    {id: 19, participants: participant, date: '01-03-2018'},
    {id: 20, participants: participant, date: '08-03-2018'},
]