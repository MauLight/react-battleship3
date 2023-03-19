import React, { useState, useEffect } from "react";

export const OptionShips = () => {
    const [angle, setAngle] = useState(0);

    const angleStyle = {
        "transform": `rotate(${angle}deg)`
    }

    const flipShip = () => {
        if (angle === 0) {
            setAngle(90);
        }
        else {
            setAngle(0);
        }
    };

    const handleStart = () => {
        console.log("START!");
    };

    const handleDragStart = (e) => {
        //e.preventDefault();
        console.log(e.target.id);
    }

    console.log(angle);

    const shipsArr = [
        <div id="2" key="1" className="rounded-pill angle destroyer-preview destroyer" draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
        <div id="3" key="2" className="rounded-pill angle submarine-preview submarine" draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
        <div id="3" key="3" className="rounded-pill angle cruiser-preview cruiser" draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
        <div id="4" key="4" className="rounded-pill angle battleship-preview battleship" draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
        <div id="5" key="5" className="rounded-pill angle carrier-preview carrier" draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>
    ]

    return (
        <div className="option-container mt-3 pt-4">
            {
                shipsArr.map((ship) => {
                    return ship;
                })
            }
            <button className="btn option-btn" onClick={flipShip}>Flip</button>
            <button className="btn option-btn" onClick={handleStart}>Start</button>
        </div>
    )
};