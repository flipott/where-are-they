import React from "react";

export default function WinnerInfo(props) {
    const { finalTime, setWinner } = props;

    const [textVal, setTextVal] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    function handleSubmit() {
        if (!textVal) {
            return false;
        } else {
            //ADD TO LEADERBOARD!
            setSubmitted(true);
        }
    }
    
    return (
        <div className="winner">
            <p className="final-time">Success! Your final time was: <strong>{finalTime}</strong></p>
            <p className="name-entry">Enter your name below to be added to the leaderboard.</p>
            <div className="name-form">
                <input type="text" maxLength={12} value={textVal} onChange={(e) => setTextVal(e.target.value)} disabled={submitted} />
                <button onClick={handleSubmit} disabled={submitted}>Submit</button>
            </div>
            {submitted && <p className="submitted">Your score has been successfully added to the leaderboard.</p>}
            <button onClick={() => setWinner(false)}>Play Again</button>
        </div>
    )
}