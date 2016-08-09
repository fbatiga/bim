import AppConfig from  './AppConfig';
import * as firebase from 'firebase';
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(AppConfig.firebase);
//export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
