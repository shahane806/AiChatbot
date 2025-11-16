// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as fb from "firebase/auth";
import { action } from "../State";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
let app, auth;
try {
   app = initializeApp(firebaseConfig);
 auth = fb.getAuth(app);
} catch (error) {
  console.log(error)
}

export const firebase = {
  app,
  fb,
  auth,
};

export const GoogleSignInWithPopUp = async (dispatch) => {
 try{
  await firebase.fb
  .signInWithPopup(firebase.auth, new firebase.fb.GoogleAuthProvider())
  .then((res) => {
    alert("Welcome " + res?.user?.displayName);
    console.log(res)
    localStorage.setItem("firebase-access-token",res?.user?.accessToken)
    localStorage.setItem("firebase-user-info",JSON.stringify(res));
    action.firebase_signin_user(JSON.parse(localStorage.getItem("firebase-user-info")), dispatch);
  });
 }catch(e){
  console.log(e);
 }

};
export const GoogleSignout = async (dispatch) => {
 try {
  await firebase.fb
  .getAuth(firebase.app)
  .signOut()
  .then(() => {
    alert("Signout Successfully");

    action.firebase_signout_user(dispatch);
    localStorage.clear();
  }); 
 } catch (error) {
  console.log(error)
 }
};

