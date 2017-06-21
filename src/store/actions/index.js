import {DUMMY}  from './actionList'

export const dummy = (message)=>{
    return {
        type: DUMMY,
        payload:message
    }
}
