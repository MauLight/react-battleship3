import React, { useState, useEffect } from "react";
import AIshipsArray from "./optionships";

export const Board = (props) => {

    const gameBoard = new Array(100);
    for (let i = 0; i < gameBoard.length; i++) {
        //console.log(i);
        gameBoard[i] = 0;
    }

    const [board, setBoard] = useState(gameBoard);
    const [enemyBoard, setEnemyBoard] = useState(gameBoard);
    const [shipLength, setShipLength] = useState('');
    const [angle, setAngle] = useState(0);
    const [isHorizontal, setIsHorizontal] = useState(true);

    //console.log(gameBoard[0]);


    const OptionShips = () => {


        const angleStyle = {
            "transform": `rotate(${angle}deg)`
        }

        const flipShip = () => {

            if (angle === 0) {
                setAngle(90);
                setIsHorizontal(!isHorizontal);
            }
            else {
                setAngle(0);
                setIsHorizontal(!isHorizontal);
            }
            console.log(isHorizontal);
        };


        const handleDragStart = (e) => {
            setShipLength(parseInt(e.target.id));
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

    const handleStart = () => {

        console.log("START!");
        const aiBoard = enemyBoard.map(elem => elem);

        for (let i = 0; i < AIshipsArray.length; i++) {
            if (AIshipsArray[i].isHorizontal && AIshipsArray[i].randomPos > 95 ) {

                let aux = 95

                for (let r = 0; r < AIshipsArray[i].length; r++) {

                    aiBoard[aux + r] = 2

                }
            }

            else if (AIshipsArray[i].isHorizontal) {
                for (let r = 0; r < AIshipsArray[i].length; r++) {

                    aiBoard[AIshipsArray[i].randomPos + r] = 2

                }
            }

            else if (!AIshipsArray[i].isHorizontal && AIshipsArray[i].randomPos > 50) {

                let aux = AIshipsArray[i].randomPos - 50;
                for (let a = 0; a < AIshipsArray[i].length; a++) {

                    aiBoard[aux] = 2
                    aiBoard[aux + a * 10] = 2
                }
            }
            else {
                for (let a = 0; a < AIshipsArray[i].length; a++) {

                    aiBoard[AIshipsArray[i].randomPos] = 2
                    aiBoard[AIshipsArray[i].randomPos + a * 10] = 2
                }
            }

        }

        console.log(aiBoard);
        setEnemyBoard(aiBoard);

    };




    const handleClick = (elem, i, boardUser) => {

        console.log(i); // 0 to 99

        const playerBoard = enemyBoard.map((val, index) => { //val = 0 or 1

            if (i === index && elem === 0) {

                return 1;
            }
            else {
                return val;
            }

        });

        setEnemyBoard(playerBoard);

    }

    const handleDragOver = (e) => {
        e.preventDefault();
        // console.log("Hey!");
    }
    const handleOnDrop = (e) => {

        const shipBoard = board.map(elem => elem);

        e.preventDefault();
        const startPosition = parseInt(e.target.id); //position of dropped place
        console.log(startPosition);
        console.log(typeof shipLength);

        if (isHorizontal) {
            for (let i = 0; i < shipLength; i++) {

                shipBoard[startPosition + i] = 2

            }
        }
        else {
            for (let i = 0; i < shipLength; i++) {

                shipBoard[startPosition] = 2
                shipBoard[startPosition + i * 10] = 2
            }
        }




        console.log(shipBoard);

        setBoard(shipBoard);

    }

    return (
        <div className={`${props.player} gameboard allBoards`}>
            <div className="human-board">
                {
                    board.map((elem, index) => {

                        if (elem === 0) {
                            //console.log(elem)
                            return (
                                <div
                                    className="btn game-block-empty border p-0"
                                    key={index}
                                    id={index}

                                    onDragOver={handleDragOver}
                                    onDrop={handleOnDrop}
                                ></div>
                            )
                        }

                        else if (elem === 1) {
                            return (
                                <div className="btn game-block-taken border p-0" key={index} id={index} ></div>
                            )
                        }
                        else if (elem === 2) {
                            return (
                                <div className="btn game-block-submarine border p-0" key={index} id={index} ></div>
                            )
                        }
                    })
                }
                {

                    props.player === 'human' ? <OptionShips /> : null
                }
            </div>
            <div className="AI-board">
                {
                    enemyBoard.map((elem, index) => {

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
                                <div className="btn game-block-submarine border p-0" key={index} id={index} ></div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}