import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Slider, Picker, Dimensions } from 'react-native'
import EventsListView from './EventsListView'
import map from 'lodash/map'
import {getEventsList} from './EventsListService'
import {sortArrayByDate_Descending} from '../adminActivities/AdminActivitiesService.js'
import styles from './EventsListStyle'

class EventsList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            process: true,
            activityElements:null,
            EventsListElements:null,
            numberOfEvents: 10,
            currentHospital: 'הכל'
        }
    }

    async componentWillMount(hospitalChoose) {
        const {institutes} = this.props
        hospitalChoose ? null :eventsByInsId = await getEventsList()
        this.state.process ? null : this.setState({process:true})
        activityElements = []
        if(eventsByInsId.length>0 || Object.keys(eventsByInsId).length>0){
            today = new Date()
            const res = map(eventsByInsId, (activitiesInHospital, hospitalId) => {
                activityElem = map(activitiesInHospital, (dataActivity, activityId) => {
                    //Events History
                    if(new Date(dataActivity.fullFormatDate)<= today){
                        if(this.state.currentHospital==institutes[hospitalId-1].name || this.state.currentHospital=='הכל'){
                            dataActivity['hospitalId']=hospitalId
                            dataActivity['hospitalName']= institutes[hospitalId-1].name
                            activityElements.push(dataActivity)
                        }
                    }
                })
            })
            this.eventsHandler(this.state.numberOfEvents)
        }
        else
            activityElements = null
        this.setState({activityElements : activityElements, process:false})
    }

    eventsHandler = async(numOfEvents) => {
        EventsListElements = sortArrayByDate_Descending(activityElements)
        EventsListElements = EventsListElements.slice(0,numOfEvents)
        this.setState({EventsListElements : EventsListElements})
    }

    getPicker = () => {
            let serviceItems = this.props.institutes.map((ins, i) => {
                return <Picker.Item key={i} value={ins.name} label={ins.name} />
            });
            return (
                <Picker
                selectedValue={this.state.currentHospital}
                style={[styles.pickerText,{backgroundColor:'#d71a4e',width:'40%'}]}
                mode="dropdown"
                itemStyle={{textAlign: 'right'}} //IOS
                onValueChange={async(itemValue, itemIndex) => {await this.setState({currentHospital: itemValue}); await this.componentWillMount(true)}}>
                <Picker.Item key={-1} value={'הכל'} label={'הכל'} />
                {serviceItems}
                </Picker>
            );
    }


    render() {
        return(
            <View style={{flex:1}}>
                <View style={styles.containerFilter}>
                    <Text style={styles.filterText}>מספר אירועים להצגה</Text>
                    <View style={{flexDirection: "row"}}>
                        <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={1}
                        maximumValue={100}
                        value={this.state.numberOfEvents}
                        onValueChange={val => this.setState({ numberOfEvents: val })}
                        onSlidingComplete={ val => this.eventsHandler(val)}
                        thumbTintColor={'#f9ccac'}
                        minimumTrackTintColor={'#FFFFFF'}
                        />
                        <Text style={styles.filterText}>
                        {this.state.numberOfEvents}
                        </Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={[styles.filterText,{alignSelf: "center"}]}>בית חולים</Text>
                        {this.getPicker()}
                    </View>
                </View>
                <EventsListView
                processEventsList={this.state.process}
                activityElements={this.state.EventsListElements}
                isNextEvents={false}
                />
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return ({
        institutes:state.institutes.institutes || {},
        })
    }

export default connect(mapStateToProps)(EventsList)