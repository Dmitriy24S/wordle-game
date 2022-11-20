import React from 'react'

interface Props {
    word: string
    guess: string
    guessWordList: string[]
    row: number
    guessAttemptNumber: number
}

const Guess = ({ word, guess, guessWordList, row, guessAttemptNumber }: Props) => {
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
                const letterStatus = guessWordList[row][index] === word[index] ? 'correct' : word.includes(guessWordList[row][index]) ? 'wrong-order' : 'wrong'

                return (
                    <div className={`guess-square ${letterStatus}`} key={index}>
                        {guessAttemptNumber === row ? guess[index] : guessWordList[row][index]}
                    </div>
                )
            })}
        </div>
    )
}

export default Guess