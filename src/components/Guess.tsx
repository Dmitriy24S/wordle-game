import React from 'react'

interface Props {
    word: string
    guess: string
}

const Guess = ({ word, guess }: Props) => {
    return (
        <div className='guess-row'>
            {[...Array(5)].map((item, index) => {
                const letterStatus = guess[index] === word[index] ? 'correct' : word.includes(guess[index]) ? 'wrong-order' : 'wrong'
                return (
                    <div className={`guess-square ${letterStatus}`} key={index}>{guess[index]}</div>
                )
            })}
        </div>
    )
}

export default Guess