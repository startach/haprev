import * as firebase from 'firebase';

const REQUEST_EVENTS = 'haprev/events/REQUEST_EVENTS';
const RESPONSE_EVENTS = 'haprev/events/RESPONSE_EVENTS';


const initalState = {
  status: '',
  events:{},
  for:null
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return { ...state, status: 'reqEvents',for:action.payload  };
    case  RESPONSE_EVENTS:
        const newEvents = state.events[state.for]= action.payload;
        return { ...state, status: '',for:'' , events:newEvents };
    default:
      return state;
  }
};

const eventsReq = instId => {
    return ({
        type: REQUEST_EVENTS,
        payload: instId
    })
}

const eventsRes = data =>({
    type: RESPONSE_EVENTS,
    payload:data
});

export const getEvents =instId => async  (dispatch) =>{
    dispatch(eventsReq(instId))
    firebase.database().ref('events/'+instId ).once('value', 
    snapshot =>{
        dispatch(eventsRes( snapshot.val()));
    });
   
    /*
   let ref = firebase.database().ref('kukus/c')
   //ref.once('value' , a=> console.log('kuku', a.val()))
   var nk = ref.push()
    nk.set ({d:'eeeee'})
   */
}







