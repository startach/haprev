import React from 'react'
import {View, BackHandler, Platform, ToastAndroid} from 'react-native'
import _ from 'lodash'
import Messages from '../messages/Messages'
import HomeView from './HomeView'
import { connect } from 'react-redux'
import {getImages} from './HomeService'
import {getEventsList} from '../eventsList/EventsListService'
import {sortArrayByDate} from '../adminActivities/AdminActivitiesService.js'

NUM_OF_NEXT_EVENTS = 5

class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            hospitalName: '', 
            myNextEvent: null,
            images:[],
            exit:0,
            processNextEvents:true,
            EventsListElements:null,
        };
        this.onBackClicked = this._onBackClicked.bind(this);
    }
          
    componentWillUnmount() {
        if (Platform.OS === 'android')
            BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
    }

    async componentWillMount() {
        if (Platform.OS === 'android') 
            BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
        //load part one - if coordinator
        let _hospitalName = ''
        if(this.props.coordinator > 0){
            _hospitalName = this.state.hospitalName
            if(!_hospitalName)
                _hospitalName = await this.props.institutes[this.props.coordinator-1].name || null
        }
        //load part 2 - my next activity
        let myNextEvent = await this.findMyNextEvent(this.props.myActivities)
        //load the 5 next events
        eventsByInsId = await getEventsList()
        this.state.processNextEvents ? null : this.setState({processNextEvents:true})
        activityElements = []
        if(eventsByInsId.length>0 || Object.keys(eventsByInsId).length>0){
            today = new Date()
            const res = _.map(eventsByInsId, (activitiesInHospital, hospitalId) => {
                activityElem = _.map(activitiesInHospital, (dataActivity, activityId) => {
                    if(new Date(dataActivity.fullFormatDate)>= today){
                        dataActivity['hospitalId']=hospitalId
                        dataActivity['hospitalName']= this.props.institutes[hospitalId-1].name
                        activityElements.push(dataActivity)
                    }
                })
            })
            this.eventsHandler(NUM_OF_NEXT_EVENTS)
        }
        else
            activityElements = null
        this.setState({activityElements : activityElements,processNextEvents:false})
        //load images
        images = await getImages()
        await this.setState({hospitalName:_hospitalName,myNextEvent:myNextEvent,images:images})
    }
    
    eventsHandler = async(numOfEvents) => {
        EventsListElements = sortArrayByDate(activityElements)
        EventsListElements = EventsListElements.slice(0,numOfEvents)
        this.setState({EventsListElements : EventsListElements})
    }

    _onBackClicked = () => {
        if(this.state.exit>0)
            BackHandler.exitApp()
        else{
            ToastAndroid.show('בטוח? לחץ שוב בכדי לצאת', ToastAndroid.SHORT);
            this.setState({exit:1})
            setTimeout( () => this.setState({exit:0}), 1500)
        }
        return true;
    } 

      

    findMyNextEvent = async(myActivities) => {
        let myNextEvent = null
        currDate = new Date()
        minDate = (new Date(currDate.getUTCFullYear()+2, currDate.getUTCMonth(), currDate.getUTCDate())).toISOString()
        currDate = currDate.toISOString()
            for(var i in myActivities){
                for(var j in myActivities[i]){
                    event = myActivities[i][j]
                    if(event.fullFormatDate > currDate){
                        if(event.fullFormatDate < minDate){
                            minDate = event.fullFormatDate
                            myNextEvent = event
                        }
                    }
                }
            }
        if(myNextEvent){
            fulldate = new Date(myNextEvent.fullFormatDate)
            shortDate =  fulldate.getDate() + "/" + (fulldate.getMonth() + 1) + "/" + fulldate.getFullYear()
            myNextEvent['date'] = shortDate
        }
        return myNextEvent
        
    }

    registerActivityView = () => { this.props.navigation.navigate('InstitutesRoute') }

    activityView = () => { this.props.navigation.navigate('ActivitiesRoute') }
    
    createActivityView = () =>{
        const {first,last,coordinator,appId} = this.props
        const hospital = this.state.hospitalName
        this.props.navigation.navigate('CreateActivity',{first,last,hospital,appId,coordinator,onRefresh: () =>this.props.navigation.navigate('AdminActivities')});
    }

    render() {
        return(
            <View>
                <Messages/>
                <HomeView 
                    first={this.props.first} 
                    last={this.props.last}
                    coordinator={this.props.coordinator}
                    hospital={this.state.hospitalName}
                    registerActivityView={this.registerActivityView}
                    createActivityView={this.createActivityView}
                    activityView={this.activityView}
                    myNextEvent = {this.state.myNextEvent}
                    images={this.state.images}
                    processEventsList={this.state.processNextEvents}
                    activityElements={this.state.EventsListElements}
                />
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return ({
            first:state.user.user.first,
            last:state.user.user.last,
            coordinator:state.user.user.coordinator,
            appId:state.user.user.appId,
            institutes:state.institutes.institutes,
            myActivities: state.user.user.activities || null,
        })
    }

export default connect(mapStateToProps)(Home)
