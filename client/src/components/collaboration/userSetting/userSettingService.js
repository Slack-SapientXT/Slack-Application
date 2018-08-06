import firebase from 'firebase';
import { config } from '../../../../../config/config';

<<<<<<< HEAD
const jQuery = require('jquery');

=======
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();
console.log(database);


<<<<<<< HEAD
function getAllContacts() {
  const userContactref = firebase.database().ref('team001/users/userID001/contact');
  userContactref.on('value', (snapshot) => {
    const getAllContactValue = snapshot.val();
    let getAllContactHtml = '';
    console.log('getContact', getAllContactValue);
    const abc = getAllContactValue.map((contactVal) => {
      getAllContactHtml += `
        <div>
            <div class="buttom-panel text-center mt-1">
              <div>${contactVal}</div>
                  <div>
                      <button id="muteContact">mute</button>
                      <button id="unmuteContact">unmute</buttob>
                      <button id="removeContact">remove</button>
                  </div>
                </form>
            </div>
        </div>
        `;
      return getAllContactHtml;
    });
    jQuery('#showContactInformation').append(getAllContactHtml);
  });
}
document.getElementById('userContacts').addEventListener('click', getAllContacts);


document.getElementById('muteContact').addEventListener('click', getAllContacts);
document.getElementById('unmuteContact').addEventListener('click', getAllContacts);
document.getElementById('removeContact').addEventListener('click', getAllContacts);
//= ============================================================================================
// function fnCreateChannel() {
//   const channelref = database.ref(`channels/${123}`).set({
//     channelName: 'new',
//     private: true,
//     users: {
//       userName: 'saket1',
//     },
//   }, (error) => {
//     if (error) {
//       console.log(error, 'There is error while saving data into firebase...');
//     } else {
//       console.log('channel created successfully...');
//     }
//   });
// }


// document.getElementById('createChannel').addEventListener('click', fnCreateChannel);
=======
function fnCreateChannel() {
  const channelref = database.ref(`channels/${12345678}`).set({
    channelName: 'new',
    private: true,
    users: {
      userName: 'saket1',
    },
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('channel created successfully...');
    }
  });
}


document.getElementById('createChannel').addEventListener('click', fnCreateChannel);
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742

//= ============================================================================
function fnAddMember() {
  const memberRef = database.ref(`users/${12345}`).set({
    status: 'active',
    userName: 'sachin',
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

document.getElementById('addmember').addEventListener('click', fnAddMember);

//= ========================================================================
// functionality for updating something in firebase via
<<<<<<< HEAD
function muteContact() {
  const newPostKey = firebase.database().ref(`/channels/${1234567}`).update({
    private: 'nothing',
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

document.getElementById('muteContact').addEventListener('click', muteContact);
//= =============================================================================
function unMuteContact() {
=======
function muteChannel() {
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742
  const newPostKey = firebase.database().ref(`/channels/${1234567}`).update({
    private: 'nothing',
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

<<<<<<< HEAD
document.getElementById('muteContact').addEventListener('click', unMuteContact);

//= =============================================================================
function deleteContact() {
  const deleteChannelRef = firebase.database().ref(`/channels/${123}`).remove();
}

document.getElementById('deleteContact').addEventListener('click', deleteContact);


export {
  fnAddMember, muteContact, deleteContact, unMuteContact, database, getAllContacts,
=======
document.getElementById('muteChannel').addEventListener('click', muteChannel);

//= =============================================================================
function deleteChannel() {
  const deleteChannelRef = firebase.database().ref(`/channels/${1234567}`).remove();
}

document.getElementById('deleteChannel').addEventListener('click', deleteChannel);


export {
  fnCreateChannel, fnAddMember, muteChannel, deleteChannel,
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742
};
