import React, { useEffect } from "react";
import "../css/ImageCanvas.css";
import OptionDropdown from "./OptionDropdown";

export default function ImageCanvas(props) {

    const [active, setActive] = React.useState(false);
    const [positionEvent, setPositionEvent] = React.useState(null);
    const [canvas, setCanvas] = React.useState(null);
    const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
    const [ratio, setRatio] = React.useState("large");

    useEffect(() => {
      if (innerWidth >= 1000) {
        setRatio("large");
      } else if (innerWidth < 1000 && innerWidth >= 600 ) {
        setRatio("medium");
      } else {
        setRatio("small")
      }
    }, [innerWidth]);
    
    useEffect(() => {
      function handleResize() {
        setInnerWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    useEffect(() => {
        const imgCanvas = document.getElementById('img-canvas');
        const context = imgCanvas.getContext("2d");
        const img = new Image();

        if (ratio === "small") {
          imgCanvas.width = 294 * devicePixelRatio;
          imgCanvas.height = 350 * devicePixelRatio;
        } else if (ratio === "medium") {
          imgCanvas.width = 412 * devicePixelRatio;
          imgCanvas.height = 490 * devicePixelRatio;
        } else {
          imgCanvas.width = 588 * devicePixelRatio;
          imgCanvas.height = 700 * devicePixelRatio;  
        }

        img.src = require('../images/main.jpg');
        imgCanvas.style.width = (imgCanvas.width / devicePixelRatio).toString() + "px";
        imgCanvas.style.height = (imgCanvas.height / devicePixelRatio).toString() + "px";

        const blankCanvas = document.getElementById('blank-canvas');
        if (ratio === "small") {
          blankCanvas.width = 294 * devicePixelRatio;
          blankCanvas.height = 350 * devicePixelRatio;  
        } else if (ratio === "medium") {
          blankCanvas.width = 412 * devicePixelRatio;
          blankCanvas.height = 490 * devicePixelRatio;
        } else {
          blankCanvas.width = 588 * devicePixelRatio;
          blankCanvas.height = 700 * devicePixelRatio;  
        }
        blankCanvas.style.width = (blankCanvas.width / devicePixelRatio).toString() + "px";
        blankCanvas.style.height = (blankCanvas.height / devicePixelRatio).toString() + "px";

        img.onload = () => context.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height);
      },[ratio]);

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
      const coords = getMousePosition(canvas, positionEvent);
      let coordArr = [parseInt(coords.x), parseInt(coords.y)];
      // console.log(coordArr);
      console.log([parseInt(coordArr[0] * 2), parseInt(coordArr[1] * 2)]);
      if (ratio === "small") {
        props.checkSelection(name, [parseInt(coordArr[0] * 2), parseInt(coordArr[1] * 2)])
      } else if (ratio === "medium") {
        props.checkSelection(name, [parseInt(coordArr[0] * 1.7), parseInt(coordArr[1] * 1.7)] );
      } else {
        props.checkSelection(name, coordArr);
      }
    }

    function drawCircle(position, canvas) {
        const context = canvas.getContext("2d");

        if (!active && props.gameStatus) {
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
            {active && props.toFind &&  <OptionDropdown names={props.toFind} optionSelect={optionSelect} positionEvent={positionEvent}/>}
            <canvas id="blank-canvas" onClick={(e) => handleClick(e)} style={{position: "absolute"}} />
            <canvas id="img-canvas" />
        </>
    )
}