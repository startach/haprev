import React from 'react'
import {View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Linking} from 'react-native'
import styles from './ActivitiesStyle'
import { FontAwesome } from '@expo/vector-icons';

class ActivityItem extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            showFullActivity:false,
            activityData:'',
            coordinatorData:'',
            deleteVisible: false
        }
    }

    renderActivityData = async(activityId,insId)=> {
        if(!this.state.showFullActivity){
            const activityData = await this.props.renderActicityData(activityId,insId)
            const coordinatorData = await this.props.getUserData(activityData.coordinator)
            this.setState({
                showFullActivity:!this.state.showFullActivity,
                activityData:activityData,
                coordinatorData: coordinatorData
            })
        }
        else
            this.setState({showFullActivity:false})
    }

    renderText = (text)=> {
        if (text.length > 16 )
            return text.slice(0, 13)+'...'
        return text
    }

    renderDate = (fullDate) =>{
        var fulldate = new Date(fullDate)
        var dateString =  fulldate.getDate() + "/" + (fulldate.getMonth() + 1) + "/" + fulldate.getFullYear()
        return dateString
    }
    callToCoordinator=()=>{
        try{
            if(this.state.coordinatorData.phone)
                Linking.openURL('tel:'+this.state.coordinatorData.phone)
            else
                alert('מספר הטלפון של הרכז לא זמין במערכת')
            }
        catch(e){
            alert('מספר הטלפון של הרכז לא זמין במערכת')
        }
    }
    
    render() {
    const {activity, index, getUserData, deleteMyActivity} = this.props
    return (
    <View>
        <TouchableOpacity underlayColor='#fff' onPress={async() => { await this.renderActivityData(activity.id,activity.hospitalId)}}>
            <View style={[styles.activityBox,(index%2 === 0) ? {backgroundColor:'#F5F5F1'} : {backgroundColor:'#F0EDE0'}]}>
                <Text style={[styles.textBox,activity.fullFormatDate < new Date().toISOString()?{color:'#E94B3C'}:{color:'#009B77'} ,{width: '30%'}]}>{ this.renderDate(activity.fullFormatDate)}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '35%'}]}>{this.renderText(activity.caption)}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '20%'}]}>{activity.hospitalName}</Text>
                {!this.state.showFullActivity ?
                <FontAwesome name="arrow-circle-down" size={22} color={'black'}/>
                :
                <FontAwesome name="arrow-circle-up" size={22} color={'grey'}/>
                }
            </View>
        </TouchableOpacity>
        {this.state.showFullActivity ?
        <View style={[styles.activityBox,styles.boxDetails]}>
            <Text style={[styles.textBox,styles.textDetails,{fontSize:20,borderBottomColor: 'white',borderBottomWidth:2}]}> {this.state.activityData.caption}</Text>
            <View style={styles.rowLine}>
                <Text style={[styles.textBox,styles.textDetails]}>בתאריך  {this.state.activityData.date} בשעה {this.state.activityData.time}</Text>
                <TouchableOpacity onPress={() => this.setState({deleteVisible:!this.state.deleteVisible})}>
                    <FontAwesome name="trash" size={35} color={'white'} style={{paddingBottom:10,paddingTop:5}}/>
                </TouchableOpacity>
            </View>
            {this.state.deleteVisible ?
                <View style={[styles.rowLine,styles.deleteLine]}>
                    <Text style={[styles.textBox,styles.textDetails]}>לבטל השתתפותך בפעילות? </Text>
                    <TouchableOpacity onPress={async () => {await deleteMyActivity(activity)}}>
                        <FontAwesome name="check" size={30} color={'#009B77'} style={{margin:10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({deleteVisible:false})}>
                        <FontAwesome name="times" size={30} color={'#E94B3C'} style={{margin:10}}/>
                    </TouchableOpacity>
                </View>
            :
            null
            }
            <View style={styles.rowLine}>
                <Text style={[styles.textBox,styles.textDetails]}>רכז:  {this.renderText(this.state.coordinatorData.name)} </Text>
                <TouchableOpacity onPress={() => this.callToCoordinator()}>                
                    <FontAwesome name="phone" size={30} color={'white'} style={{paddingBottom:5,paddingTop:10}}/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.textBox,styles.textDetails]}>מספר משתתפים:  {this.renderText(Object.keys(this.state.activityData.participants).length)} </Text>
            </View>
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
        const {_process,activityElements,renderActicityData, getUserData, deleteMyActivity} = this.props
        return(
            <View >
                { !_process ?
                    activityElements ?
                    <ScrollView horizontal={false}>
                        <FlatList
                                data={activityElements}
                                renderItem={({item, index}) => <ActivityItem  activity={item} index={index} renderActicityData={renderActicityData} getUserData={getUserData} deleteMyActivity={deleteMyActivity}/>}
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