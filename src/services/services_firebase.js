import * as firebase from 'firebase';
import Expo from 'expo';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDiRuZXqde0_r4I1FvkuAzq8HpfzvQ2lC8',
  authDomain: 'happrev.firebaseapp.com',
  databaseURL: 'https://happrev.firebaseio.com',
  storageBucket: 'happrev.appspot.com',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase.database.enableLogging(true);

const DELAY = 200;

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getUserData = async (uid) => {
  await timeout(DELAY);
  return {
    uid,
    first: 'dan',
    last: 'shamir',
    avatar:
      'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAy-AAAAJDQ2NDI3ZTFlLWE1YzAtNDBjOC1iMzJhLTVkYTQxN2MzNjdmMQ.jpg',
  };
};

const getDataFromService = async (repo) => {
  const db = await firebase.database().ref(repo).orderByKey();

  const data = await db.once('value');
  const valued = data.val();
  const result = Object.keys(valued).map(key => valued[key]);

  console.log(result);
  return result; // return only values and not all dictionary with keys
};

export const getContactsFromService = async () => {
  console.log('get users');
  await getDataFromService('users/');
};

export const getHospitalsFromService = async () => {
  console.log('get hospitals');
  await getDataFromService('hospitals/');
};

export const dummy = () => null;
// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  console.log('onAuth', user);
  if (user != null) {
    console.log('We are authenticated now!', user);
  }

  // Do other things
});

export async function loginWithFacebook() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('711733609025916', {
    permissions: ['public_profile'],
  });

  if (type === 'success') {
    console.log('elad1', token);

    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    console.log('elad2', credential);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log('error', error);
    });
  }
}

/*
// firebase.database.enableLogging(true);

$('#hitnadvutSubmit').click(() => {
  const date = $('#date').val();
  const hospital = $('#hospital_option').val();
  const mitnadvim = $('#mitnadvim_option').val();

  const key = `${hospital}-${date}`;

  console.log(date, hospital, mitnadvim);

  const ref = firebase.database().ref(`hitnadvut/${key}`);

  dataToSend = {
    date,
    users: mitnadvim,
    hospital,
  };
  ref.set(dataToSend, () => {
    console.log('saved');
  });
});

function createHospitalOptions() {
  createOptionListGeneric('hospitals/', '#hospital_option', hospital => hospital.name);
}

function createMitndadvimOptions() {
  const q = createOptionListGeneric('users/', '#mitnadvim_option', user => user.email);

  q.then(() => {
    $('#mitnadvim_option').SumoSelect();
  });
}

$('#btnFacebookLogin').click(() => {
  loginWithFacebook();
});

function loginWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API. var token = result.credential.accessToken; // The signed-in user info. var user = result.user;
      const profile = result.additionalUserInfo.profile;

      const email = profile.email;
      const name = profile.name;
      const imgUrl = profile.picture.data.url;

      addMitnadev(email, email, imgUrl, name);

      console.log(result);
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
}

function createHitnadvutList() {
  let userStore = [];
  let hospitalStore = [];
  // first set user store
  firebase
    .database()
    .ref('users/')
    .orderByKey()
    .once('value')
    .then((snapshot) => {
      console.log('start');
      userStore = snapshot.val();
    })
    .then(
      firebase.database().ref('hospitals/').orderByKey().once('value').then((snapshot) => {
        console.log('start');
        hospitalStore = snapshot.val();
      }),
    )
    .then(() => {
      refreshDataGeneric('hitnadvut/', '#hitnadvuts', (hitnadvut, keys) => {
        const hospitalLabel = hospitalStore[hitnadvut.hospital].name;

        let userHtml;
        for (var i = 0; i < hitnadvut.users.length; i++) {
          const user = userStore[hitnadvut.users[i]];

          userHtml += `<div>${user.email}
							  <img src="${user.avatarUrl}" width="32" height="32"/>
							</div>`;
        }

        return `<div class="hitnadvut" id="${keys[i]}">
							${hospitalLabel} ${hitnadvut.date}
							${userHtml}
						</div>`;
      });
    });
}

function createOptionListGeneric(collectionName, htmlSelector, labelSelector) {
  return firebase
    .database()
    .ref(collectionName)
    .orderByKey()
    .once('value')
    .then((snapshot) => {
      console.log('start');
      const entities = snapshot.val();
      const keys = Object.keys(entities);

      $(htmlSelector).html('');

      for (i = 0; i < keys.length; i++) {
        const entity = entities[keys[i]];

        const label = labelSelector(entity);

        $(htmlSelector).append(`<option value='${keys[i]}'>${label}</option>`);
      }

      $(htmlSelector).append('</select>');
    });
}

function refresUserData() {
  refreshDataGeneric('users/', '#users', (user, keys) => {
    return (
      `<div class="user" id="${
        keys[i]
      }">` +
      `<img width="100" height="100" src="${
        user.avatarUrl
      }"></img>` +
      `<div class="left"><span><b>email:</b>${
        user.email
      }</span>` +
      `<div class="aligner-item">${
        keys[i]
      }</div></div>`
    );
    ('</div>');
  });
}

function refreshHospitalsData() {
  refreshDataGeneric('hospitals/', '#hospitals', (hospital, keys) => `
		<div class="hospital">
			  <h2> ${hospital.name}</h2>
			  <img class="hospital_image" src="${hospital.pictureUrl}"></img>
			  <img class="hospital_logo" src="${hospital.logoUrl}"></img>
			  <h3>${hospital.racazName}</h3>
			<h3>${hospital.racazPhone}</h3>
			<h3>${hospital.racazUsername}<h3>
			</div>


		`);
}

function refreshDataGeneric(collectionName, htmlSelector, formatFunction) {
  firebase.database().ref(collectionName).orderByKey().once('value').then((snapshot) => {
    console.log('start');
    const users = snapshot.val();
    const keys = Object.keys(users);

    $(htmlSelector).html('<div class="cards">');

    for (i = 0; i < keys.length; i++) {
      const user = users[keys[i]];

      $(htmlSelector).append(formatFunction(user, keys));
    }

    $(htmlSelector).append('</div>');
  });
}

$(document).ready(() => {
  refresUserData();
  refreshHospitalsData();
  createHospitalOptions();
  createMitndadvimOptions();

  createHitnadvutList();
});

$('#submit').click(() => {
  const dataToSend = {};
  const userName = $('#userName').val();
  const email = $('#email').val();
  const avatarUrl = $('#avatarUrl').val();

  addMitnadev(userName, email, avatarUrl);

  console.log('clilck');
});

function addMitnadev(userName, email, avatarUrl, name) {
  userName = userName.replace(/\W/g, '');
  console.log(userName);
  const ref = firebase.database().ref(`users/${userName}`);

  dataToSend = {
    email,
    avatarUrl,
    name,
  };
  ref.set(dataToSend, () => {
    refresUserData();
  });
}
*/
