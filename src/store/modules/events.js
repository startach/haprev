import * as firebase from 'firebase';
import _ from 'lodash';

const REQUEST_EVENTS = 'haprev/events/REQUEST_EVENTS';
const RESPONSE_EVENTS = 'haprev/events/RESPONSE_EVENTS';
const RESPONSE_NEW_ACTIVITY = 'haprev/events/RESPONSE_NEW_ACTIVITY';
const ADD_PARTICIPANT = 'haprev/events/ADD_PARTICIPANT';

const initalState = {
  status: null,
  events:{},
  for:null
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return { ...state, status: 'reqEvents', for: action.payload};
    case RESPONSE_EVENTS:
        return { ...state, status: '', events: action.payload};
    case RESPONSE_NEW_ACTIVITY:
        return {...state, events: Object.assign(action.payload,state.events)}
    case ADD_PARTICIPANT:
        return { ...state, 
            events: {
            ...state.events,
            [action.eventId]: {
                    ...state.events[[action.eventId]],
                    participants: action.participants 
                }
          }
        }
    default:
      return state;
  }
};

const eventsReq = instituteId => {
    return ({
        type: REQUEST_EVENTS,
        payload: instituteId
    })
}

const eventsRes = data =>({
    type: RESPONSE_EVENTS,
    payload:data
});

const newActivityRes = activity =>({
    type: RESPONSE_NEW_ACTIVITY,
    payload: activity,
});

const addParticipantRes = (participants,eventId) =>({
    type: ADD_PARTICIPANT,
    participants: participants,
    eventId: eventId,
});

export const getEvents = instituteId => async (dispatch,state) =>{
    if(state().events.status != 'reqEvents'){
        dispatch(eventsReq(instituteId))
        res = firebase.database().ref('events/').child(instituteId).once('value', 
            snapshot =>{
                dispatch(eventsRes(snapshot.val()));
            })
            .then(() => {return 'ok'})
            .catch(error => {
                return 'err'
            });
        return res;
    }
    return 'reqEvents'
}

export const addNewActivity = (activityName,appId,coordinator,date,time,fullFormatDate) => async(dispatch) => {
    let res = null
    var objActivity = {}   
    ref  = await firebase.database().ref('events/'+coordinator).push()
    let newActivity = {
        caption: activityName,
        coordinator: appId,
        institute:coordinator,
        date: date,
        time: time,
        fullFormatDate: fullFormatDate,
        id: ref.key
    }
    objActivity[ref.key] = newActivity;
    await ref.set(newActivity)
        .then(() => {
            dispatch(newActivityRes(objActivity))
            res = 'ok'
        })
        .catch(error => {console.log('Data could not be saved.',error); res = 'err'});
    return res
}

export const deleteActivity = (activityId) => async(dispatch,state) => {
    eventsObj = state().events.events
    eventsArray = Object.keys(eventsObj).map(key => {return eventsObj[key]})
    currentEvents = _.filter(eventsArray,(event) => {return event.id !== activityId})
    currentEventsObjects = _.keyBy(currentEvents, 'id');
    hospitalId = state().user.user.coordinator
    newEvents = {} 
    newEvents[hospitalId] = currentEventsObjects

    let res = await firebase.database().ref('events/')
    .update(newEvents)
    .then(() => {
        dispatch(eventsRes(currentEventsObjects))
        return 'ok'
    })
    .catch(error => {
        console.log('Data could not be saved.' + error);
        return 'err'
    });
    return res;  
}

export const addUserToEvent = (event,appId,fullName) => async(dispatch,state) => {
    let res = null
    let newUser = {
      appId: appId,    
      name: fullName,
    }   
    ref  = await firebase.database().ref('events/'+event.institute+'/'+event.id)
    .child('participants')
    .push()
    .set(newUser)
        .then(() => {
            newParticipants = state().events.events[event.id]['participants'] || []
            newParticipants.push(newUser)
            dispatch(addParticipantRes(newParticipants,event.id))
            res = 'ok'
        })
        .catch(error => {console.log('Data could not be saved.',error); res = 'err'});
    return res
  }