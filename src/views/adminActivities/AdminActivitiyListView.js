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
import {adminActivityListStyle as styles, modalStyles as styles } from './styles'

const  renderParticipantsText = (participants)=> {
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
    const {events,displayDialog,hideDialog,showDialog,openEventView} = props; 
        
    return (
       <View>
           <Modal
                    transparent
                    visible={displayDialog}
                    animationType={'slide'}
                >
                    <View style={modalStyles.modalContainer}>
                        <View>
                            <Text style={[modalStyles.title,{color:'white'}]}> האם לבטל את ההתנדבות? {"\n"} </Text>
                            <TouchableOpacity
                                rounded
                                style={modalStyles.modalButton}
                                onPress={() => hideDialog() }
                                >
                                <Text style={modalStyles.modalButtonText}>בטל התנדבות</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                rounded
                                style={[modalStyles.modalButton,{backgroundColor:'green'}]}
                                onPress={() => hideDialog()}
                                >
                                <Text style={modalStyles.modalButtonText}>השאר התנדבות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
           <View style={styles.header}>
               <View style={styles.img}></View>
               <Text style={styles.h1}> שבי מור </Text>
               <Text style={styles.h2}> רכז ביה״ח אסף </Text>
               <TouchableHighlight underlayColor='#fff' style={styles.plusButton}
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
