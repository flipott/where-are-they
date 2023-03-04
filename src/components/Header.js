import React from "react";
import "../css/Header.css";

export default function Header(props) {
    return (
    <div className="header">
        <div>
            <h1>Where Are They?</h1>
            <div className="description-leaderboard">
            <button onClick={() => props.setDisplayLeaderboard(true)}>Leaderboard</button>
            </div>
        </div>
    </div>
    )
}