import { Authorize } from "../../services";

const AUTHORIZE_REQ = "haprev/user/AUTHORIZE_REQ";
const AUTHORIZE_RES = "haprev/user/AUTHORIZE_RES";

const initalState = {
  header: {},
  status: ""
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case AUTHORIZE_REQ:
      return { ...state, header: "request", user: {} };
    case AUTHORIZE_RES:
      return { ...state, header: "", user: action.payload };
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
  console.log('Authorizing @ nav' , user)
  //dispatch (authRes( user));
};
