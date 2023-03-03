import React, { useEffect } from "react";
import uuid from "react-uuid";
import "../css/ArtistsToFind.css";

export default function ArtistsToFind(props) {
    
    const { toFind, files } = props;



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
                    <div className="artist-item" key={uuid()} >
                        <img src={getImageIndex(artist.artistName)} />
                        <p>{artist.artistName}</p>
                        <div className={artist.found ? "found" : "not-found"}>{artist.found ? "Found" : "Not Found"}</div>
                    </div>
                )}
            </div>
        </div>
    )
}