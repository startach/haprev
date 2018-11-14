import React from 'react'
import {View, Text, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Linking, Modal} from 'react-native'
import styles from './ActivitiesStyle'
import { FontAwesome } from '@expo/vector-icons'
import {makeArrayFromObjects,getUserData} from '../adminActivities/AdminActivitiesService'
import {AnimatableView} from '../AnimatableService'
import * as Animatable from 'react-native-animatable'

const renderText = (text)=> {
    if (text.length > 17 )
        return text.slice(0,14)+'...'
    return text
}

const ParticipantItem = ({avatarUrl, phone, _name}) => {
    return (
        <View style={styles.participantItem}>
            {avatarUrl ?
            <Image style={styles.userImageList} source={{uri: avatarUrl}}/>
            :
            <FontAwesome style={styles.withoutImgList} name='user-circle' size={30}/>
            }
            <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={styles.participantText}>{ renderText(_name) }</Text>
                <FontAwesome 
                style={[styles.phoneIcon, !phone && { color:'#ffffff'}]} 
                name='phone-square' 
                size={30}
                onPress={()=>{phone ? Linking.openURL('tel:'+phone) : {}}} 
                />
            </View>
        </View>)
}

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
    
    showParticipantsHandle = async() => {
        const participants = await makeArrayFromObjects(this.state.activityData.participants)
        if(participants.length>0){
            this.setState({modalParticipantsVisible:true})
            avatarsArray=[]
            phonesArray=[]
            namesArray=[]
            for(var i in participants){
                userInfo = await getUserData(participants[i].appId)
                avatarsArray.push(userInfo.avatarUrl)
                phonesArray.push(userInfo.phone)
                namesArray.push(userInfo.name)
            }
            await this.setState({
                participants:participants,
                avatarsArray:avatarsArray,
                phonesArray:phonesArray,
                namesArray:namesArray,
            })
        }
    }

    render() {
    const {activity, index, deleteMyActivity} = this.props
    return (
    <View>
        <TouchableOpacity underlayColor='#fff' onPress={async() => {this.activityNode.tada(1000); await this.renderActivityData(activity.id,activity.hospitalId)}}>
            <Animatable.View 
            style={[styles.activityBox,(index%2 === 0) ? {backgroundColor:'#F5F5F1'} : {backgroundColor:'#F0EDE0'}]}
            ref={(ref)=>{this.activityNode = ref}}
            >
                <Text style={[styles.textBox,activity.fullFormatDate < new Date().toISOString()?{color:'#E94B3C'}:{color:'#009B77'} ,{width: '30%'}]}>{ this.renderDate(activity.fullFormatDate)}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '35%'}]}>{renderText(activity.caption)}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '20%'}]}>{activity.hospitalName}</Text>
                {!this.state.showFullActivity ?
                <FontAwesome name="arrow-circle-down" size={22} color={'black'}/>
                :
                <FontAwesome name="arrow-circle-up" size={22} color={'#B4B7BA'}/>
                }
            </Animatable.View>
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
                    <TouchableOpacity onPress={async () => {await deleteMyActivity(activity,this.state.coordinatorData.userId)}}>
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
                <Text style={[styles.textBox,styles.textDetails]}>מספר משתתפים:  {Object.keys(this.state.activityData.participants).length} </Text>
                <AnimatableView 
                viewStyle={{}}
                duration={2500}
                animation='wobble'
                easing='ease'
                viewContent= { 
                    <TouchableOpacity onPress={async() => {await this.showParticipantsHandle()}}>
                        <FontAwesome name="group" size={30} color={'white'} style={{margin:10}}/>
                    </TouchableOpacity>
                }
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.textBox,styles.textDetails]}>רכז:  {renderText(this.state.coordinatorData.name)} </Text>
                <TouchableOpacity onPress={() => this.callToCoordinator()}>                
                    <FontAwesome name="phone" size={30} color={'white'} style={{paddingBottom:5,paddingTop:10}}/>
                </TouchableOpacity>
            </View>
        </View>
        :
        null
        }

        <Modal
            visible={this.state.modalParticipantsVisible}
            animationType={'slide'}
            transparent
            onRequestClose={() => this.setState({modalParticipantsVisible:true})}
            >
            <View style={styles.modalContainer}>
                { this.state.avatarsArray && this.state.participants ?
                <ScrollView horizontal={false}>
                        <FlatList data={this.state.participants}
                        renderItem={({item,index}) => <ParticipantItem 
                        participant={item} 
                        avatarUrl={this.state.avatarsArray[index]} 
                        phone={this.state.phonesArray[index]}
                        _name={this.state.namesArray[index]}
                        />}
                        keyExtractor={(item) => item.appId}
                        refreshing={true}
                        />
                </ScrollView>
                :
                <ActivityIndicator size='large' color='#C2185B'/>
                }
                <TouchableOpacity
                rounded
                style={[styles.button,{marginTop:15,marginBottom:15,width:"40%"}]}
                onPress={() => {  this.setState({modalParticipantsVisible:false})}}
                >
                    <Text style={styles.buttonText}>סגור</Text>
                </TouchableOpacity>
            </View>
        </Modal>
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