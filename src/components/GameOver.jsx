export function GameOver( {gameWin, setGameOver, setDifficulty} ) {
    const handleGameOver = (option) => {
        if (option === "Menu" || option === "Replay") {
            setDifficulty(null);
        }
        setGameOver(false);
    }

    return (
        <div className="menu">
            {gameWin ? (
                <h1>You Won!</h1>
                ) : (
                <h1>Game Over!</h1>
                )
            }
            
            <div>
                {gameWin ? (
                    <button onClick={() => handleGameOver("Replay")}>New Game</button>
                    ) : (
                    <>
                        <button onClick={() => handleGameOver("Retry")}>Retry</button>
                        <button onClick={() => handleGameOver("Menu")}>Menu</button>
                    </>
                    )
                }
            </div>
        </div>
    );
}