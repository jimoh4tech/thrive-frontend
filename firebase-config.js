import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAkE4YZ6D39aRZFAjZ8TPp0hXQgMSz8m3c',
  authDomain: 'icss-thrive.firebaseapp.com',
  projectId: 'icss-thrive',
  storageBucket: 'icss-thrive.appspot.com',
  messagingSenderId: '1046080775497',
  appId: '1:1046080775497:web:d1238ae912b74ab1d12698',
  measurementId: 'G-Z7PDLLYDRE',
};

// Initialize Firebase
if (getApps().length === 0) initializeApp(firebaseConfig);
export const storage = getStorage();
export const firestore = getFirestore();
