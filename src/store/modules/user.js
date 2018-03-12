import { Authorize } from "../../services";
import * as firebase from 'firebase';

const AUTHORIZE_REQ = "haprev/user/AUTHORIZE_REQ";
const AUTHORIZE_RES = "haprev/user/AUTHORIZE_RES";
const REGISTER_REQ = "haprev/user/REGISTER_REQ";
const REGISTER_RES = "haprev/user/REGISTER_RES";

const initalState = {
  user: {},
  status: ""
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case AUTHORIZE_REQ:
      return { ...state, status: "request", user: {} };
    case AUTHORIZE_RES:
    {
      //console.log (action)
      return { ...state, status: "", user: action.payload }}
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

const registerReq = user => ({
  type: REGISTER_REQ,
  payload: user
});

const registerRes = data => {
  let tmpRes = {};
  if (data)
    tmpRes = {
      type: REGISTER_RES,
      payload: data
    };
  return tmpRes;
};

export const authorize = (appId) => async (dispatch)  => {
  // dispatch(authReq(appId));
  // firebase.database().ref('users/'+appId).on('value' , 
  //   snapshot => {
  //   dispatch (authRes( snapshot.val()));
  // })
};
