import React, { useEffect, useState } from 'react'
import { AddToast } from '../App'
import { useGameContext } from '../context/GameContext'

// interface Props {
//     guess: string
//     guessWordList: string[]
//     row: number
//     guessAttemptNumber: number
//     letterStatusGameBoard: (key: string, guessLetterIndex: number) => string
// }
interface Props {
    row: number
    letterStatusGameBoard: (key: string, guessLetterIndex: number) => string
    // addToast: (msg: string) => void
}

const Guess = ({ row, letterStatusGameBoard }: Props) => {
    // row === {[...Array(6)].map index (0?)
    const { guess, guessWordList, guessAttemptNumber, invalidGuess } = useGameContext()

    // console.log('guess', guess);
    // console.log('guessWordList', guessWordList);
    // guessWordList (6) ['', '', '', '', '', '']

    // guessWordList(6)['snowy', '', '', '', '', '']
    // word ghost
    // allGuesses(5)['s', 'n', 'o', 'w', 'y']
    // inexactGuesses(2)['o', 's']
    // exactGuesses['o']

    // add css shake animation class to current guess row if invalid/empty input = invalid guess
    const rowStatus = guessAttemptNumber === row && invalidGuess ? 'shake' : ''

    return (
        // <div className='guess-row'>
        <div className={`guess-row ${rowStatus}`}>
            {[...Array(5)].map((_item, index) => {
                // console.log('guessWordList[row]', guessWordList[row]); // empty
                // const letterStatus = guessWordList[row][index] === word[index] ? 'correct' : word.includes(guessWordList[row][index]) ? 'wrong-order' : 'wrong'

                // const letterStatus = letterStatusGameBoard(guessWordList[row][index], index)

                // console.log('letterStatusGameBoard(guessWordList[row][index], index)', letterStatusGameBoard(guessWordList[row][index], index));
                // letterStatusGameBoard(guessWordList[row][index], index) wrong flip
                // letterStatusGameBoard(guessWordList[row][index], index) correct flip
                // letterStatusGameBoard(guessWordList[row][index], index) wrong flip
                // letterStatusGameBoard(guessWordList[row][index], index) wrong-order flip
                // letterStatusGameBoard(guessWordList[row][index], index) wrong flip

                const [letterStatus, setLetterStatus] = useState<string>()
                // After submit word: flip + change color of each letter with stagger? delay 500ms * index
                useEffect(() => {
                    let timeoutId: number
                    if (guessAttemptNumber === 0) {
                        // update letter without delay if RESET game
                        setLetterStatus(letterStatusGameBoard(guessWordList[row][index], index))
                    } else {
                        timeoutId = setTimeout(() => {
                            setLetterStatus(letterStatusGameBoard(guessWordList[row][index], index))
                        }, 500 * index)
                    }

                    return () => {
                        clearTimeout(timeoutId)
                    }
                }, [guessWordList])

                /* jump letters when start typing guess */
                // const activeInput = guessAttemptNumber === row && guess[index] ? 'active' : '';
                const activeInput = guessAttemptNumber === row && guess[index] || guessWordList[row] ? 'active' : ''; // (keep active tile border while animating flip)

                // console.log('row', row);
                // console.log('index', index);
                // console.log('guessWordList[index]', guessWordList[index]);

                return (
                    <div className={`guess-square ${letterStatus} ${activeInput}`} key={index}>
                        {/* show active typing guess text / show previous submitted text: */}
                        {guessAttemptNumber === row ? guess[index] : guessWordList[row][index]}
                    </div>
                )
            })}
        </div>
    )
}

export default Guess