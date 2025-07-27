import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider }
    from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBuLVV_Aae-wCudAGPEbPF6yOhlQA3u9Ec",

    authDomain: "radiant-clothing-db-v1.firebaseapp.com",

    projectId: "radiant-clothing-db-v1",

    storageBucket: "radiant-clothing-db-v1.firebasestorage.app",

    messagingSenderId: "1011019959980",

    appId: "1:1011019959980:web:69922ad4fe9a8e6fe1d909",

    measurementId: "G-WC6MGCEHE5"

};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};