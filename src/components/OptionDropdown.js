import React from "react";
import "../css/OptionDropdown.css";

export default function OptionDropdown(props) {
    const { names, positionEvent, optionSelect } = props;


    const nameItems = names.map(name =>
         <button value={name.artistName} disabled={name.found} key={name.artistName} onClick={() => optionSelect(name.artistName)} className="dropdown-btn">{name.artistName}</button>)
    return (
        <div className="option-dropdown" style={{left: (positionEvent.pageX - 23 + "px"), top: (positionEvent.pageY + 18 + "px") }}>
            {nameItems}
        </div>
    )
}