import * as firebase from 'firebase';
import _ from 'lodash';

const AUTHORIZE_REQ = "haprev/user/AUTHORIZE_REQ";
const AUTHORIZE_RES = "haprev/user/AUTHORIZE_RES";
const REGISTER_REQ = "haprev/user/REGISTER_REQ";
const REGISTER_RES = "haprev/user/REGISTER_RES";
const UPDATE_REQ = "haprev/user/UPDATE_REQ";
const UPDATE_RES = "haprev/user/UPDATE_RES";
const NO_USER_FOUND = "haprev/user/NO_USER_FOUND";
const SPLASH = "haprev/user/SPLASH";
const SET_MESSAGE_READ = "haprev/user/SET_MESSAGE_READ";
const UPDATE_NEW_EVENTS = "hapre/user/UPDATE_NEW_EVENTS"

const initalState = {
  user: {},
  status: '',
  splashStatus:false,
  authStatus:''
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case AUTHORIZE_REQ:
      return { ...state, authStatus: 'auth_request', user: {} };
    case AUTHORIZE_RES:
      return { ...state, authStatus: 'user', user: action.payload ,status:canProceed(state) }
    case REGISTER_REQ:
      return { ...state, authStatus: 'reg_request', user: {} };
    case REGISTER_RES:
      return { ...state, authStatus: 'user', user: action.payload ,status:canProceed(state) }
    case UPDATE_REQ:
      return { ...state, authStatus: 'update_request'};
    case UPDATE_RES:
      return { ...state, authStatus: 'user', user: action.payload ,status:canProceed(state) }
    case NO_USER_FOUND:
      return {...state,authStatus:'no_user',status:canProceed(state) }
    case SPLASH:
      return {...state, splashStatus: action.payload,status:canProceed(state)}
    case SET_MESSAGE_READ:
      return {...state,
              user: {
                ...state.user,
                messages: action.payload  
              } 
           };
    case UPDATE_NEW_EVENTS:
      return {...state,
              user: {
                ...state.user,
                activities:{
                  ...state.user.activities || null,
                  [action.insId]: action.newEvents
                }
              }
            }   
    default:
      return state;
  }
};

const authReq = appId => ({
  type: AUTHORIZE_REQ,
  payload: appId
});

const authRes = data => {
  let tmpRes = {};
  if (data)
    tmpRes = {
      type: AUTHORIZE_RES,
      payload: data
    };
  return tmpRes;
};

const noUserFound = () =>({
  type: NO_USER_FOUND
})

const canProceed = state =>{
  return  (!state.user.splashStatus && state.user.authStatus!='auth_request')
}

const registerReq = user => ({
  type: REGISTER_REQ,
  payload: user
})

const registerRes = data => {
  let tmpRes = {};
  if (data)
    tmpRes = {
      type: REGISTER_RES,
      payload: data
    }
  return tmpRes;
}

const updateNewEvents = (newEvents,insId) => ({
  type: UPDATE_NEW_EVENTS,
  newEvents: newEvents,
  insId: insId
})

const updateReq = user => ({
  type: UPDATE_REQ,
  payload: user
})

const updateRes = data => {
  let tmpRes = {};
  if (data)
    tmpRes = {
      type: UPDATE_RES,
      payload: data
    }
  return tmpRes;
}
export const splash = (display) => ({
  type:SPLASH , 
  payload:display
})  

const setMessagesRead = msgId => {
  return {
    type: SET_MESSAGE_READ,
    payload: msgId
  }
}

export const authorize = appId =>  dispatch  => {
  dispatch(authReq(appId))
  // firebase.database().ref('users/'+appId).once('value' ,
  // Is there any user associated with this appId? 
  firebase.database().ref('users').orderByChild('appId').equalTo(appId).once('value' , 
    snapshot => {
      let dbResList = snapshot.val()
      if (dbResList) {
        // Get the 1st response
        let userId = Object.keys(dbResList)[0]
        let dbRes = dbResList[userId]
        // Keep the key for later updates!!
        dbRes.userId = userId
        dispatch (authRes(dbRes))
      } else {
        dispatch (noUserFound())
      }
  })
}

export const register = user =>  dispatch  => {
  user.appId = Expo.Constants.deviceId
  let ref = firebase.database().ref('users')
  // Query by phone first...
  ref.orderByChild('phone').equalTo(user.phone).once('value' , 
    snapshot => {
      let dbResList = snapshot.val()
      if (dbResList) {
        // Assume that the user changed the device & we need to update
        let userId = Object.keys(dbResList)[0]
        user.userId = userId
        update(user)(dispatch)
      } else { // New user
        dispatch(registerReq(user))
        user.userId = ref.push(user).key
        dispatch (registerRes(user))
      }
  })
}

export const update = user =>  dispatch  => {
  dispatch(registerReq(user))
  let ref = firebase.database().ref('users/'+user.userId)
  ref.once('value', 
    snapshot => {
      let dbRes = snapshot.val()
      if (dbRes) {
        dispatch (registerRes(dbRes))
      } else {
        //handle user not found
        dispatch (noUserFound())
      }
  })
  ref.update(user) 
}

export const readMessage = msgId => async (dispatch,state)  => {
  messagesObj = state().user.user.messages;
  messagesArray = Object.keys(messagesObj).map(key => { return messagesObj[key] });
  currentMessages = messagesArray.filter(msg => { return msg.id !== msgId })
  await dispatch(setMessagesRead(currentMessages));

  let res = firebase.database().ref('users/'+state().user.user.userId).update({messages: state().user.user.messages})
    .then(() => {
      return 'ok'
    })
    .catch(error => {
      console.log('Data could not be saved.' + error);
      return 'err'
    });
  return res;  
};

export const addEventToUser = (userId,event) => async(dispatch,state) => {
  let res = 'ok'
  const insId = event.institute
  newActivity = {
      caption: event.caption,
      fullFormatDate: event.fullFormatDate,
      id:event.id,
  }
  ref  = await firebase.database().ref('users/'+userId+'/activities/'+insId)
  .child(event.id)
  .set(newActivity)
      .then(() => {
        if(state().user.user.activities)
            newEventsObj = state().user.user.activities[insId] || []
        else
          newEventsObj = []
        newEventsArray = Object.keys(newEventsObj).map(key => {return newEventsObj[key]})
        newEventsArray.push(newActivity)
        dispatch(updateNewEvents(newEventsArray,event.institute))
        res = 'ok'
      })
      .catch(error => {console.log('Data could not be saved.',error); res = 'err'});
  return res
}

export const deleteActivity = (activityId,insId) => async(dispatch,state) => {
  //function - delete my (current user) activity
  let participantsObj=null
  let eventsState=false
  let currentUser=state().user.user
  activitiesObj = currentUser.activities[insId]
  activitiesArray = Object.keys(activitiesObj).map(key => {return activitiesObj[key]})
  currActivities = _.filter(activitiesArray,(activity) => {return activity.id !== activityId})
  await firebase.database().ref('users/'+currentUser.userId).child('activities')
      .update({[insId]:currActivities})
      .then(() => {
              dispatch(updateNewEvents(currActivities,insId))
      })
}