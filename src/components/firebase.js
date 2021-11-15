import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCSOpN1c0hX0K9nNY-xTII_SzerMZIdYB8",
    authDomain: "foody-admin-web-18c0a.firebaseapp.com",
    projectId: "foody-admin-web-18c0a",
    storageBucket: "foody-admin-web-18c0a.appspot.com",
    messagingSenderId: "109381773496",
    appId: "1:109381773496:web:15867b7feffdf514716c4d",
    measurementId: "G-Z8VKGJLG3H"
  };
// Initialize Firebase
const fireDB = firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref()
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const TwitterProvider = new firebase.auth.TwitterAuthProvider();
const GithubProvider = new firebase.auth.GithubAuthProvider();
const storage = firebase.storage();


export {db , auth, storage};
// export  { googleProvider, facebookProvider, TwitterProvider,GithubProvider};
// export  {auth};
// export  {storage};
