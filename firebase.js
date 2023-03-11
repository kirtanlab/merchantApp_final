// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqCc7aF0EUu8dI5Lw_rajR3n_W970s0d4',
  authDomain: 'predictcrypto-fb857.firebaseapp.com',
  projectId: 'predictcrypto-fb857',
  storageBucket: 'predictcrypto-fb857.appspot.com',
  messagingSenderId: '822164190555',
  appId: '1:822164190555:web:6fa498c0507799009e967e',
  measurementId: 'G-2N4NPCQG37',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, {
  ignoreUndefinedProperties: true,
});

//Initialize database
export const db = getDatabase(app);
export const auth = getAuth(app);
//649965817815-u2vhttoj9ri63h759cm8j94ktg9t0qvc.apps.googleusercontent.com
