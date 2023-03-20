import React, { useState, useEffect } from "react";
import AIshipsArray from "./optionships";

export const Board = (props) => {

    const gameBoard = new Array(100);
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = 0;
    }

    const [board, setBoard] = useState(gameBoard);
    const [enemyBoard, setEnemyBoard] = useState(gameBoard);
    const [player, setPlayer] = useState("");
    const [shipLength, setShipLength] = useState('');
    const [angle, setAngle] = useState(0);
    const [isHorizontal, setIsHorizontal] = useState(true);
    const [info, setInfo] = useState("REACT Battleship");
    const [shipCount, setShipCount] = useState(null);
    const [shipsNum, setShipsNum] = useState(0);
    const [winner, setWinner] = useState(false);

    const OptionShips = () => {

        const angleStyle = {
            "transform": `rotate(${angle}deg)`
        };

        const flipShip = () => {

            if (angle === 0) {
                setAngle(90);
                setIsHorizontal(!isHorizontal);
            }
            else {
                setAngle(0);
                setIsHorizontal(!isHorizontal);
            }
        };


        const handleDragStart = (e) => {
            if (shipsNum < 5) {
                console.log(e.target.id);
                setShipLength(parseInt(e.target.id));
            }
            else {
                return;
            }
        }

        const shipsArr = [
            <div id="2" key="1" className={`rounded-pill angle destroyer-preview destroyer`} draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
            <div id="3" key="2" className={`rounded-pill angle submarine-preview submarine`} draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
            <div id="4" key="3" className={`rounded-pill angle cruiser-preview cruiser`} draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
            <div id="5" key="4" className={`rounded-pill angle battleship-preview battleship`} draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>,
            <div id="6" key="5" className={`rounded-pill angle carrier-preview carrier`} draggable="true" style={angleStyle} onDragStart={handleDragStart} ></div>
        ]

        return (
            <div className="option-container mt-3 pt-4 rounded">
                {
                    shipsArr.map((ship) => {
                        return ship;
                    })
                }
                <button className="btn option-btn" onClick={flipShip}>Flip</button>
                <button className="btn option-btn" onClick={handleStart}>Start</button>
                {
                    shipsNum < 5 ? <p className="text mt-4">Drag your SHIPS to the BOARD and press START!</p> : null
                }
            </div>
        )
    };

    const handleStart = () => {

        if (shipsNum < 5) {
            setInfo("Place your SHIPS on the board!")
            return;
        }

        console.log("START!");

        if (winner) {
            setWinner(false);
        }

        setInfo("The BATTLE begins!")
        setTimeout(() => setInfo("ATTACK you ENEMY's board!"), 5000);

        const aiBoard = enemyBoard.map(elem => elem);

        for (let i = 0; i < AIshipsArray.length; i++) {
            if (AIshipsArray[i].isHorizontal && AIshipsArray[i].randomPos > 95) {

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
        //console.log(aiBoard);
        setEnemyBoard(aiBoard);

        let aux = 0; //Number of blocks used by the AI
        for (let ship of aiBoard) {

            if (ship === 2) {
                aux += 1;
            }
        }

        setShipCount(aux);
    };

    const AIPlay = (arr) => {

        if (!winner) {
            setPlayer("AI");

            const emptyBlocks = [];
            let newArr = arr.map(elem => elem);

            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i] !== 1 || newArr[i] !== 3) {
                    emptyBlocks.push(i);
                }
            };

            console.log(emptyBlocks);

            let randomNumber = Math.floor(Math.random() * emptyBlocks.length);
            console.log(randomNumber);
            console.log(emptyBlocks[randomNumber]);

            if (newArr[emptyBlocks[randomNumber]] === 2) {
                newArr[emptyBlocks[randomNumber]] = 3;
                setInfo("AI hit one of your SHIPS!");
            }
            else if (newArr[emptyBlocks[randomNumber]] === 0) {
                newArr[emptyBlocks[randomNumber]] = 1;
                setInfo("AI missed!")
            }

            setBoard(newArr);
            setTimeout(() => setInfo("ATTACK you ENEMY's board!"), 5000);
            console.log(newArr);
        }

    };

    const handleClick = (elem, i, boardUser) => {

        const playerBoard = enemyBoard.map((val, index) => { //val = 0 or 1

            if (i === index && elem === 0) {
                setInfo("You MISSED!")
                return 1;
            }
            else if (i === index && elem === 2) {
                setInfo("You HIT an AI ship!")
                return 3;
            }
            else {
                return val;
            }

        });
        //console.log(playerBoard);
        setEnemyBoard(playerBoard);

        if (!winner) {
            setTimeout(() => setInfo("AI IS THINKING..."), 1000);
            setTimeout(() => AIPlay(board), 3000);
            setTimeout(() => setInfo("YOUR TURN"), 4500);
        }
        else {
            return;
        }

    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleOnDrop = (e) => {

        console.log(shipsNum);
        setShipsNum(shipsNum + 1);

        if (shipsNum < 5) {
            const shipBoard = board.map(elem => elem);

            e.preventDefault();
            const startPosition = parseInt(e.target.id); //position of dropped place

            if (isHorizontal && startPosition > 95) {

                let aux = 95

                for (let i = 0; i < shipLength; i++) {

                    shipBoard[aux + i] = 2
                }
            }
            else if (isHorizontal) {
                for (let i = 0; i < shipLength; i++) {

                    shipBoard[startPosition + i] = 2

                }
            }
            else if (!isHorizontal && startPosition > 50) {

                let aux = startPosition - 50;
                for (let a = 0; a < shipLength; a++) {

                    shipBoard[aux] = 2
                    shipBoard[aux + a * 10] = 2
                }
            }
            else {
                for (let i = 0; i < shipLength; i++) {

                    shipBoard[startPosition] = 2
                    shipBoard[startPosition + i * 10] = 2
                }
            }

            setBoard(shipBoard);
        }
    };



    useEffect(() => {
        setTimeout(() => setInfo("REACT Battleship"), 2000);
    }, [board, enemyBoard]);

    useEffect(() => {
        let hits = 0
        for (let hit of enemyBoard) {
            if (hit === 3) {
                hits += 1
            }
        }

        if (hits === shipCount) { //If number of HITS equals number of Blocks used by AI, player wins
            setInfo("YOU WIN!");
            setEnemyBoard(gameBoard);
            setBoard(gameBoard);
            setWinner(true);
        }
    }, [board, enemyBoard]);

    return (
        <div className="container">
            <div className="title my-3">
                <h1>{info}</h1>
                <div className="board-users d-flex justify-content-between w-50 mx-auto">
                <h4>Your Board</h4>
                <h4>AI Board</h4>
                </div>
            </div>

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
                                    <div className="btn game-block-miss border p-0" key={index} id={index} ></div>
                                )
                            }
                            else if (elem === 2) {
                                return (
                                    <div className="btn game-block-submarine border p-0" key={index} id={index} ></div>
                                )
                            }
                            else if (elem === 3) {
                                return (
                                    <div className="btn game-block-hit border p-0" key={index} id={index} ></div>
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
                                    <div className="btn game-block-miss border p-0" key={index} id={index}></div>
                                )
                            }
                            else if (elem === 2) {
                                return (
                                    <div className="btn game-block-submarine border p-0" key={index} id={index} onClick={() => { handleClick(elem, index, props.player) }} ></div>
                                )
                            }
                            else if (elem === 3) {
                                return (
                                    <div className="btn game-block-hit border p-0" key={index} id={index} ></div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>

    )
}