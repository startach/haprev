import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import ActivitiesView from './ActivitiesView'
import map from 'lodash/map'
import {sortArrayByDate,renderActicityData,getUserData} from '../adminActivities/AdminActivitiesService.js'
import {deleteParticipant} from '../../store/modules/events'
import {deleteActivity} from '../../store/modules/user'
import {getUserTokenNotification,sendPushNotification} from '../notification/NotificationService';

class Activities extends React.Component{
    constructor(props) {
        super(props)
        this.state = {process: true, activityElements:null};
    }

    async componentWillMount() {
        this.state.process ? null : this.setState({process:true})
        const activities = this.props.activities
        let activityElements = []

        if (activities.length > 0 || Object.keys(activities).length > 0) {
            map(activities, (activitiesInHospital, hospitalId) => {
                map(activitiesInHospital, (dataActivity, activityId) => {
                    dataActivity['hospitalId']=hospitalId
                    dataActivity['hospitalName']= this.props.institutes[hospitalId-1].name
                    activityElements.push(dataActivity)
                })
            })
            activityElements = sortArrayByDate(activityElements)
        } else {
          activityElements = null
        }

        this.setState({activityElements : activityElements, process:false})
    }

    deleteMyActivity = async (activity, coordinatorUserId) => {
        const { first, last, deleteParticipant, deleteActivity, appId } = this.props

        await deleteParticipant(activity.id, activity.hospitalId, appId)
        const res = await deleteActivity(activity.id, activity.hospitalId)

        let coordinatorToken = await getUserTokenNotification(coordinatorUserId)

        if (coordinatorToken) {
            let title = 'ביטול משתתף'
            let msg = first + ' ' + last + ' ביטל את ההשתתפות בפעילות: ' + activity.caption
            sendPushNotification(coordinatorToken, title, msg)
        }

        if (res == 'empty')
            this.setState({ activityElements: null })
        else
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
               first:state.user.user.first,
               last:state.user.user.last,
            })
    }

export default connect(mapStateToProps,{deleteParticipant,deleteActivity})(Activities)
