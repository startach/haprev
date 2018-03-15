import { GetInstitutesFromService,GetVolunteering,GetMyVolunteering } from '../../services'
import * as firebase from 'firebase';

const REQUEST_INSTITUTES = 'haprev/inst/REQUEST_INSTITUTES';
const RESPONSE_INSTITUTES = 'haprev/inet/RESPONSE_INSTITUTES';
const SELECT_INSTITUTE = 'haprev/inst/SELECT_INSTITUTE';
const REQUEST_VOLS = 'haprev/inst/REQUEST_VOL';
const RESPONSE_VOLS = 'haprev/inet/RESPONSE_VOLS';
const RESPONSE_MY_VOLS = 'haprev/inet/RESPONSE_MY_VOLS';


const initalState = {
  status: '',
  institutes: [],
  selected: -1,
  vols:[],
  myVols:[],
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_INSTITUTES:
      return { ...state, status: 'reqInst', institutes:null };
    case RESPONSE_INSTITUTES:
      return { ...state, status: '', institutes: action.institutes };
    case SELECT_INSTITUTE:
        return { ...state, selected: action.selected };
      case REQUEST_VOLS:
        return {...state, status:'reqVols', vols:null}
      case RESPONSE_VOLS:
        return{...state,status:'',vols:action.vols }
      case RESPONSE_MY_VOLS:
        return {...state, status:'', myVols:action.myVols}
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

const requestSelectInstitue = instId =>(
  {
    type: SELECT_INSTITUTE,
    selected: instId,
  })

const reqGetVols = instId =>(
  {
    type: REQUEST_VOLS,
    requestFor: instId
  }
)

const responseVols = (instId, vols) =>({
  type: RESPONSE_VOLS,
  vols: vols
  })

const responseMyVols = (instId, vols) => ({
  type:RESPONSE_MY_VOLS,
  instId,
  myVols: vols
})

  export const getInstitutes = () => async (dispatch) => {
  dispatch(requestInstitutes());
  //const institutes = await GetInstitutesFromService();
  firebase.database().ref('Instituts').once('value' , 
    snapshot => {
      var instituts = snapshot.val()
      var a = instituts.map((inst,k) => inst).filter(x=> x?true:false)
      dispatch(responseInstitutes(a))
    })
};

export const selectInstitute  = (instId,userId) => async (dispatch) => {
  dispatch(requestSelectInstitue);
  dispatch(reqGetVols(instId))
  const vols = await GetVolunteering(instId)
  dispatch ( responseVols(instId ,vols))
  const myVols = await GetMyVolunteering(userId,instId)
  dispatch(responseMyVols(instId, myVols));
};


