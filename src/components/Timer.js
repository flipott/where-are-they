import React, { useEffect } from "react";
import "../css/Timer.css";

export default function Timer(props) {

    const [currentTime, setCurrentTime] = React.useState(0);

    useEffect(() => {
        props.setFinalTime(finalTime);
        let interval;
        interval = setInterval(() => {
            setCurrentTime((prevTime) => prevTime + 10);
        }, 10);

        return () => clearInterval(interval);
    }, [props.toFind])

    const mins = ("0" + Math.floor((currentTime / 60000) % 60)).slice(-2) + ":";
    const seconds = ("0" + Math.floor((currentTime / 1000) % 60)).slice(-2) + ":";
    const milliseconds = ("0" + ((currentTime / 10) % 100)).slice(-2);
    const finalTime = mins+seconds+milliseconds;

    return (
        <div className="timer">
            <div className="nums">
                <p>{mins}</p>
                <p>{seconds}</p>
                <p>{milliseconds}</p>
            </div>
        </div>
    );
}

