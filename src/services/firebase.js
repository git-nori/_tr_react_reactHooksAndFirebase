import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC60VrFnQYE9N94YCWXAFQ8NBoPq3aE3-8",
  authDomain: "chatty-6c49e.firebaseapp.com",
  databaseURL: "https://chatty-6c49e.firebaseio.com",
  projectId: "chatty-6c49e",
  storageBucket: "chatty-6c49e.appspot.com",
  messagingSenderId: "67193945759",
  appId: "1:67193945759:web:5f7d45eae5bfacba8dacaa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()