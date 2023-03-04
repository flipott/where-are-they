import React from "react";
import "../css/WinnerInfo.css"
import { collection, addDoc } from "/node_modules/firebase/firestore";
import { db } from "../firebase";


export default function WinnerInfo(props) {
    const { finalTime, setWinner, setLeaderScores } = props;

    const [textVal, setTextVal] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!textVal) {
            return false;
        } else {
            await addDoc(collection(db, "leaderboard"), {
                player: textVal,
                time: finalTime
            });
            setSubmitted(true);
            setLeaderScores([]);
        }
    }
    
    return ( 
        <div className="winner">
            <p className="final-time">Success! Your final time was: <strong>{finalTime}</strong></p>
            <div className="name-option">
                <p className="name-entry">Enter your name below to be added to the leaderboard.</p>
                <form onSubmit={(e) => handleSubmit(e)} className="name-form">
                    <input type="text" required maxLength={12} value={textVal} onChange={(e) => setTextVal(e.target.value)} disabled={submitted} />
                    <button disabled={submitted}>Submit</button>
                </form>
                {submitted && <p className="submitted">Your score has been successfully added to the leaderboard.</p>}
            </div>
            <button onClick={() => setWinner(false)}>Play Again</button>
        </div>
    )
}