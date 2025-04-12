import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyAp0BZhichngNqialAnKV-aDYIa5j1tg24",
  authDomain: "emotional-journal-2335f.firebaseapp.com",
  projectId: "emotional-journal-2335f",
  storageBucket: "emotional-journal-2335f.firebasestorage.app",
  messagingSenderId: "53821528177",
  appId: "1:53821528177:web:6fba304cc56955d04b63d0",
  measurementId: "G-D8DZG6SQ32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
