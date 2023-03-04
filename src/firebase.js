import { initializeApp } from '../node_modules/firebase/app';
import { getFirestore, collection, getDocs } from "../node_modules/firebase/firestore";
import { getStorage } from "../node_modules/firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBqfJ3EgBNgR0r8FLMXw1EFvIn27hlqi3w",
    authDomain: "where-are-they-f68d6.firebaseapp.com",
    projectId: "where-are-they-f68d6",
    storageBucket: "where-are-they-f68d6.appspot.com",
    messagingSenderId: "375232749101",
    appId: "1:375232749101:web:1b28755795b513de57a2a4",
    measurementId: "G-P286PZ7442",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }