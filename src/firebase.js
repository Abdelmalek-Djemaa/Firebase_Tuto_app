import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCA-ZCjVLBk9U3jmWt7A8RASeF9FlHATpY",
    authDomain: "fir-tuto-92d8d.firebaseapp.com",
    projectId: "fir-tuto-92d8d",
    storageBucket: "fir-tuto-92d8d.firebasestorage.app",
    messagingSenderId: "91618419898",
    appId: "1:91618419898:web:9d068e0ef69b22a6ca8e83",
    measurementId: "G-XBKWP25Z3B"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
