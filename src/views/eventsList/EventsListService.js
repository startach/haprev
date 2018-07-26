import * as firebase from 'firebase';

export const getEventsList = async() =>{
    events = []
    res = await firebase.database().ref('events').once('value', 
        snapshot =>{events = snapshot.val()})
        .then(() => {return 'ok'})
        .catch(() => {return 'err'});
    return events;
}