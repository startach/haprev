import React from 'react'
import {View, Text, FlatList, ScrollView, ActivityIndicator} from 'react-native'
import styles from './EventsListStyle'

class ActivityItem extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            showFullActivity:false,
            activityData:'',
            coordinatorData:'',
            deleteVisible: false,
            modalParticipantsVisible:false,
            participants:[],
            avatarsArray:null,
            phonesArray:null,
        }
    }

    renderText = (text,len)=> {
        if (text.length > len )
            return text.slice(0, len-3)+'...'
        return text
    }

    renderDate = (fullDate) =>{
        var fulldate = new Date(fullDate)
        var dateString =  fulldate.getDate() + "/" + (fulldate.getMonth() + 1) + "/" + fulldate.getFullYear()
        return dateString
    }

    render() {
    const {activity, index, isNextEvents} = this.props
    return (
        <View style={[styles.activityBox,isNextEvents 
            ? {height:30} 
            : (index%2 === 0) ? {backgroundColor:'#f9ccac'} : {backgroundColor:'#fff2df'}]
        }>
            <Text style={[styles.textBox,activity.fullFormatDate < new Date().toISOString()?{color:'#E94B3C'}:{color:'#009B77'} ,{width: '22%'}]}>{ this.renderDate(activity.fullFormatDate)}</Text>
            <Text style={styles.textBox}>]</Text>
            <Text style={[styles.textBox,{width: '10%'}]}>{activity.time}</Text>
            <Text style={styles.textBox}>[</Text>
            <Text style={[styles.textBox,{width: '40%'}]}>{this.renderText(activity.caption,isNextEvents ? 17 : 19)}</Text>
            <Text style={styles.textBox}>|</Text>
            <Text style={[styles.textBox,{width: '20%'}]}>{activity.hospitalName}</Text>
        </View>
    )
}
}

class EventsListView extends React.Component{
    render() {
        const {processEventsList, activityElements, isNextEvents} = this.props
        return(
            <View style={{flex:1}}>
                { !processEventsList ?
                    activityElements.length>0 ?
                    <ScrollView horizontal={false}>
                        <FlatList
                        data={activityElements}
                        renderItem={({item, index}) => <ActivityItem isNextEvents={isNextEvents} activity={item} index={index}/>}
                        keyExtractor={(item) => item.id}/>
                    </ScrollView>
                    :
                    <Text style={[styles.textBox,{margin:5,fontSize:14,color:'gray'}]}> אין מידע על פעילויות </Text>
                :
                <View style={{paddingTop: isNextEvents?5:50,flex:1}}>
                    <ActivityIndicator size='large' color='#C2185B'/>
                </View>
                }
            </View>
        )
    }
}

export default EventsListView