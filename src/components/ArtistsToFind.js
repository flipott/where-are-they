import React from "react";
import "../css/ArtistsToFind.css";

export default function ArtistsToFind() {
    return (
        <div className="artists-to-find">
            <h2>Artists to Find</h2>
            <div className="item-section">
                <div className="artist-item">
                    <img src={require('../images/bjork.png')} />
                    <p>George Harrison</p>
                    <div className="find-status">Not Found</div>
                </div>
                <div className="artist-item">
                    <img src={require('../images/bjork.png')} />
                    <p>Bjork</p>
                    <div className="find-status">Not Found</div>
                </div>
                <div className="artist-item">
                    <img src={require('../images/bjork.png')} />
                    <p>Bjork</p>
                    <div className="find-status">Not Found</div>
                </div>
                <div className="artist-item">
                    <img src={require('../images/bjork.png')} />
                    <p>Bjork</p>
                    <div className="find-status">Not Found</div>
                </div>
                <div className="artist-item">
                    <img src={require('../images/bjork.png')} />
                    <p>Johnny B Goode</p>
                    <div className="find-status">Not Found</div>
                </div>
            </div>
        </div>
    )
}