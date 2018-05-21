import React, { Component } from 'react';
import CreateActivityView from './CreateActivityView'
import * as firebase from 'firebase';

class CreateActivity extends Component {
    newActivityHandler = async (date,time,activityName,fullFormatDate) => {
        const { params } = this.props.navigation.state;
        return res = await params.addNewActivity(
            activityName,
            params.appId,
            params.coordinator,
            date,
            time,
            fullFormatDate.toISOString()
        )
    }

    render () {
        const { params } = this.props.navigation.state;
        return (
            <CreateActivityView 
            first = {params.first} 
            last = {params.last} 
            hospital = {params.hospital} 
            navigation={this.props.navigation}
            onNewActivityHandler={this.newActivityHandler}
            onRefresh={params.onRefresh}
            />
        );
    }
}

export default CreateActivity;