import * as firebase from 'firebase';

export const getHospitalName = async (hospitalId) => {
    let hospitalName = ''
    await firebase.database().ref('Instituts/').child(hospitalId).once('value' , 
    snapshot => { hospitalName = snapshot.val().name })
  return hospitalName
}