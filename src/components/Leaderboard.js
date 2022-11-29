import React from "react";
import "../css/Leaderboard.css";

export default function Leaderboard(props) {


    return (
        <div className="leaderboard-modal">
            <div className="leaderboard">
                <button onClick={() => props.setDisplayLeaderboard(false)}>x</button>
                <h2>Leaderboard</h2>
                <table>
                    <tr>
                        <th>Place</th>
                        <th>Player</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <td>1.</td>
                        <td>Phil</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>Jerry</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>Antonio</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>Barrelous</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>Anrew</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>Karel</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>Amoun</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>8.</td>
                        <td>Barnem</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>9.</td>
                        <td>Gregory</td>
                        <td>00:02:03</td>
                    </tr>
                    <tr>
                        <td>10.</td>
                        <td>Kristi</td>
                        <td>00:02:03</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}