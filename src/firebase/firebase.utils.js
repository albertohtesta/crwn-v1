import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC1VaZygFgXIsG48-tKNzeIHTXZmdaEzeU",
  authDomain: "ecom-db-72a2b.firebaseapp.com",
  databaseURL: "https://ecom-db-72a2b.firebaseio.com",
  projectId: "ecom-db-72a2b",
  storageBucket: "ecom-db-72a2b.appspot.com",
  messagingSenderId: "483906404401",
  appId: "1:483906404401:web:fad2e4eea21c80007e9510"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
