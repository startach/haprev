import React, {Component} from 'react'
import {View, Text, FlatList, TouchableOpacity, ActivityIndicator,ScrollView} from 'react-native'
import {adminActivityStyle as styles} from '../adminActivities/styles'
import { FontAwesome } from '@expo/vector-icons';

const Event = ({event,i,openEventView}) => {
    return (
        <TouchableOpacity onPress={() => {openEventView(event)}}>
            <View style={[styles.eventBox,{backgroundColor: i%2 ? '#C2185B' : '#fff',borderColor:i%2 ? '#fff' : '#C2185B'}]}>
                <FontAwesome style={{margin:5,marginBottom:3,color:i%2 ? '#fff' : '#C2185B'}} name='hand-o-down' size={35}/>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.h2,{color:i%2 ? '#fff' : '#C2185B'}]}>{event.caption.length > 18 ? event.caption.slice(0, 15)+'...' : event.caption}</Text>
                    </View>
                <View style={{flexDirection: 'row',marginBottom:8}}>
                    <Text style={[styles.h3,{color:i%2 ? '#fff' : '#C2185B'}]}>תאריך {event.date}  | שעה {event.time}</Text>
                </View>
            </View>
        </TouchableOpacity>)
}

class EventView extends Component{
    render() {
        const {events,openEventView} = this.props
        return (
            <View style={styles.container}>
            {events.length>1 ?
                <View>
                    <Text style={[styles.h1,{paddingBottom:0,color:'#fff'}]}> ישנם כמה התנדבויות ב{events[0].date} </Text>
                </View>
                :
                null
            }
            {events ?
            <ScrollView horizontal={false}>
                <FlatList data={events}
                    renderItem={({item,index}) => 
                    <Event event={item} i={index} openEventView={openEventView} />}
                    keyExtractor={(item) => item.id}
                    refreshing={true}
                />
            </ScrollView>
            :
            <View style={{flex:1}}>
                <ActivityIndicator size='large' color='#C2185B'/>
            </View>
            }
            </View>
        )
    }
}

export default EventView