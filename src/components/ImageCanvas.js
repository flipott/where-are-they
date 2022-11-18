import React, { useEffect } from "react";
import "../css/ImageCanvas.css";
import OptionDropdown from "./OptionDropdown";

export default function ImageCanvas() {

    const [active, setActive] = React.useState(false);
    const [positionEvent, setPositionEvent] = React.useState(null);
    const [canvas, setCanvas] = React.useState(null);
    const names = ["George Harrison", "Gene Simmons", "Otis Redding", "Ringo Starr", "Amy Winehouse"];

    useEffect(() => {
        const imgCanvas = document.getElementById('img-canvas');
        const context = imgCanvas.getContext("2d");
        const img = new Image();
        img.src = require('../images/main.jpg');
        imgCanvas.width = 588 * devicePixelRatio;
        imgCanvas.height = 700 * devicePixelRatio;
        imgCanvas.style.width = (imgCanvas.width / devicePixelRatio).toString() + "px";
        imgCanvas.style.height = (imgCanvas.height / devicePixelRatio).toString() + "px";

        const blankCanvas = document.getElementById('blank-canvas');
        blankCanvas.width = 588 * devicePixelRatio;
        blankCanvas.height = 700 * devicePixelRatio;
        blankCanvas.style.width = (blankCanvas.width / devicePixelRatio).toString() + "px";
        blankCanvas.style.height = (blankCanvas.height / devicePixelRatio).toString() + "px";

        img.onload = () => context.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height);
      }, []);

    function handleClick(e) {
        setPositionEvent(e);
        setCanvas(e.target);
        const currentCanvas = e.target;
        const position = getMousePosition(currentCanvas, e);
        drawCircle(position, currentCanvas);
    }

    function optionSelect(name) {
      drawCircle(positionEvent, canvas);
      setActive(false);
      console.log(name);
    }

    function drawCircle(position, canvas) {
        const context = canvas.getContext("2d");

        if (!active) {
            const posX = position.x * devicePixelRatio;
            const posY = position.y * devicePixelRatio;
            context.strokeStyle = "#E9184C";
            context.lineWidth = 12;
            context.beginPath();
            context.arc(posX, posY, 30, 0, 2*Math.PI);
            context.stroke();
            setActive(true);
      } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
            setActive(false);
      }
    }
    
    function getMousePosition(canvas, e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    return (
        <>
            {active && <OptionDropdown names={names} optionSelect={optionSelect} positionEvent={positionEvent}/>}
            <canvas id="blank-canvas" onClick={(e) => handleClick(e)} style={{position: "absolute"}} />
            <canvas id="img-canvas" />
        </>
    )
}