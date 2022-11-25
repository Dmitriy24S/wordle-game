import { useEffect } from 'react'
import { AddToast } from '../App'
import { useGameContext } from '../context/GameContext'

interface Props {
    addToast: AddToast
}

const useKeyboardTyping = ({ addToast }: Props) => {
    const { guess, setGuess, handleEnter, handleBackspace, gameResult, isAnimationActive } = useGameContext()

    // Keyboard typing - fill guess word
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
                handleEnter(addToast, e)
            }
            // backspace -> remove last letter from current guess word
            if (e.key === 'Backspace') {
                handleBackspace()
            }
        }
        // if game is not over -> allow key press
        if (!gameResult && !isAnimationActive) {
            document.body.addEventListener('keydown', keyPress)
        }
        // cleanup
        return () => {
            document.body.removeEventListener('keydown', keyPress)
        }
        // }, [guess, guessWordList, guessAttemptNumber, gameResult])
    }, [guess, gameResult, isAnimationActive])
}

export default useKeyboardTyping