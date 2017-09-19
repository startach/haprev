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
    const firebaseToken = firebase.auth.FacebookAuthProvider.credential(token);
    console.log('elad2', firebaseToken);

    // Sign in with credential from the Facebook user.
    let res = await firebase.auth().signInWithCredential(firebaseToken);
    console.log('res', res);
  }
}

/*
        // firebase.database.enableLogging(true);

        $("#hitnadvutSubmit").click(function() {
            var date = $("#date").val();
            var hospital = $("#hospital_option").val();
            var mitnadvim = $("#mitnadvim_option").val();

            var key = hospital + '-' + date;

            console.log(date, hospital, mitnadvim);

            var ref = firebase.database().ref('hitnadvut/' + key)

            dataToSend = {

                "date": date,
                "users": mitnadvim,
                "hospital": hospital
            };
            ref.set(dataToSend, function() {
                console.log('saved');
            });
        })

        function createHospitalOptions() {
            createOptionListGeneric("hospitals/", "#hospital_option", function(hospital) {
                return hospital.name;
            })
        }

        function createMitndadvimOptions() {
            var q = createOptionListGeneric("users/", "#mitnadvim_option", function(user) {
                return user.email;
            })

            q.then(function() {
                $("#mitnadvim_option").SumoSelect();
            })


        }

        $("#btnFacebookLogin").click(function() {
            loginWithFacebook();
        })

        function loginWithFacebook() {
            var provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) { // This gives you a Facebook Access Token. You can use it to access the Facebook API. var token = result.credential.accessToken; // The signed-in user info. var user = result.user;
                var profile = result.additionalUserInfo.profile;

                var email = profile.email;
                var name = profile.name;
                var imgUrl = profile.picture.data.url;

                addMitnadev(email, email, imgUrl, name);

                console.log(result);
            }).catch(function(error) {
                // Handle Errors here.
                console.log(error);
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }

        function createHitnadvutList() {
            var userStore = [];
            var hospitalStore = [];
            // first set user store
            firebase.database().ref('users/').orderByKey().once('value').then(function(snapshot) {
                console.log('start');
                userStore = snapshot.val();
            }).then(
                firebase.database().ref('hospitals/').orderByKey().once('value').then(function(snapshot) {
                    console.log('start');
                    hospitalStore = snapshot.val();
                })).then(function() {

                refreshDataGeneric('hitnadvut/', '#hitnadvuts', function(hitnadvut, keys) {
                    var hospitalLabel = hospitalStore[hitnadvut.hospital].name;

                    var userHtml;
                    for (var i = 0; i < hitnadvut.users.length; i++) {
                        var user = userStore[hitnadvut.users[i]];

                        userHtml += `<div>${user.email}
                              <img src="${user.avatarUrl}" width="32" height="32"/>
                            </div>`
                    }

                    return `<div class="hitnadvut" id="${keys[i]}"> 
                            ${hospitalLabel} ${hitnadvut.date}
                            ${userHtml}
                        </div>`;
                })
            })
        }


        function createOptionListGeneric(collectionName, htmlSelector, labelSelector) {
                return firebase.database().ref(collectionName).orderByKey().once('value').then(function(snapshot) {
                console.log('start');
                var entities = snapshot.val();
                var keys = Object.keys(entities);

                $(htmlSelector).html(``);

                for (i = 0; i < keys.length; i++) {

                    var entity = entities[keys[i]];

                    var label = labelSelector(entity);

                    $(htmlSelector).append(`<option value='${keys[i]}'>${label}</option>`);
                }

                $(htmlSelector).append('</select>');
            });
        }

        function refresUserData() {
            refreshDataGeneric('users/', '#users', function(user, keys) {
                return '<div class="user" id="' + keys[i] + '">' +
                    '<img width="100" height="100" src="' + user.avatarUrl + '"></img>' +
                    '<div class="left"><span><b>email:</b>' + user.email + '</span>' +
                    '<div class="aligner-item">' + keys[i] + '</div></div>'
                '</div>';
            })
        }

        function refreshHospitalsData() {
            refreshDataGeneric('hospitals/', '#hospitals', function(hospital, keys) {
                return `
        <div class="hospital">
              <h2> ${hospital.name}</h2>
              <img class="hospital_image" src="${hospital.pictureUrl}"></img>
              <img class="hospital_logo" src="${hospital.logoUrl}"></img>
              <h3>${hospital.racazName}</h3>
            <h3>${hospital.racazPhone}</h3>
            <h3>${hospital.racazUsername}<h3>
            </div>


        `;
            })
        }

        function refreshDataGeneric(collectionName, htmlSelector, formatFunction) {
        firebase.database().ref(collectionName).orderByKey().once('value').then(function(snapshot) {
                console.log('start');
                var users = snapshot.val();
                var keys = Object.keys(users);

                $(htmlSelector).html('<div class="cards">');

                for (i = 0; i < keys.length; i++) {

                    var user = users[keys[i]];


                    $(htmlSelector).append(
                        formatFunction(user, keys)

                    );
                }

                $(htmlSelector).append('</div>')
            });
        }

        $(document).ready(function() {
            refresUserData();
            refreshHospitalsData();
            createHospitalOptions();
            createMitndadvimOptions();

            createHitnadvutList();
        });

        $("#submit").click(function() {


            var dataToSend = {};
            var userName = $("#userName").val();
            var email = $("#email").val();
            var avatarUrl = $("#avatarUrl").val();

            addMitnadev(userName, email, avatarUrl);

            console.log('clilck');
        })

        function addMitnadev(userName, email, avatarUrl, name) {
            userName = userName.replace(/\W/g, '')
            console.log(userName);
            var ref = firebase.database().ref('users/' + userName)

            dataToSend = {
                "email": email,
                "avatarUrl": avatarUrl,
                "name": name
            };
            ref.set(dataToSend, function() {
                refresUserData();
            });
        }

        */
