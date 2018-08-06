import '../../../../../firebase/firebase-config';
import firebase from 'firebase';


// const currUser = firebase.auth().currentUser.uid;
const dbRef = firebase.database().ref();

export function getCurrentUserData() {
  /* const userUID = firebase.auth().currentUser.uid;
  const users = dbRef.child(`users/${userUID}`);
  // users.once('value', snapshot => snapshot.val());
  return new Promise(((resolve, reject) => {
    users.once('value', (snapshot) => {
      resolve(snapshot.val());
    }, (error) => {
      reject(error.code);
    });
  })); */
  const userUID = firebase.auth().currentUser.uid;
  const dataPromise = fetch(`https://us-central1-slackxt.cloudfunctions.net/getUserInfo?userId=${userUID}`);
  return new Promise((resolve, reject) => {
    dataPromise
      .then((res) => {
        res.json().then((data) => {
          resolve(data);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateUserData(userData) {
  // alert('test');
  const userUID = firebase.auth().currentUser.uid;

  dbRef.child(`users/${userUID}`).set({
    username: userData.username,
    accessToken: userData.accessToken,
    name: userData.name,
    email: 'updated_mailid@test.com',
    profilePicture: userData.profilePicture,
    phoneNumber: userData.phoneNumber,
    gitURL: userData.gitURL,
    teams: userData.teams,
    status: userData.status,
    permission: userData.permission,
  });
  // console.log(currUsrTempData);
}
