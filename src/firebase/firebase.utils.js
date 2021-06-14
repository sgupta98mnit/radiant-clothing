import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBRzmdhp_UdLTpxNaieq53E1a3D6hAzHi0",
    authDomain: "radiant-clothing-db.firebaseapp.com",
    projectId: "radiant-clothing-db",
    storageBucket: "radiant-clothing-db.appspot.com",
    messagingSenderId: "111176454087",
    appId: "1:111176454087:web:7f03adfe5558042309d3e2",
    measurementId: "G-HEDST9QB2P"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;