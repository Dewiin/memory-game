import "../styles/menu.css"
// import { useState } from "react";

export function Menu({ setDifficulty }) {
    const startGame = (difficulty) => {
        setDifficulty(difficulty);
    };

    return (
        <div className="menu">
            <h1>Memory!</h1>
            <div>
                <button onClick={() => startGame("Easy")}>Easy</button>
                <button onClick={() => startGame("Medium")}>Medium</button>
                <button onClick={() => startGame("Hard")}>Hard</button>
            </div>
        </div>
    );
}