import React, { Component } from 'react';
import CreateActivityView from './CreateActivityView'
import * as firebase from 'firebase';

class CreateActivity extends Component {
    
    newActivityHandler = async (date,time,activityName) => {
        const { params } = this.props.navigation.state;
        fixDate = date.replace(/\//g , "-");
        let res = await firebase.database().ref('events/'+params.coordinator)
            .child(fixDate+' '+activityName)
            .set({
                caption: activityName,
                coordinator: params.appId,
                institute:params.coordinator,
                date: date,
                time: time
            })
            .then(() => {return 'ok'})
            .catch(error => {console.log('Data could not be saved.',error); return 'err'});
        return res
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
        />
        );
    }
}

export default CreateActivity;