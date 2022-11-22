import { initializeApp } from '../node_modules/firebase/app';
import { getFirestore, collection, getDocs } from "../node_modules/firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "../node_modules/firebase/storage";

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

const getArtistImages = async () => {
    const artistImages = ref(storage, 'artist-photos/')
    listAll(artistImages)
        .then(async (res) => {
        const { items } = res;
        const urls = await Promise.all(items.map((item) => getDownloadURL(item)));
        return urls;
    })
    .catch((error) => {
        console.log(error);
    });
}




// async function getArtistImage(artistName) {
//     let test = '';
//     getDownloadURL(ref(storage, `artist-photos/${artistName}.png`))
//       .then((url) => {
//         test = url;
//       })
//       .catch((error) => {
//         console.log(error);
//       })
    
//     return test;
// }

export { db, storage }