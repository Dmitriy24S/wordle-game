import React, { createContext, ReactNode, useContext, useState } from 'react'
import words from '../data/words2.json'

interface GameContextType {
    word: string
    setWord: React.Dispatch<React.SetStateAction<string>>
    guess: string
    setGuess: React.Dispatch<React.SetStateAction<string>>
    guessWordList: string[]
    guessAttemptNumber: number
    gameResult: string
    setGameResult: React.Dispatch<React.SetStateAction<string>>
    isAnimationActive: boolean
    handleKeyClick: (addToast: (msg: string) => void, e: React.MouseEvent) => void
    handleEnter: (addToast: (msg: string) => void, e?: KeyboardEvent) => void
    handleBackspace: () => void
    resetGame: () => void
    setRandomWord: () => void
    invalidGuess: boolean
}

interface Props {
    children: ReactNode
}

// Context
const GameContext = createContext({} as GameContextType)
export const useGameContext = () => useContext(GameContext)

// Provider
export const GameContextProvider = ({ children }: Props) => {
    // const word = 'ghost'
    // const word = 'speed'
    const [word, setWord] = useState('')
    const [guess, setGuess] = useState<string>('')
    const [guessWordList, setGuessWordList] = useState<string[]>((new Array(6).fill('')))
    const [guessAttemptNumber, setGuessAttemptNumber] = useState(0)
    const [gameResult, setGameResult] = useState<string>('')
    const [isAnimationActive, setIsAnimationActive] = useState(false)
    const [invalidGuess, setInvalidGuess] = useState(false)

    // Click/tap on screen keyboard:
    const handleKeyClick = (addToast: (msg: string) => void, e: React.MouseEvent) => {
        // if game is not over -> allow key click
        if (!gameResult && !isAnimationActive) {
            // const handleKeyClick = (e: Event) => {
            console.log('guess', guess);
            // console.log(e);
            // console.log(e.target); // <button class="keyboard-key ">u</button>
            // console.log(e.target.textContent);
            // const target = e.target as HTMLButtonElement;
            const target = e.currentTarget as HTMLButtonElement;
            // Enter key click:
            if (target.textContent === 'Enter') {
                handleEnter(addToast)
                return
            }
            // Backspace  key click:
            if (target.ariaLabel === 'backspace') {
                console.log('backspace', 111111);
                handleBackspace()
                return
            }
            // Add letters to make guess word:
            if (guess.length < 5) {
                setGuess((prev) => prev + target.textContent)
                return
            }
        }
    }

    const handleEnter = (addToast: (msg: string) => void, e?: KeyboardEvent) => {
        console.log('HANDLE ENTER guess length', guess.length);
        e?.preventDefault(); // fixes bug? if focus set on letter -> press enter to submit word -> next row 1st letter auto apply focused letter (enter submits 1st word + 'clicks' focused btn) = now press enter => submit word without affecting next row / if not submitting -> press enter => enters focused letter into row

        // not full word:
        if (guess.length < 5) {
            console.log('not full word?');
            addToast('Fill out the word')
            // return
            // update invalid state -> adds shake css animation class to guess row
            setInvalidGuess(true)
            setTimeout(() => {
                setInvalidGuess(false)
            }, 200)
            // full word:
        } else {
            // guess is valid word
            if (words.includes(guess)) {
                setGuessWordList((prev) => prev.map((word, index) => index === guessAttemptNumber ? guess : word
                ))
                setGuessAttemptNumber((prev) => prev + 1)
                setGuess('')
                // calcGameResult() // ! ? moved to separate useEffect
                // valid word -> starts guessed word flip letter animation: 500ms flip animation each letter(5*500) = 2500ms
                // (animation state helps preventing typing/clicking for next guess ahead of time)
                setIsAnimationActive(true)
                // after 2500ms animation for guess is done -> set active animation state to false
                setTimeout(() => {
                    setIsAnimationActive(false)
                }, 2500);
            } else {
                // not valid word:
                // alert('Not in word list. Try another word')
                // TODO: notification (snackbar/toast) - done
                addToast('Not in word list. Try another word')
                // update invalid state -> adds shake css animation class to guess row
                setInvalidGuess(true)
                setTimeout(() => {
                    setInvalidGuess(false)
                }, 200)
            }
        }
    }

    const handleBackspace = () => {
        setGuess((currentGuess) => currentGuess.slice(0, currentGuess.length - 1))
    }

    // Initialize random word to guess
    function setRandomWord() {
        const randomNumber = Math.floor(Math.random() * words.length)
        console.log('rndm number', randomNumber, 'word:', words[randomNumber]);
        setWord(words[randomNumber])
    }

    const resetGame = () => {
        setGuess('')
        setGuessWordList((new Array(6).fill('')))
        setGuessAttemptNumber(0)
        setGameResult('')
        setRandomWord()
        console.log('GAME RESET');
    }

    return (
        // <GameContextProvider.Provider
        <GameContext.Provider
            value={{
                word,
                setWord,
                guess,
                setGuess,
                guessWordList,
                guessAttemptNumber,
                gameResult,
                setGameResult,
                isAnimationActive,
                handleKeyClick,
                handleEnter,
                handleBackspace,
                resetGame,
                setRandomWord,
                invalidGuess
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

