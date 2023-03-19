import React, { useState, useEffect } from "react";
//import { OptionShips } from "./optionships";

export const Board = (props) => {

    const gameBoard = new Array(100);
    for (let i = 0; i < gameBoard.length; i++) {
        //console.log(i);
        gameBoard[i] = 0;
    }

    const [board, setBoard] = useState(gameBoard);

    //console.log(gameBoard[0]);


    const OptionShips = () => {
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



    const handleClick = (elem, i, boardUser) => {

        console.log(i); // 0 to 99

        const playerBoard = board.map((val, index) => { //val = 0 or 1

            if (i === index && elem === 0 && boardUser === "AI") {

                return 1;
            }
            else {
                return val;
            }

        });

        setBoard(playerBoard);

    }

    const handleDragOver = (e) => {
        e.preventDefault();
        // console.log("Hey!");
    }
    const handleOnDrop = (e) => {
        e.preventDefault();
        const startPosition = e.target.id;


        const playerBoard = board.map((val, index) => { //val = 0 or 1
            console.log(index);
            console.log(startPosition);
            if (startPosition === index) {
                //console.log("HEY MAN!");
                return "HEY MAN!";
            }
            else {
                return val;
            }




        });
        console.log(playerBoard);

        //setBoard(playerBoard);

    }

    return (
        <div className={`${props.player} gameboard`}>
            {
                board.map((elem, index) => {

                    if (elem === 0) {
                        //console.log(elem)
                        return (
                            <div
                                className="btn game-block-empty border p-0"
                                key={index}
                                id={index}
                                onClick={() => { handleClick(elem, index, props.player) }}
                                onDragOver={handleDragOver}
                                onDrop={handleOnDrop}
                            ></div>
                        )
                    }
                    else if (elem === 1) {
                        return (
                            <div className="btn game-block-taken border p-0" key={index} id={index} onClick={() => { handleClick(index) }}></div>
                        )
                    }
                    else if (elem === 2) {
                        return (
                            <div className="btn game-block-submarine border p-0" key={index} id={index} onClick={() => { handleClick(index) }}></div>
                        )
                    }

                })
            }
            {

                props.player === 'human' ? <OptionShips /> : null
            }
        </div>
    )
}