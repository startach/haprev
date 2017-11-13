import {
  GetHospitalEvents,
  GetHospitalEventsForUser
} from "../../services/services";

const REQUEST_EVENTS = "haprev/event/REQUEST_EVENT";
const RESPONSE_EVENTS = "haprev/event/RESPONSE_EVENT";
const REQUEST_USER_EVENTS = "haprev/event/REQUEST_USER_EVENT";
const RESPONSE_USER_EVENTS = "haprev/event/RESPONSE_USER_EVENT";

const initalState = {
  usersEvents: []
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return {
        ...state,
        userEvents: [
          ...state.userEvents,
          {
            userId: action.userId,
            hospitalId: action.hospitalId,
            status: "request"
          }
        ]
      };
    case RESPONSE_EVENTS:
      const record = state.userEvents.find(
        e => e.hospitalId === action.hospitalId && e.userId === action.userId,
      );
      Object.assign(record, {
        status: "",
        events: action.data
      });

      return {
        ...state,
        userEvents: [...state.userEvents, record]
      };

    default:
      return state;
  }
};

const requestEvents = hospitalId => ({
  type: REQUEST_EVENTS,
  hospitalId
});

const responseEvents = (data, hospitalId) => ({
  type: RESPONSE_EVENTS,
  events: data,
  hospitalId
});

const requestUserEvents = (hospitalId, userId) => ({
  type: REQUEST_USER_EVENTS,
  hospitalId,
  userId
});

const responseUserEvents = (hospitalId, userId, data) => ({
  type: RESPONSE_USER_EVENTS,
  userEvents: data,
  hospitalId,
  userId
});

export const getHospitalEvents = () => async dispatch => {
  dispatch(requestEvents());
  const hospitalEvents = await GetHospitalEvents();
  dispatch(responseEvents(hospitalEvents));
  dispatch(requestUserEvents());
  const hospitalUserEvents = await GetHospitalEventsForUser();
  dispatch(responseUserEvents(hospitalUserEvents));
};
