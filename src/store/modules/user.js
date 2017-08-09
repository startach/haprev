import { getUserData } from '../../services/services';

// const LOGGEDIN = 'haprev/user/LOGGEDIN';
const REQUEST_USER_DATE = 'haprev/user/REQUEST_USER_DATE';
const RESPONSE_USER_DATE = 'haprev/user/RESPONSE_USER_DATE';

const initalState = {
  status: '',
  user: {},
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_USER_DATE:
      return { ...state, status: 'request' };
    case RESPONSE_USER_DATE:
      return { ...state, status: '', user: action.user };

    default:
      return state;
  }
};

const requestUserData = uid => (
  {
    type: REQUEST_USER_DATE,
    uid,
  }
);

const responseUserData = data => ({
  type: RESPONSE_USER_DATE,
  user: data,
});

export const loggedIn = uid => async (dispatch) => {
  dispatch(requestUserData(uid));
  const userData = await getUserData(uid);
  dispatch(responseUserData(userData));
};
