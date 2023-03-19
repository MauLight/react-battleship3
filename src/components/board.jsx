import React, { useState, useEffect } from "react";

export const Board = () => {

    const [player, setPlayer] = useState("human");
    const gameBoard = new Array(100);
    for(let i = 0; i < gameBoard.length; i++) {
        console.log(i);
        gameBoard[i] = 0;
    }

    console.log(gameBoard[0]);

    return (
        <div className= {`${player} gameboard`}>
            {
                gameBoard.map((elem, index) => {
                    return (
                        <div className="game-block" key={index} id={index}></div>
                    )
                } )
            }
        </div>
    )
}