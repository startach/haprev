import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import ActivitiesView from './ActivitiesView'
import _ from 'lodash'
import {sortArrayByDate,renderActicityData,getUserData} from '../adminActivities/AdminActivitiesService.js'
import {namesOfHospitals} from '../../services'

class Activities extends React.Component{
    constructor(props) {
        super(props)
        this.state = {process: true, activityElements:null};
    }

    async componentWillMount() {
        activities = this.props.activities
        activityElements = []
        
        if(activities.length>0 || Object.keys(activities).length>0){
            const res = _.map(activities, (activitiesInHospital, hospitalId) => {
                activityElem = _.map(activitiesInHospital, (dataActivity, activityId) => {
                    dataActivity['hospitalId']=hospitalId
                    dataActivity['hospitalName']= namesOfHospitals[hospitalId].name
                    activityElements.push(dataActivity)
                })
            })
        }
        activityElements = sortArrayByDate(activityElements)
        this.setState({activityElements : activityElements, process:false})
    }

    render() {
        return(
            <View>
            <ActivitiesView
            _process={this.state.process}
            activityElements={this.state.activityElements}
            renderActicityData={renderActicityData}
            getUserData={getUserData}
            />
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return ({
               activities:state.user.user.activities || {}
            })
    }

export default connect(mapStateToProps)(Activities)