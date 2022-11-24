import React, { useEffect, useState } from 'react'

const QWERTY_KEYS = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
]

interface Props {
    handleKeyClick: (e: React.MouseEvent) => void
    letterStatusKeyboard: (key: string) => string
    guessWordList: string[]
    guessAttemptNumber: number
}

const Keyboard = ({ handleKeyClick, letterStatusKeyboard, guessWordList, guessAttemptNumber }: Props) => {
    return (
        <div className='keyboard'>
            {QWERTY_KEYS.map((row, index) => {
                // 1st row of keys
                if (index === 0) {
                    return (
                        <div className='keyboard-row' key={row}>
                            {row.split('').map((key) => {
                                // const status = letterStatusKeyboard(key)
                                const [keyStatus, setSetKeyStatus] = useState<string>()
                                // After submit word: change color of each key, wait for staggered letters to flip (delay 500ms * index 5 letters) = 2500ms?
                                useEffect(() => {
                                    let timeoutId: number
                                    // if (guessWordList.length === 0) {
                                    if (guessAttemptNumber === 0) {
                                        // update keys without delay if RESET game
                                        setSetKeyStatus(letterStatusKeyboard(key))
                                    } else {
                                        timeoutId = setTimeout(() => {
                                            setSetKeyStatus(letterStatusKeyboard(key))
                                        }, 2500)
                                    }
                                    return () => {
                                        clearTimeout(timeoutId)
                                    }
                                }, [guessWordList, guessAttemptNumber])

                                return (
                                    <button className={`keyboard-key ${keyStatus}`} key={key} onClick={handleKeyClick}>
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
                                // const status = letterStatusKeyboard(key)
                                const [keyStatus, setSetKeyStatus] = useState<string>()
                                // After submit word: change color of each key, wait for staggered letters to flip (delay 500ms * index 5 letters) = 2500ms?
                                useEffect(() => {
                                    let timeoutId: number
                                    if (guessAttemptNumber === 0) {
                                        // update keys without delay if RESET game
                                        setSetKeyStatus(letterStatusKeyboard(key))
                                    } else {
                                        timeoutId = setTimeout(() => {
                                            setSetKeyStatus(letterStatusKeyboard(key))
                                        }, 2500)
                                    }
                                    return () => {
                                        clearTimeout(timeoutId)
                                    }
                                }, [guessWordList, guessAttemptNumber])

                                return (
                                    <button className={`keyboard-key ${keyStatus}`} key={key} onClick={handleKeyClick}>
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
                            <button className='keyboard-key enter-key' onClick={handleKeyClick}>
                                Enter</button>
                            {row.split('').map((key) => {
                                // const status = letterStatusKeyboard(key)
                                const [keyStatus, setSetKeyStatus] = useState<string>()
                                // After submit word: change color of each key, wait for staggered letters to flip (delay 500ms * index 5 letters) = 2500ms?
                                useEffect(() => {
                                    let timeoutId: number
                                    if (guessAttemptNumber === 0) {
                                        // update keys without delay if RESET game
                                        setSetKeyStatus(letterStatusKeyboard(key))
                                    } else {
                                        timeoutId = setTimeout(() => {
                                            setSetKeyStatus(letterStatusKeyboard(key))
                                        }, 2500)
                                    }
                                    return () => {
                                        clearTimeout(timeoutId)
                                    }
                                }, [guessWordList, guessAttemptNumber])

                                return (
                                    <button className={`keyboard-key ${keyStatus}`} key={key} onClick={handleKeyClick}>
                                        {key}
                                    </button>
                                )
                            })}
                            <button aria-label='backspace' className='keyboard-key backspace-key'
                                // onClick={(e) => {
                                //     console.log(e, 'backspace e');
                                //     console.log(e.target, 'backspace target e');
                                //     console.log(e.currentTarget, 'backspace e currentTarget');
                                //     handleKeyClick(e)
                                // }}
                                onClick={handleKeyClick} >
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