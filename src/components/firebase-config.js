// Import the functions you need from the SDKs you need'
import firebase from "firebase/compat/app"
//import { initializeApp } from "@firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
//import firebase from 'firebase'
//import { getAuth } from "firebase/auth"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7jl5cov3jgemjvBtvxVkLxKEAYUo9Lac",
  authDomain: "reactapplication-8571e.firebaseapp.com",
  projectId: "reactapplication-8571e",
  storageBucket: "reactapplication-8571e.appspot.com",
  messagingSenderId: "190887744378",
  appId: "1:190887744378:web:fbda8b99c6dc118f6f3cc3",
  measurementId: "G-PQM3PDJFKQ"
};

// Initialize Firebase
//export const db = initializeApp(firebaseConfig);
//const auth=getAuth(app)
//export {auth}
//const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
const auth =firebase.auth();
const storage=firebase.storage();
const db = firebase.firestore();


export {auth,db,storage};


// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Use these for db & auth
// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export { auth, db };