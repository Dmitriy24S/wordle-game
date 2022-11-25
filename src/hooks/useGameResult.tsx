import { useEffect } from 'react'
import { useGameContext } from '../context/GameContext'

interface Props {
    guessAttemptNumber: number
}

const useGameResult = ({ guessAttemptNumber }: Props) => {
    const { setGameResult, guessWordList, word } = useGameContext()

    // Calculate game result (win/lost)
    useEffect(() => {
        const calcGameResult = () => {
            console.count('calcGameResult') // App.tsx:55 calcGameResult: 2 (1 guess)
            console.log('CALC GAME RESULT', 'guessAttemptNumber', guessAttemptNumber, 'guessWordList', guessWordList);
            // CALC GAME RESULT guessAttemptNumber 1 guessWordList (6) ['ghost', '', '', '', '', '']
            // if reach 6 guesses without correct one = game over
            if (guessAttemptNumber === 6) {
                setGameResult('lost')
                console.log('GAME LOST');
            }
            // if guess is the word = win
            if (guessWordList[guessAttemptNumber - 1] === word) {
                // after Enter increment guessAttemptNumber and after 1st try goes from 0 to 1 (2nd attempt is active), need (-1) index to access the most recently submited value
                setGameResult('win')
                console.log('GAME WON');
            }
        }
        calcGameResult()
    }, [guessAttemptNumber])
}

export default useGameResult