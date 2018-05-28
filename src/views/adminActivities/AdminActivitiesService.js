import * as firebase from 'firebase';

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
  await firebase.database().ref('users').orderByChild('appId').equalTo(appId).once('value' , 
    snapshot => {
      let dbUser = snapshot.val()
      if (dbUser) {
        key=[Object.keys(dbUser)[0]]
        avatarUrl = dbUser[key].avatarUrl || null
        phone = dbUser[key].phone || null
        userId = dbUser[key].userId || null
      } 
    }
  )
  return {avatarUrl:avatarUrl,phone:phone,userId:userId}
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
    return new Date(b.fullFormatDate).getTime() - new Date(a.fullFormatDate).getTime()
  });
}
export const makeArrayParticipants = (events) =>{
  let participantsArray= []
  let index = 0
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
      index++;
  }
  return participantsArray
} 

export const setMessage = async(msg,userId) => {
  // format msg -> {id: 'ek67', message: 'ההתנדבות ב 9.1 בבית חולים בלינסון בוטלה'}
  res = await firebase.database().ref('users/'+userId+'/messages')
    .push().set(msg)
    .then(() => {return 'ok'})
    .catch(error => {
      console.log('Data could not be saved.' + error);
      return 'err'
    })
  return res
}