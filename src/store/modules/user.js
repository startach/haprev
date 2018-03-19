import { Authorize } from "../../services";
import * as firebase from 'firebase';

const AUTHORIZE_REQ = "haprev/user/AUTHORIZE_REQ";
const AUTHORIZE_RES = "haprev/user/AUTHORIZE_RES";
const REGISTER_REQ = "haprev/user/REGISTER_REQ";
const REGISTER_RES = "haprev/user/REGISTER_RES";
const NO_USER_FOUND = "haprev/user/NO_USER_FOUND";

const initalState = {
  user: {},
  status: ""
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case AUTHORIZE_REQ:
      return { ...state, status: "auth_request", user: {} };
    case AUTHORIZE_RES:
    {
      //console.log (action)
      return { ...state, status: "", user: action.payload }}
    case NO_USER_FOUND:
      return {...state,status:"no_user" }
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

// export const authorize = appId =>  dispatch  => {
//   dispatch(authReq(appId))
//   firebase.database().ref('users/'+appId).once('value' , 
//     snapshot => {
//       let dbRes = snapshot.val();
//       if (dbRes)
//         dispatch (authRes( snapshot.val()))
//       else
//         dispatch (noUserFound())
//         //console.log('handle user not found')
//   })
// }

export const authorize = (appId) => async (dispatch)  => {
    dispatch(authReq(appId));
    const user = await Authorize(appId);
    dispatch (authRes( user));
};

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


