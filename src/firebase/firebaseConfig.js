import { initializeApp } from "firebase/app";
import {GoogleAuthProvider} from 'firebase/auth'
import { FacebookAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcd4Dtl6YzQRB3-RnL1cWWso_8hSlYcCY",
  authDomain: "as-5672a.firebaseapp.com",
  projectId: "as-5672a",
  storageBucket: "as-5672a.appspot.com",
  messagingSenderId: "516981643484",
  appId: "1:516981643484:web:c7e8f3fa21478e705cbc19"
};

const app = initializeApp(firebaseConfig);
const google  = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const db = getFirestore();

export {
    app,
    google,
    facebook,
    db
}
