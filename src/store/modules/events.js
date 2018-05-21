import * as firebase from 'firebase';

const REQUEST_EVENTS = 'haprev/events/REQUEST_EVENTS';
const RESPONSE_EVENTS = 'haprev/events/RESPONSE_EVENTS';
const RESPONSE_NEW_ACTIVITY = 'haprev/events/RESPONSE_NEW_ACTIVITY';

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

export const getEvents = instituteId => async (dispatch,state) =>{
    if(state().events.status != 'reqEvents'){
        dispatch(eventsReq(instituteId))
        res = firebase.database().ref('events/').child(instituteId).once('value', 
            snapshot =>{
                dispatch(eventsRes(snapshot.val()));
            })
            .then(() => {return 'ok'})
            .catch(error => {
                console.log('error data events .' + error);
                return 'err'
            });
        return res;
    }
    return 'reqEvents'
}

export const addNewActivity = (activityName,appId,coordinator,date,time,fullFormatDate) => async(dispatch) => {
    let res = null
    var objActivity = {}   
    let newActivity = {
        caption: activityName,
        coordinator: appId,
        institute:coordinator,
        date: date,
        time: time,
        fullFormatDate: fullFormatDate
    }
    ref  = await firebase.database().ref('events/'+coordinator).push()
    objActivity[ref.key] = newActivity;
    await ref.set(newActivity)
        .then(() => {
            dispatch(newActivityRes(objActivity))
            res = 'ok'
        })
        .catch(error => {console.log('Data could not be saved.',error); res = 'err'});
    return res
}