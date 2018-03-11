import * as firebase from 'firebase';

/*
const firebaseConfig = {
  apiKey: "AIzaSyCyXVdLnKq_t3Rn9v7h9ZGlFzj4T7rnvd0",
  authDomain: "haprev-sandbox.firebaseapp.com",
  databaseURL: "https://haprev-sandbox.firebaseio.com",
  storageBucket: "haprev-sandbox.appspot.com"
};
*/

const firebaseConfig = {
    apiKey: "AIzaSyDiRuZXqde0_r4I1FvkuAzq8HpfzvQ2lC8",
    authDomain: "happrev.firebaseapp.com",
    databaseURL: "https://happrev.firebaseio.com",
    projectId: "happrev",
    storageBucket: "happrev.appspot.com",
    messagingSenderId: "725865240760"
  };
  
export default ()=>{
    firebase.initializeApp(firebaseConfig);
}


