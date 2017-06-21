import {DUMMY} from  '../actions/actionList'

const initalState = {
    dummy:'stam'
}

export default  dummyReducer = (state =initalState, action ) =>{
    switch(action.type){
        case DUMMY:
            return ({...state, dummy:action.payload})
        default:
            return state
    }
}