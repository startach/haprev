import * as firebase from 'firebase'
import { keys } from './keys'
import { ENV, API_KEY, AUTH_DOMAIN, DB_URL, PROJECT_ID, STORAGE_BUCKET, MSG_SENDER_ID } from 'react-native-dotenv'

// console.log("TCL: ENV", ENV)

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DB_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MSG_SENDER_ID
// }
const firebaseConfig = {
  apiKey: API_KEY || keys.apiKey,
  authDomain: AUTH_DOMAIN || keys.authDomain,
  databaseURL: DB_URL || keys.databaseURL,
  projectId: PROJECT_ID || keys.projectId,
  storageBucket: STORAGE_BUCKET || keys.storageBucket,
  messagingSenderId: MSG_SENDER_ID || keys.messagingSenderId
}

export default () => {
  firebase.initializeApp(firebaseConfig)
  console.log("TCL: firebaseConfig", firebaseConfig)
}
