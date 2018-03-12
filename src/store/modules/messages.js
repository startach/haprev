import { GetMessages,ReadMessage,ApproveMessage } from "../../services";

const MESSAGES_REQ = "haprev/user/MESSAGES_REQ";
const MESSAGES_RES = "haprev/user/MESSAGES_RES";
const READ_MESSAGE_REQ = "haprev/user/RAED_MESSAGE_REQ";
const READ_MESSAGE_RES = "haprev/user/RAED_MESSAGE_RES";

const initalState = {
    messages: {},
    status: "",  
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case MESSAGES_REQ:
      return { ...state, status: "request", messages: {}};
    case MESSAGES_RES:
      return { ...state, status: "", messages: action.payload };
    case READ_MESSAGE_REQ:
      return { ...state, status: "request" };
    case READ_MESSAGE_RES:
      return { ...state, 
        status: "", 
        messages: state.messages.filter(msg => { return msg.id !== action.payload }) 
      };
    default:
      return state;
  }
};

const messagesReq = () => ({
    type: MESSAGES_REQ,
  });
  
  const messagesRes = msgs => {
    let tmpRes = {};
    if (msgs)
      tmpRes = {
        type: MESSAGES_RES,
        payload: msgs
      };
    return tmpRes;
  };
  
  export const readMessagesReq = () => ({
    type: READ_MESSAGE_REQ,
  });
  
  export const readMessagesRes = msgId => ({
        type: READ_MESSAGE_RES,
        payload: msgId
  });
  
  
  export const messageResult = (appId) => async (dispatch)  => {
    dispatch(messagesReq());
    const messages = await GetMessages(appId);
    dispatch(messagesRes(messages));  
  };