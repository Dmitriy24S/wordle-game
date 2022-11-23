import { useEffect, useRef, useState } from 'react'
import GameOver from './components/GameOver'
import Guess from './components/Guess'
import Keyboard from './components/Keyboard'
import ToastContainer from './components/Toast/ToastContainer'
import words from './data/words.json'

type ToastRef = React.ElementRef<typeof ToastContainer>;


function App() {
  const word = 'ghost'
  const [guess, setGuess] = useState<string>('')
  const [guessWordList, setGuessWordList] = useState<string[]>((new Array(6).fill('')))
  const [guessAttemptNumber, setGuessAttemptNumber] = useState(0)
  const [gameResult, setGameResult] = useState<string>('')

  // Toast / Snackbar notification message
  const toastRef = useRef<ToastRef>(null);
  // const toastRef = useRef<any>();
  // console.log('toastRef', toastRef);
  // toastRef
  // {current: {…}}
  // current:
  // addToast: ƒ addToast(toast)
  // length: 1
  // name: "addToast"
  function addToast(msg: string) {
    if (toastRef.current) {
      toastRef.current.addToast({ message: msg, duration: 3000 })
      // no id -> id give in ToastContainer : interface Toast extends ToastValue ?
      // snackbarRef.current.show();
    }
  }


  // Calculate game result (win/lost)
  useEffect(() => {
    const calcGameResult = () => {
      console.log('CALC GAME RESULT', 'guessAttemptNumber', guessAttemptNumber, 'guessWordList', guessWordList);
      // CALC GAME RESULT guessAttemptNumber 1 guessWordList (6) ['ghost', '', '', '', '', '']
      if (guessAttemptNumber === 6) {
        setGameResult('lost')
        console.log('GAME LOST');
      }
      if (guessWordList[guessAttemptNumber - 1] === word) {
        // after Enter increment guessAttemptNumber and after 1st try goes from 0 to 1 (2nd attempt is active), need (-1) index to access the most recently submited value
        setGameResult('win')
        console.log('GAME WON');
      }
    }
    calcGameResult()
  }, [guessAttemptNumber])

  const resetGame = () => {
    setGuess('')
    setGuessWordList((new Array(6).fill('')))
    setGuessAttemptNumber(0)
    setGameResult('')
  }

  // Click/tap on screen keyboard:
  const handleKeyClick = (e: React.MouseEvent) => {
    // if game is not over -> allow key click
    if (!gameResult) {
      // const handleKeyClick = (e: Event) => {
      console.log('guess', guess);
      // console.log(e);
      // console.log(e.target); // <button class="keyboard-key ">u</button>
      // console.log(e.target.textContent);
      const target = e.currentTarget as HTMLButtonElement;
      // const target = e.target as HTMLButtonElement;
      if (guess.length < 5) {
        setGuess((prev) => prev + target.textContent)
        return
      }
      if (target.textContent === 'Enter') {
        handleEnter()
        return
      }
      if (target.ariaLabel === 'backspace') {
        console.log('backspace', 111111);
        handleBackspace()
        return
      }
    }
  }

  const handleEnter = (e?: KeyboardEvent) => {
    console.log('HANDLE ENTER guess length', guess.length);
    e?.preventDefault(); // fixes bug? if focus set on letter -> press enter to submit word -> next row 1st letter auto apply focused letter (enter submits 1st word + 'clicks' focused btn) = now press enter => submit word without affecting next row / if not submitting -> press enter => enters focused letter into row

    // not full word:
    if (guess.length < 5) {
      console.log('not full word?');
      addToast('Fill out the word')
      // return
      // full word:
    } else {
      // guess is valid word
      if (words.includes(guess)) {
        setGuessWordList((prev) => prev.map((word, index) => index === guessAttemptNumber ? guess : word
        ))
        setGuessAttemptNumber((prev) => prev + 1)
        setGuess('')
        // calcGameResult() // ! ?
      } else {
        // not valid word:
        // alert('Not in word list. Try another word')
        // TODO: notification (snackbar/toast)
        addToast('Not in word list. Try another word')
      }
    }
  }

  const handleBackspace = () => {
    setGuess((currentGuess) => currentGuess.slice(0, currentGuess.length - 1))
  }

  // guessWordList(6)['snowy', '', '', '', '', '']
  // word ghost
  // allGuesses(5)['s', 'n', 'o', 'w', 'y']
  // inexactGuesses(2)['o', 's']
  // exactGuesses['o']
  console.log('guessWordList', guessWordList);
  // guessWordList (6) ['ghost', '', '', '', '', '']
  console.log('word', word);
  // word ghost

  // Keyboard press typing
  useEffect(() => {
    const keyPress = (e: KeyboardEvent) => {
      console.log('keyPress e', e);
      // letter press -> make guess word
      if (e.key.match(/^[A-z]$/) && guess.length < 5) {
        // console.log('e.key', e.key);
        setGuess((prev) => prev + e.key.toLowerCase())
        // console.log('guess.length', guess.length);
      }
      // if enter -> submit word as guess
      if (e.key === 'Enter') {
        handleEnter(e)
      }
      // backspace -> remove last letter from current guess word
      if (e.key === 'Backspace') {
        handleBackspace()
      }
    }
    // if game is not over -> allow key press
    if (!gameResult) {
      document.body.addEventListener('keydown', keyPress)
    }
    // cleanup
    return () => {
      document.body.removeEventListener('keydown', keyPress)
    }
  }, [guess, guessWordList, guessAttemptNumber, gameResult])

  // Key/letter status color:
  const allGuesses = guessWordList.slice(0, guessAttemptNumber).join('').split('')
  console.log('allGuesses', allGuesses);
  // Keyboard.tsx:47 allGuesses (5) ['g', 'u', 'e', 's', 's']

  const inexactGuesses = word
    .split('')
    .filter((letter) => allGuesses.includes(letter))
  console.log('inexactGuesses', inexactGuesses);
  // inexactGuesses (2) ['g', 's']

  const exactGuesses = word
    .split('')
    // if any guesses include this letter in this position/index
    .filter((letter, i) => {
      return guessWordList
        .slice(0, guessAttemptNumber)
        .map((word) => word[i])
        .includes(letter)
    })
  console.log('exactGuesses', exactGuesses);
  // exactGuesses (5) ['g', 'h', 'o', 's', 't']

  const letterStatusGameBoard = (letter: string, guessLetterIndex: number) => {
    return exactGuesses.includes(letter) && letter === word[guessLetterIndex] ? 'correct'
      : inexactGuesses.includes(letter) && letter !== word[guessLetterIndex] ? 'wrong-order'
        : allGuesses.includes(letter) ? 'wrong' : ''
  }

  const letterStatusKeyboard = (letter: string) => {
    return exactGuesses.includes(letter) ? 'correct'
      : inexactGuesses.includes(letter) ? 'wrong-order'
        : allGuesses.includes(letter) ? 'wrong' : ''
  }

  return (
    <div className="App">
      <h1 className='title'>Wordle Clone</h1>
      <div className="game">
        {[...Array(6)].map((_item, index) => (
          <Guess
            guess={guess}
            key={index}
            guessWordList={guessWordList}
            row={index}
            guessAttemptNumber={guessAttemptNumber}
            letterStatusGameBoard={letterStatusGameBoard}
          />
        ))}
      </div>
      {gameResult && <GameOver resetGame={resetGame} word={word} gameResult={gameResult} />}
      <Keyboard
        handleKeyClick={handleKeyClick}
        letterStatusKeyboard={letterStatusKeyboard}
      />
      <ToastContainer ref={toastRef} />
    </div>
  )
}

export default App
