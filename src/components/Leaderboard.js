import React from "react";
import "../css/Leaderboard.css";

export default function Leaderboard(props) {

    const rows = props.leaderScores.map((obj, ind) => {
        return (
            <tr>
                <td>{ind+1}</td>
                <td>{obj.player}</td>
                <td>{obj.time}</td>
            </tr>
            )
    })
    
    return (
        <div className="leaderboard-modal">
            <div className="leaderboard">
                <button onClick={() => props.setDisplayLeaderboard(false)}>x</button>
                <h2>Leaderboard</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Place</th>
                            <th>Player</th>
                            <th>Time</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}