import "../styles/display.css"
import { Card } from "./Card";
import { useEffect, useState } from "react";

export function Display( {cards, setCards, difficulty, currentScore, setCurrentScore, bestScore, setBestScore, setGameOver, setGameWin} ) {
    const [memory, setMemory] = useState(new Set());
    const [flash, setFlash] = useState(null);

    function updateRootStyles(styles) {
        const root = document.documentElement;
    
        Object.entries(styles).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }

    function setDifficultyTheme(difficulty) {
        const themes = {
            "Easy": {
                "--card-width": "12vw",
                "--card-font-size": "2vw"
            },
            "Medium": {
                "--card-width": "10vw",
                "--card-font-size": "1.6vw"
            },
            "Hard": {
                "--card-width": "8vw",
                "--card-font-size": "1.3vw"
            }
        };
    
        updateRootStyles(themes[difficulty]);
    }

    useEffect(() => {
        setDifficultyTheme(difficulty)
    })

    const shuffleCards = (cards) => {
        return cards.sort(() => Math.random() - 0.5);
    };

    const handleClick = (e, index) => {
        const value = e.target.getAttribute("data-key");

        if(!memory.has(value)) {
            setFlash(index);

            setTimeout(() => {
                setFlash(null);
            }, 1000);    

            if(currentScore + 1 === cards.length) {
                setBestScore(currentScore + 1);
                setCurrentScore(0);
                setMemory(new Set());
                setGameWin(true);
                setGameOver(true);
            }
            else {
                setCurrentScore(score => score + 1);
                setMemory((prevMemory) => {
                    const newMemory = new Set(prevMemory);
                    newMemory.add(value);
                    return newMemory;
                });
            }

            setCards((prevCards) => shuffleCards(prevCards));
        }
        else {
            if(currentScore > bestScore) {
                setBestScore(currentScore);
            }
            setCurrentScore(0);
            setMemory(new Set());

            // display game over
            setGameWin(false);
            setGameOver(true);
        }
    }

    return (
        <>  
            <div className="cards-display">
                {cards.map((num, index) => (
                    <Card key={index} index={index} num={num} flash={flash} onClick={handleClick} />
                ))}
            </div>
        </>
    );
}