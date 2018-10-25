import * as firebase from 'firebase';

export const getImages = async () => {
    let images = []
    await firebase.database().ref('images/').child('vol').once('value',
        snapshot => { 
            images = snapshot.val().filter(img=>img!=null)
        })
  return images
}