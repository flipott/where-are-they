import React, { useEffect } from "react";
import "../css/ArtistsToFind.css";
import { storage } from "../firebase";
import { getStorage, ref, getDownloadURL, listAll } from "/node_modules/firebase/storage";

export default function ArtistsToFind(props) {
    
    const [files, setFiles] = React.useState('');
    const { toFind } = props;
    useEffect(() => {
        const getArtistImages = async () => {
            const artistImages = ref(storage, 'artist-photos/')
            listAll(artistImages)
                .then(async (res) => {
                const { items } = res;
                const urls = await Promise.all(items.map((item) => getDownloadURL(item)));
                const names = await Promise.all(items.map((item) => item._location.path_.slice(14, -4)));
                let completeArr = [];

                for (let i = 0; i < names.length; i++) {
                    const newObj = {
                        artistName: names[i],
                        imgUrl: urls[i]
                    }
                    completeArr.push(newObj);
                }
                setFiles(completeArr);
            })
            .catch((error) => {
                console.log(error);
            });
        }

        getArtistImages();
    }, [])


    function getImageIndex(artist) {
        const artistName = artist.split(" ").join("").toLowerCase();
        for (let i = 0; i < files.length; i++) {
            if (files[i].artistName === artistName) {
                return files[i].imgUrl;
            }
        }
    }

    return (
        <div className="artists-to-find">
            <h2>Artists to Find</h2>
            <div className="item-section">
                {files && 
                toFind.map((artist) => 
                    <div className="artist-item" key={artist}>
                        <img src={getImageIndex(artist.artistName)} />
                        <p>{artist.artistName}</p>
                        <div className={artist.found ? "found" : "not-found"}>{artist.found ? "Found" : "Not Found"}</div>
                    </div>
                )}
            </div>
        </div>
    )
}