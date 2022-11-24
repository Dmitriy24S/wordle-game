import React, { useEffect, useState } from 'react'

interface Props {
    guess: string
    guessWordList: string[]
    row: number
    guessAttemptNumber: number
    letterStatusGameBoard: (key: string, guessLetterIndex: number) => string
}

const Guess = ({ guess, guessWordList, row, guessAttemptNumber, letterStatusGameBoard }: Props) => {
    // console.log('guess', guess);
    // console.log('guessWordList', guessWordList);
    // guessWordList (6) ['', '', '', '', '', '']

    // guessWordList(6)['snowy', '', '', '', '', '']
    // word ghost
    // allGuesses(5)['s', 'n', 'o', 'w', 'y']
    // inexactGuesses(2)['o', 's']
    // exactGuesses['o']

    return (
        <div className='guess-row'>
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

                return (
                    <div className={`guess-square ${letterStatus}`} key={index}>
                        {/* show active typing guess text / show previous submitted text: */}
                        {guessAttemptNumber === row ? guess[index] : guessWordList[row][index]}
                    </div>
                )
            })}
        </div>
    )
}

export default Guess