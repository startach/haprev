import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import ActivitiesView from './ActivitiesView'
import _ from 'lodash'
import {sortArrayByDate,renderActicityData,getUserData} from '../adminActivities/AdminActivitiesService.js'
import {deleteParticipant} from '../../store/modules/events'
import {deleteActivity} from '../../store/modules/user'

class Activities extends React.Component{
    constructor(props) {
        super(props)
        this.state = {process: true, activityElements:null};
    }

    async componentWillMount() {
        this.state.process ? null : this.setState({process:true})
        activities = this.props.activities
        activityElements = []
        if(activities.length>0 || Object.keys(activities).length>0){
            const res = _.map(activities, (activitiesInHospital, hospitalId) => {
                activityElem = _.map(activitiesInHospital, (dataActivity, activityId) => {
                    dataActivity['hospitalId']=hospitalId
                    dataActivity['hospitalName']= this.props.institutes[hospitalId-1].name
                    activityElements.push(dataActivity)
                })
            })
        }
        activityElements = sortArrayByDate(activityElements)
        this.setState({activityElements : activityElements, process:false})
    }

    deleteMyActivity = async(activity)=>{
        await this.props.deleteParticipant(activity.id,activity.hospitalId,this.props.appId)
        await this.props.deleteActivity(activity.id,activity.hospitalId)
        await this.componentWillMount()
    }

    render() {
        return(
            <View>
            <ActivitiesView
            _process={this.state.process}
            activityElements={this.state.activityElements}
            renderActicityData={renderActicityData}
            getUserData={getUserData}
            deleteMyActivity={this.deleteMyActivity}
            />
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return ({
               activities:state.user.user.activities || {},
               institutes:state.institutes.institutes,
               appId: state.user.user.appId,
            })
    }

export default connect(mapStateToProps,{deleteParticipant,deleteActivity})(Activities)