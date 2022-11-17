import React, { useEffect } from "react";
import "../css/ImageCanvas.css";

export default function ImageCanvas() {

    const [active, setActive] = React.useState(false);

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
        const canvas = document.getElementById('blank-canvas');
        const position = getMousePosition(canvas, e);
        drawCircle(position, canvas);

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
            <canvas id="blank-canvas" onClick={(e) => handleClick(e)} style={{position: "absolute"}} />
            <canvas id="img-canvas" />
        </>
    )
}