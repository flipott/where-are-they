import React, { useEffect } from "react";
import "../css/ArtistsToFind.css";
import { storage } from "../firebase";
import { getStorage, ref, getDownloadURL, listAll } from "/node_modules/firebase/storage";


const testArtist = ["Bjork"]

export default function ArtistsToFind(props) {
    
    const [files, setFiles] = React.useState('');
    const { toFind } = props;
    useEffect(() => {
        console.log(files);
        let urlTest;
        const getArtistImages = async () => {
            const artistImages = ref(storage, 'artist-photos/')
            listAll(artistImages)
                .then(async (res) => {
                const { items } = res;
                const urls = await Promise.all(items.map((item) => getDownloadURL(item)));
                urlTest = urls;
                setFiles(urls);
            })
            .catch((error) => {
                console.log(error);
            });
        }

        getArtistImages();
    }, [])

    const items = toFind.map((artist) => 
        <div className="artist-item">
            <img src={require('../images/bjork.png')} />
            <p>{artist}</p>
            <div className="find-status">Not Found</div>
        </div>
    )

    // const items = toFind.map((name) => <h1>{name}</h1>)



    return (
        <div className="artists-to-find">
            <h2>Artists to Find</h2>
            <div className="item-section">
                {items}
            </div>
        </div>
    )
}

// async function checkSelection(artistName, point) {
//     console.log(`Artist: ${artistName} Coords: ${point}`)
//     let currentArray = null;

//     const docRef = doc(db, "artists", artistName);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       currentArray = docSnap.data().coords;
//       console.log(docSnap.data().image);
//     } else {
//       console.error("Document does not exist.");
//     }

//     const parseArr = JSON.parse(currentArray);

//     if (inside(point, parseArr)) {
//       console.log("YES!");
//     } else {
//       console.log("NO!");
//     }

//   }