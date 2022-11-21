import { useEffect, useState } from 'react'
import Guess from './components/Guess'
import Keyboard from './components/Keyboard'
import words from './data/words.json'

function App() {
  const word = 'ghost'
  const [guess, setGuess] = useState<string>('')
  const [guessWordList, setGuessWordList] = useState<string[]>((new Array(6).fill('')))
  const [guessAttemptNumber, setGuessAttemptNumber] = useState(0)

  // Click/tap on screen keyboard:
  const handleKeyClick = (e: React.MouseEvent) => {
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

  const handleEnter = (e?: KeyboardEvent) => {
    console.log('HANDLE ENTER guess length', guess.length);
    e?.preventDefault(); // fixes bug? if focus set on letter -> press enter to submit word -> next row 1st letter auto apply focused letter (enter submits 1st word + 'clicks' focused btn) = now press enter => submit word without affecting next row / if not submitting -> press enter => enters focused letter into row
    if (guess.length < 5) return
    // if guess is valid word
    if (words.includes(guess)) {
      setGuessWordList((prev) => prev.map((word, index) => index === guessAttemptNumber ? guess : word
      ))
      setGuessAttemptNumber((prev) => prev + 1)
      setGuess('')
      // calcGameResult() // ! ?
    } else {
      alert('Not in word list. Try another word')
      // TODO: notification (snackbar/toast)
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
      // letter press
      if (e.key.match(/^[A-z]$/) && guess.length < 5) {
        // console.log('e.key', e.key);
        setGuess((prev) => prev + e.key.toLowerCase())
        // console.log('guess.length', guess.length);
      }
      // if enter -> submit word as guess
      if (e.key === 'Enter' && guess.length === 5) {
        handleEnter(e)
      }
      // backspace -> remove last letter from current guess word
      if (e.key === 'Backspace') {
        handleBackspace()
      }
    }
    document.body.addEventListener('keydown', keyPress)
    // cleanup
    return () => {
      document.body.removeEventListener('keydown', keyPress)
    }
  }, [guess, guessWordList, guessAttemptNumber])

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
        handleKeyClick={handleKeyClick}
        letterStatusKeyboard={letterStatusKeyboard}
      />
    </div>
  )
}

export default App
