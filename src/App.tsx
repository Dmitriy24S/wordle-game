import { useEffect, useState } from 'react'
import Guess from './components/Guess'
import Keyboard from './components/Keyboard'

function App() {
  const word = 'ghost'
  const [guess, setGuess] = useState<string>('')
  const [guessWordList, setGuessWordList] = useState<string[]>((new Array(6).fill('')))
  const [guessAttemptNumber, setGuessAttemptNumber] = useState(0)

  useEffect(() => {
    const keyPress = (e: KeyboardEvent) => {
      // letter press
      if (e.key.match(/^[A-z]$/) && guess.length < 5) {
        // console.log('e.key', e.key);
        setGuess((prev) => prev + e.key.toLowerCase())
        // console.log('guess.length', guess.length);
      }
      // if enter -> submit word as guess
      if (e.key === 'Enter' && guess.length === 5) {
        // console.log('enter enter?', 'guessAttemptNumber', guessAttemptNumber); // 0
        setGuessWordList((prev) => prev.map((word, index) => index === guessAttemptNumber ? guess : word
        ))
        // console.log('guessWordList', guessWordList); // empty -> delay?
        setGuessAttemptNumber((prev) => prev + 1)
        setGuess('')
      }
      // backspace -> remove last letter from current guess word
      if (e.key === 'Backspace') {
        setGuess((currentGuess) => currentGuess.slice(0, currentGuess.length - 1))
      }
    }

    document.body.addEventListener('keydown', keyPress)
    // cleanup
    return () => {
      document.body.removeEventListener('keydown', keyPress)
    }
  }, [guess, guessWordList, guessAttemptNumber])


  return (
    <div className="App">
      <h1 className='title'>Wordle Clone</h1>
      <div className="game">
        {[...Array(6)].map((_item, index) => (
          <Guess
            word={word}
            guess={guess}
            key={index}
            guessWordList={guessWordList}
            row={index}
            guessAttemptNumber={guessAttemptNumber}
          />
        ))}
      </div>
      <Keyboard
        word={word}
        guessWordList={guessWordList}
        guessAttemptNumber={guessAttemptNumber}
      />
    </div>
  )
}

export default App
