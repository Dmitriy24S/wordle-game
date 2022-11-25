import { useEffect, useRef } from 'react'
import GameOver from './components/GameOver'
import Guess from './components/Guess'
import Keyboard from './components/Keyboard/Keyboard'
import ToastContainer from './components/Toast/ToastContainer'
import { useGameContext } from './context/GameContext'
import useGameResult from './hooks/useGameResult'
import useGuessesStatus from './hooks/useGuessesStatus'
import useKeyboardTyping from './hooks/useKeyboardTyping'
import useLetterStatus from './hooks/useLetterStatus'

export type ToastRef = React.ElementRef<typeof ToastContainer>;
export type AddToast = (msg: string) => void

function App() {
  const {
    word,
    guessWordList,
    guessAttemptNumber,
    gameResult,
    isAnimationActive,
    setRandomWord
  } = useGameContext()

  // Toast / Snackbar notification message
  const toastRef = useRef<ToastRef>(null);
  // Access/use useImperativeHandle forwardedRef addToast func:
  const addToast = (msg: string) => {
    if (toastRef.current) {
      toastRef.current.addToast({ message: msg, duration: 3000 })
      // no id -> id give in ToastContainer : interface Toast extends ToastValue ?
      // snackbarRef.current.show();
    }
  }

  // Initialize random word to guess
  useEffect(() => {
    setRandomWord()
  }, [])

  // Calculate game result (win/lost)
  useGameResult({ guessAttemptNumber })

  // Keyboard typing - fill guess word
  useKeyboardTyping({ addToast })

  // Collect guesses accuracy:
  const { allGuesses, inexactGuesses, exactGuesses } = useGuessesStatus({ word, guessWordList, guessAttemptNumber })

  // Key/letter status color:
  const { letterStatusGameBoard, letterStatusKeyboard } =
    useLetterStatus({ exactGuesses, inexactGuesses, allGuesses, word })

  // Misc.
  console.log('word', word);
  console.log('guessWordList', guessWordList);
  // guessWordList (6) ['ghost', '', '', '', '', '']

  // guessWordList(6)['snowy', '', '', '', '', '']
  // allGuesses(5)['s', 'n', 'o', 'w', 'y']
  // inexactGuesses(2)['o', 's']
  // exactGuesses['o']

  return (
    <div className="App">
      <h1 className='title'>Wordle Clone</h1>

      <div className="game">
        {[...Array(6)].map((_item, index) => (
          <Guess
            key={index}
            row={index}
            letterStatusGameBoard={letterStatusGameBoard}
          />
        ))}
      </div>

      {gameResult && !isAnimationActive && <GameOver />}
      <Keyboard letterStatusKeyboard={letterStatusKeyboard} addToast={addToast} />
      <ToastContainer ref={toastRef} />
    </div>
  )
}

export default App
