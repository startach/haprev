import React from 'react'
import {View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import styles from './ActivitiesStyle'
import { FontAwesome } from '@expo/vector-icons';

class ActivityItem extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            showFullActivity:false,
            activityData:'',
            firstTime:true
        }
    }
    async componentWillMount(activityId,insId){
        if(!this.state.firstTime){
            const data = await this.props.renderActicityData(activityId,insId); 
            this.setState({
                showFullActivity:!this.state.showFullActivity,
                activityData:data
            })
        }
        else
            this.setState({firstTime:false})
    }
    
    renderCaptionText = (caption)=> {
        if (caption.length > 16 )
            return caption.slice(0, 13)+'...'
        return caption;
    }

    render() {
    const {activity, index, renderActicityData} = this.props
    return (
    <View>
        <TouchableOpacity underlayColor='#fff' onPress={() => {this.componentWillMount(activity.id,activity.hospitalId)}}>
            <View style={[styles.activityBox,(index%2 === 0) ? {backgroundColor:'#F5F5F1'} : {backgroundColor:'#F0EDE0'}]}>
                <Text style={[styles.textBox,activity.fullFormatDate < new Date().toISOString()?{color:'#E94B3C'}:{color:'#009B77'} ,{width: '30%'}]}>{activity.fullFormatDate.slice(0, 10)}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '35%'}]}>{this.renderCaptionText(activity.caption)}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '20%'}]}>{activity.hospitalName}</Text>
                <FontAwesome name="info-circle" size={20} color={'grey'}/>
            </View>
        </TouchableOpacity>
        {this.state.showFullActivity ?
        <View style={[styles.activityBox,{backgroundColor:'#C2185B',height:100,flexDirection: 'column'}]}>
            <Text style={[styles.textBox,{padding:10,margin:10,fontSize:20,color:'#FFFFFF'}]}> {this.state.activityData.caption}</Text>
            <Text style={[styles.textBox,{padding:10,margin:10,fontSize:16,color:'#FFFFFF'}]}>בתאריך  {this.state.activityData.date} בשעה {this.state.activityData.time}</Text>
            <Text style={[styles.textBox,{padding:10,margin:10,fontSize:24,color:'#FFFFFF'}]}>הרכז  {this.state.activityData.coordinator}</Text>

        </View>
        :
        null
        }
    </View>
    )
}
}

class ActivitiesView extends React.Component{
    render() {
        const {_process,activityElements,renderActicityData} = this.props
        return(
            <View >
                { !_process ?
                    activityElements ?
                    <ScrollView horizontal={false}>
                        <FlatList
                                data={activityElements}
                                renderItem={({item, index}) => <ActivityItem  activity={item} index={index} renderActicityData={renderActicityData} />}
                                keyExtractor={(item) => item.id}/>
                    </ScrollView>
                    :
                    <Text style={[styles.textBox,{padding:10,margin:10,fontSize:20}]}> אינך רשום עדיין לפעילויות </Text>
                :
                <View style={{paddingTop:50,flex:1}}>
                    <ActivityIndicator size='large' color='#C2185B'/>
                </View>
                }
            </View>
        )
    }
}

export default ActivitiesView