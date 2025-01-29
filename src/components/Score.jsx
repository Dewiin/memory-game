import "../styles/score.css"

export function Score( {currentScore, bestScore} ) {
    return (
        <div className="game-scores">
            <p>Current Score: {currentScore}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    );
}