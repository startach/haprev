import * as firebase from 'firebase';
import {getEvents} from './events';

const REQUEST_INSTITUTES = 'haprev/inst/REQUEST_INSTITUTES';
const RESPONSE_INSTITUTES = 'haprev/inet/RESPONSE_INSTITUTES';

const initalState = {
  status: '',
  institutes: [],
  selected: -1,
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_INSTITUTES:
      return { ...state, status: 'reqInst', institutes:null };
    case RESPONSE_INSTITUTES:
      return { ...state, status: '', institutes: action.institutes };
    default:
      return state;
  }
};

const requestInstitutes = () => (
  {
    type: REQUEST_INSTITUTES,
  }
);

const responseInstitutes = data => ({
  type: RESPONSE_INSTITUTES,
  institutes: data,
});

export const getInstitutes = () => async (dispatch) => {
  dispatch(requestInstitutes());
  firebase.database().ref('Instituts').once('value' , 
    snapshot => {
      var instituts = snapshot.val()
      var a = instituts.map((inst,k) => inst).filter(x=> x?true:false)
      dispatch(responseInstitutes(a))
    })
};

export const selectInstitute  = (instId,userId) => async (dispatch) => {
  await dispatch(getEvents(instId));
};


