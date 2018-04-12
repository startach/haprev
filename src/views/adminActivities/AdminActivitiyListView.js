import React from 'react'
import { 
    View, 
    Text, 
    FlatList, 
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Modal} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {adminActivityStyle, modalActivityStyle, adminActivityListStyle } from './styles'

const  renderParticipantsText = (participants)=> {
    if (!participants || participants.length === 0 ){return 'עדיין לא נרשמו מתנדבים';}
    if (participants.length === 1 ){return 'נרשם מתנדב אחד';}
    return 'נרשמו ' + participants.length + ' מתנדבים';
}

const ActivityItem = ({activity, index, openActivity}) => {
    return  <TouchableHighlight underlayColor='#fff' onPress={() => {openActivity(activity)}}>
        <View style={(index%2 === 0) ? adminActivityListStyle.activityItemEven : styles.activityItemOdd}>
            <Text style={{width: '25%'}}>{activity.date}</Text>
            <Text>|</Text>
            <Text style={{width: '60%'}}>{renderParticipantsText(activity.participants)}</Text>
            <FontAwesome name="chevron-left"/>
        </View>
    </TouchableHighlight>
}

const AdminActivities = (props) =>
{
    const {events,displayDialog,hideDialog,showDialog,openEventView} = props; 
        
    return (
       <View>
           <Modal
                    transparent
                    visible={displayDialog}
                    animationType={'slide'}
                >
                    <View style={modalActivityStyle.modalContainer}>
                        <View>
                            <Text style={[modalActivityStyle.title,{color:'white'}]}> האם לבטל את ההתנדבות? {"\n"} </Text>
                            <TouchableOpacity
                                rounded
                                style={modalActivityStyle.modalButton}
                                onPress={() => hideDialog() }
                                >
                                <Text style={modalActivityStyle.modalButtonText}>בטל התנדבות</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                rounded
                                style={[modalActivityStyle.modalButton,{backgroundColor:'green'}]}
                                onPress={() => hideDialog()}
                                >
                                <Text style={modalActivityStyle.modalButtonText}>השאר התנדבות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
           <View style={adminActivityListStyle.header}>
               <View style={adminActivityListStyle.img}></View>
               <Text style={adminActivityListStyle.h1}> שבי מור </Text>
               <Text style={adminActivityListStyle.h2}> רכז ביה״ח אסף </Text>
               <TouchableHighlight underlayColor='#fff' adminActivityListStyle={styles.plusButton}
                   //onPress={() => openEventView() {activity: {participants:[]}})}>
                   onPress = { ()=>showDialog() }
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
