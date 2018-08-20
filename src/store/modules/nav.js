const AUTHORIZE_REQ = "haprev/user/AUTHORIZE_REQ";
const AUTHORIZE_RES = "haprev/user/AUTHORIZE_RES";
const SETTINGS_REQ = "haprev/user/SETTINGS_REQ";

const initalState = {
  header: {},
  status: "",
  settings: false,
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case AUTHORIZE_REQ:
      return { ...state, header: "request", user: {} };
    case AUTHORIZE_RES:
      return { ...state, header: "", user: action.payload };
    case SETTINGS_REQ:
      return {...state, settings: !state.settings }
    default:
      return state;
  }
};

const authReq = appId => ({
  type: AUTHORIZE_REQ,
  payload: appId
});

const settingsReq = () => ({
  type: SETTINGS_REQ,
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

const openSettings = () => dispatch =>{
  dispatch(settingsReq())
};