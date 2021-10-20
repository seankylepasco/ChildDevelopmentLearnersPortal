import '@firebase/firestore';
import firebase from 'firebase/app';
import ApiKeys from './app/constants/ApiKeys';
require('firebase/auth');
require('firebase/database');

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(ApiKeys.firebaseConfig);
}
else {
    app = firebase.app()
}
const auth = firebase.auth()
export { auth }