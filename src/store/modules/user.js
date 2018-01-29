import { Authorize } from "../../services";

const AUTHORIZE_REQ = "haprev/user/AUTHORIZE_REQ";
const AUTHORIZE_RES = "haprev/user/AUTHORIZE_RES";

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

export const authorize = (appId) => async (dispatch)  => {
  dispatch(authReq(appId));
  const user = await Authorize(appId);
  dispatch (authRes( user));
};
