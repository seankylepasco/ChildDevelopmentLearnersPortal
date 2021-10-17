import firebase from 'firebase/app';

require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyDZazYjdDSUL6mJurtLxPQO3wCR3DUZ6kE",
  authDomain: "childdevelopmentlearnersportal.firebaseapp.com",
  databaseURL: "https://childdevelopmentlearnersportal-default-rtdb.firebaseio.com",
  projectId: "childdevelopmentlearnersportal",
  storageBucket: "childdevelopmentlearnersportal.appspot.com",
  messagingSenderId: "777723232586",
  appId: "1:777723232586:web:2437c902fc17bf0b9501b3",
  measurementId: "G-LR10CEFTF0"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app()
}
const auth = firebase.auth()
export { auth }