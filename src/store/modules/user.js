import { Authorize } from "../../services";
import { Register } from "../../services";

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
      return { ...state, status: "", user: action.payload };
    case REGISTER_REQ:
      return { ...state, status: "request" };
    case REGISTER_RES:
      return { ...state, status: "", user: action.payload };
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
  dispatch(authReq(appId));
  const user = await Authorize(appId);
  dispatch (authRes(user));
};

export const register = (user) => async (dispatch)  => {
  let userApp = {...user, appId:Expo.Constants.deviceId}
  dispatch(registerReq(userApp));
  const response = await Register(userApp);
  alert(JSON.stringify(response));
  dispatch (registerRes(response));
};
