// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFBJowlyEj0QvbAHV-oAlRiNkD92pjq2A",
  authDomain: "venice-travel-guide-32c45.firebaseapp.com",
  projectId: "venice-travel-guide-32c45",
  storageBucket: "venice-travel-guide-32c45.firebasestorage.app",
  messagingSenderId: "352017031101",
  appId: "1:352017031101:web:daf495b25b889a54377cd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;