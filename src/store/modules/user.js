import { Authorize } from "../../services";
import * as firebase from 'firebase';

const AUTHORIZE_REQ = "haprev/user/AUTHORIZE_REQ";
const AUTHORIZE_RES = "haprev/user/AUTHORIZE_RES";
const REGISTER_REQ = "haprev/user/REGISTER_REQ";
const REGISTER_RES = "haprev/user/REGISTER_RES";
const UPDATE_REQ = "haprev/user/UPDATE_REQ";
const UPDATE_RES = "haprev/user/UPDATE_RES";
const NO_USER_FOUND = "haprev/user/NO_USER_FOUND";
const SPLASH = "haprev/user/SPLASH";

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

export const authorize = appId =>  dispatch  => {
  // console.log('user.js: Authorizing')
  dispatch(authReq(appId))
  firebase.database().ref('users/'+appId).once('value' , 
    snapshot => {
      let dbRes = snapshot.val();
      if (dbRes)
        dispatch (authRes( snapshot.val()))
      else
        dispatch (noUserFound())
        //console.log('handle user not found')
  })
}

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

export const register = user =>  dispatch  => {
  // console.log('Registering @ user')
  user.appId = Expo.Constants.deviceId
  dispatch(registerReq(user))
  let ref = firebase.database().ref('users/'+user.appId)
  ref.once('value', 
    snapshot => {
      // console.log('Register response', snapshot)
      let dbRes = snapshot.val()
      if (dbRes) {
        console.log(dbRes)
        dispatch (registerRes(dbRes))
      } else {
        console.log('handle user not found')
        dispatch (noUserFound())
      }
  })
  ref.set(user) 
}

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

export const update = user =>  dispatch  => {
  // console.log('Updating profile @ user')
  dispatch(registerReq(user))
  let ref = firebase.database().ref('users/'+Expo.Constants.deviceId)
  ref.once('value', 
    snapshot => {
      // console.log('Register response', snapshot)
      let dbRes = snapshot.val()
      if (dbRes) {
        console.log(dbRes)
        dispatch (registerRes(dbRes))
      } else {
        console.log('handle user not found')
        dispatch (noUserFound())
      }
  })
  ref.update(user) 
}

export const splash = (display) => ({type:SPLASH , payload:display})  
