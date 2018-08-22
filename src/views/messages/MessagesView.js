import React, { Component } from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Linking} from 'react-native'
import styles from './MessagesViewStyle';
import { FontAwesome } from '@expo/vector-icons';

const ActivityItem = (props) => {
    const {activity,index,onReadMessageHandler} = props
    return (
        <View style={[styles.activityBox,(index%2 === 0) ? {backgroundColor:'#e6e2d3'} : {backgroundColor:'#d5e1df'}]}>
            <Text style={[styles.textBox,{width: '85%',margin:2}]}>{activity.message}</Text>
            <Text style={styles.textBox}>|</Text>
            <TouchableOpacity onPress={() => onReadMessageHandler(activity.id)}>                
                <FontAwesome name='check' size={27} color={'#009B77'} style={{paddingBottom:5,paddingTop:10,marginLeft:10}}/>
            </TouchableOpacity>
        </View>
    )
}

const MessagesView = (props) => {
    const { messages, onReadMessageHandler } = props;
    return (
        <View >
            {messages && messages.length>0 ?
            <ScrollView horizontal={false}>
                <FlatList
                data={messages}
                renderItem={({item, index}) => <ActivityItem activity={item} index={index} onReadMessageHandler={onReadMessageHandler}/>}
                keyExtractor={(item) => item.id}/>
            </ScrollView>
            :
            <Text style={[styles.textBox,{padding:10,margin:10,fontSize:20}]}> אין הודעות חדשות </Text>
            }
        </View>
    );
}

export default MessagesView;