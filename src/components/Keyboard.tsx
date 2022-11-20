import React from 'react'

const QWERTY_KEYS = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
]

interface Props {
    word: string
    guessWordList: string[]
    guessAttemptNumber: number
}

const Keyboard = ({ word, guessWordList, guessAttemptNumber }: Props) => {
    // guessWordList(6)['snowy', '', '', '', '', '']
    // word ghost
    // allGuesses(5)['s', 'n', 'o', 'w', 'y']
    // inexactGuesses(2)['o', 's']
    // exactGuesses['o']

    console.log('guessWordList', guessWordList);
    // guessWordList (6) ['ghost', '', '', '', '', '']
    console.log('word', word);
    // word ghost

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

    const keyStatus = (key: string) => {
        return exactGuesses.includes(key) ? 'correct'
            : inexactGuesses.includes(key) ? 'wrong-order'
                : allGuesses.includes(key) ? 'wrong' : ''
    }

    return (
        <div className='keyboard'>
            {QWERTY_KEYS.map((row, index) => {
                // 1st row of keys
                if (index === 0) {
                    return (
                        <div className='keyboard-row' key={row}>
                            {row.split('').map((key) => {
                                const status = keyStatus(key)
                                return (
                                    <button className={`keyboard-key ${status}`} key={key}>
                                        {key}
                                    </button>
                                )
                            })}
                        </div>
                    )
                }
                // 2nd row with left right spacing
                if (index === 1) {
                    return (
                        <div className='keyboard-row' key={row}>
                            <div className="keyboard-space"></div>
                            {row.split('').map((key) => {
                                const status = keyStatus(key)
                                return (
                                    <button className={`keyboard-key ${status}`} key={key}>
                                        {key}
                                    </button>
                                )
                            })}
                            <div className="keyboard-space"></div>
                        </div>
                    )
                }
                // Last(3rd) row with Enter and Backspace buttons
                if (index === 2) {
                    return (
                        <div className='keyboard-row' key={row}>
                            <button className='keyboard-key enter-key'>Enter</button>
                            {row.split('').map((key) => {
                                const status = keyStatus(key)
                                return (
                                    <button className={`keyboard-key ${status}`} key={key}>
                                        {key}
                                    </button>
                                )
                            })}
                            <button aria-label='backspace' className='keyboard-key backspace-key'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="game-icon" data-testid="icon-backspace"><path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>
                            </button>
                        </div>
                    )
                }
            }
            )}
        </div>
    )
}

export default Keyboard