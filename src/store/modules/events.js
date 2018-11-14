import * as firebase from 'firebase';
import filter from 'lodash/filter';
import keyBy from 'lodash/keyBy';

const REQUEST_EVENTS = 'haprev/events/REQUEST_EVENTS';
const RESPONSE_EVENTS = 'haprev/events/RESPONSE_EVENTS';
const RESPONSE_NEW_ACTIVITY = 'haprev/events/RESPONSE_NEW_ACTIVITY';
const ADD_PARTICIPANT = 'haprev/events/ADD_PARTICIPANT';
const DELETE_PARTICIPANT= 'haprev/events/DELETE_PARTICIPANT';

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
        const eventId = action.eventId
        const participants=action.participants
        return {...state,
            events: {
            ...state.events,
            [eventId]: {
                ...state.events[eventId] || null,
                participants: participants 
                }
            }
        }
    case DELETE_PARTICIPANT:
        const newParticipants=action.newParticipants
        return {...state,
            for:action.insId,
            events: {
            ...state.events,
            [action.eventId]: {
                ...state.events[action.eventId] || null,
                participants: newParticipants 
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

const deleteParticipantRes = (eventId,insId,newParticipants) =>({
    type: DELETE_PARTICIPANT,
    eventId: eventId,
    insId:insId,
    newParticipants: newParticipants,
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
    currentEvents = filter(eventsArray,(event) => {return event.id !== activityId})
    currentEventsObjects = keyBy(currentEvents, 'id');
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
    let res = 'ok'
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
            newParticipantsArray = Object.keys(newParticipants).map(key => {return newParticipants[key]})
            newParticipantsArray.push(newUser)
            dispatch(addParticipantRes(newParticipantsArray,event.id,event.institute))
            res = 'ok'
        })
        .catch(error => {console.log('Data could not be saved.',error); res = 'err'});
    return res
  }

  export const deleteParticipant = (activityId,insId,appId) => async(dispatch,state) => {
    let participantsObj=null
    let eventsState=false
    if(state().events && state().events.for == insId){
            participantsObj = state().events.events[activityId]['participants']
            eventsState = true
    }
    else{
        await firebase.database().ref('events/'+insId).child(activityId).child('participants').once('value', 
            async snapshot =>{ participantsObj = await snapshot.val() })
            .catch(error => {console.log('error',error)});
    }
    participantsArray = Object.keys(participantsObj).map(key => {return participantsObj[key]})
    currParticipants = filter(participantsArray,(participant) => {return participant.appId !== appId})
    await firebase.database().ref('events/'+insId).child(activityId)
        .update({participants:currParticipants})
        .then(() => {
            if(eventsState)
                dispatch(deleteParticipantRes(activityId,insId,currParticipants))
        })
}