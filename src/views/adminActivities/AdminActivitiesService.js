import * as firebase from 'firebase';
import {getUserTokenNotification,sendPushNotification} from '../notification/NotificationService';

export const getHospitalName = async (instituteId) => {
  let hospitalName = ''
  await firebase.database().ref('Instituts/').child(instituteId).once('value',
    snapshot => { hospitalName = snapshot.val().name })
  return hospitalName
}

export const getUserData = async(appId) => {
  let avatarUrl = null
  let phone = null
  let userId = null
  let name = 'לא זמין'
  let extraParticipants

  await firebase.database().ref('users').orderByChild('appId').equalTo(appId).once('value' ,
    snapshot => {
      let dbUser = snapshot.val()
      if (dbUser) {
        const key=[Object.keys(dbUser)[0]]
        avatarUrl = dbUser[key].avatarUrl || null
        phone = dbUser[key].phone || null
        userId = dbUser[key].userId || null
        name = (dbUser[key].first +' '+ dbUser[key].last) || null
        extraParticipants = dbUser[key].extraParticipants || null
      }
    }
  )
  return {avatarUrl:avatarUrl,phone:phone,userId:userId,name:name, extraParticipants}
}

export const makeArrayFromObjects = (objects) => {
  let objectsArray= []
  for (var key in objects){
    objectsArray.push(objects[key])
  }
  return objectsArray
}

export const sortArrayByDate = (objectsArray)=>{
  return objectsArray.sort((a,b)=>{
    return new Date(a.fullFormatDate).getTime() - new Date(b.fullFormatDate).getTime()
  });
}

export const sortArrayByDate_Descending = (objectsArray)=>{
  return objectsArray.sort((a,b)=>{
    return new Date(b.fullFormatDate).getTime() - new Date(a.fullFormatDate).getTime()
  });
}

export const makeArrayParticipants = (events) =>{
  let participantsArray= []
  for (var key in events) {
      if(events[key].participants){
          temp = []
          for (var pKey in events[key].participants)
              if(events[key].participants[pKey])
                  temp.push(events[key].participants[pKey])
          participantsArray.push(temp)
      }
      else {
          temp = []
          participantsArray.push(temp)
      }
  }
  return participantsArray
}

export const setMessage = async(msg,userId,title) => {
  ref = await firebase.database().ref('users/'+userId+'/messages').push()
    let key = ref.key
    Object.assign(msg, {id:key})
    res = await ref.set(msg)
    .then(async() => {
      let userToken = await getUserTokenNotification(userId)
      userToken && sendPushNotification(userToken,title,msg.message)
      return 'ok'
    })
    .catch(error => {
      console.log('Data could not be saved.' + error);
      return 'err'
    })
  return res
}

export const renderActicityData = async(eventId,institutsId) =>{
  let event = {}
  await firebase.database().ref('events/'+institutsId).orderByKey().equalTo(eventId)
  .once("value" ,snapshot => {
      let eventData = snapshot.val()
      if(eventData)
        event = eventData[eventId]
    }
  )
  return event
}

export const deleteActivityByUserId = async(userId,activityId,insId) => {
  ref  = await firebase.database().ref('users/'+userId+'/activities/'+insId).child(activityId).set({})
    .then(() => {return 'ok'})
    .catch(error => {
      console.log('Data could not be saved.' + error);
      return 'err'
    })
  return ref
}