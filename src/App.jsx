import './App.css'
import './styles/loading.css'
import { useState, useEffect } from 'react';
import { Display } from './components/Display';
import { Score } from './components/Score';
import { Menu } from './components/Menu';
import { GameOver } from './components/GameOver';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  async function getRandomWord() {
    const response = await fetch("https://random-word-api.vercel.app/api?words=1");
    const data = await response.json();
    return data[0];
  }

  useEffect(() => {
    setLoading(true);
    
    async function fetchWords() {
      const size = difficulty ? (
        difficulty === "Easy" ? 5 : difficulty === "Medium" ? 10 : 15
      ) : (
        0
      );
    
      try {
        const words = await Promise.all(
          Array.from( {length : size} ).map(() => getRandomWord())
        );
        setCards(words);
      }
      catch {
        console.error("Error fetching API.");
      } 
      finally {
        setLoading(false);
      }
    }

    fetchWords();
  }, [difficulty]);

  return (
    <>
      {!difficulty ? (
          <Menu 
            setDifficulty={setDifficulty} 
          /> 
        ) : gameOver? (
          <GameOver 
            gameWin={gameWin}
            setGameOver={setGameOver}
            setDifficulty={setDifficulty}
          />
        ) : loading ? (
          <div className='loading-screen'>
            <div></div>
            <p>Loading</p>
          </div>
        ) : (
          <div className="content">
            <Score 
              currentScore={currentScore} 
              bestScore={bestScore} 
            />
            <Display 
              cards={cards}
              setCards={setCards}
              difficulty={difficulty}
              currentScore={currentScore}
              setCurrentScore={setCurrentScore} 
              bestScore={bestScore} 
              setBestScore={setBestScore} 
              setGameOver={setGameOver}
              setGameWin={setGameWin}
            />
          </div>
        )
      }
    </>
  );
}

export default App
