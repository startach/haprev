import * as firebase from 'firebase';
import {keys} from './keys';

const firebaseConfig = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
    projectId: keys.projectId,
    storageBucket: keys.storageBucket,
    messagingSenderId: keys.messagingSenderId 
};
  
export default ()=>{
    firebase.initializeApp(firebaseConfig);
}