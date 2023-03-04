import React from "react";
import "../css/OptionDropdown.css";

export default function OptionDropdown(props) {
    const { names, positionEvent, optionSelect, ratio, canvasCoords } = props;
    let positioning = "below"
    
    switch(ratio) {
        case "large":
            canvasCoords.y >= 500 ? positioning = "above" : positioning = "below";
            if (canvasCoords.x >= 500) {positioning += "left"};
            if (canvasCoords.x <= 100) {positioning += "right"};
            break;
        case "medium":
            canvasCoords.y >= 375 ? positioning = "above" : positioning = "below";
            if (canvasCoords.x >= 345) {positioning += "left"};
            if (canvasCoords.x <= 60) {positioning += "right"};
            break;
        case "small":
            canvasCoords.y >= 220 ? positioning = "above" : positioning = "below";
            if (canvasCoords.x >= 240) {positioning += "left"};
            if (canvasCoords.x <= 35) {positioning += "right"};
            break;
    }

    const renderSwitch = (positioning, nameItems) => {
        switch(positioning) {
            case "below":
                return (
                    <div className="option-dropdown" style={{left: (positionEvent.pageX - 23 + "px"), top: (positionEvent.pageY + 18 + "px") }}>
                        {nameItems}
                    </div>
                );
            case "above":
                return (
                    <div className="option-dropdown" style={{left: (positionEvent.pageX - 23 + "px"), top: (positionEvent.pageY - 190 + "px") }}>
                        {nameItems}
                    </div>
                );
            case "belowleft":
                return (
                    <div className="option-dropdown" style={{left: (positionEvent.pageX - 100 + "px"), top: (positionEvent.pageY + 18 + "px") }}>
                        {nameItems}
                    </div>
                );  
            case "aboveleft":
                return (
                    <div className="option-dropdown" style={{left: (positionEvent.pageX - 100 + "px"), top: (positionEvent.pageY - 190 + "px") }}>
                        {nameItems}
                    </div>
                );  
            case "belowright":
                return (
                    <div className="option-dropdown" style={{left: (positionEvent.pageX + 50 + "px"), top: (positionEvent.pageY + 18 + "px") }}>
                        {nameItems}
                    </div>
                );  
            case "aboveright":
                return (
                    <div className="option-dropdown" style={{left: (positionEvent.pageX + 60 + "px"), top: (positionEvent.pageY - 190 + "px") }}>
                        {nameItems}
                    </div>
                );  
        }
    }

    const nameItems = names.map(name =>
         <button value={name.artistName} disabled={name.found} key={name.artistName} onClick={() => optionSelect(name.artistName)} className="dropdown-btn">{name.artistName}</button>)
    return (
        <div>
            {renderSwitch(positioning, nameItems)}
        </div>
        )
}