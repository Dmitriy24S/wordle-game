import { AddToast } from '../../App'
import useKeyStatusDelay from '../../hooks/useKeyStatusDelay'
import KeyBackspace from './KeyBackspace'
import KeyEnter from './KeyEnter'
import Row from './Row'

const QWERTY_KEYS = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
]

interface Props {
    letterStatusKeyboard: (key: string) => string
    addToast: AddToast
}

const Keyboard = ({ letterStatusKeyboard, addToast }: Props) => {
    return (
        <div className='keyboard'>
            {QWERTY_KEYS.map((row, index) => {
                // 1st and 2nd row of keys
                if (index !== 2) {
                    return (
                        <div className='keyboard-row' key={row}>
                            {/* {row.split('').map((letter) => {
                                // const status = letterStatusKeyboard(key)
                                const [keyStatus, setSetKeyStatus] = useState<string>()

                                // After submit word: change color of each key, wait for staggered letters to flip (delay 500ms * index 5 letters) = 2500ms?

                                // useEffect(() => {
                                //     let timeoutId: number
                                //     if (guessAttemptNumber === 0) {
                                //          update keys without delay if RESET game
                                //         setSetKeyStatus(letterStatusKeyboard(letter))
                                //     } else {
                                //         timeoutId = setTimeout(() => {
                                //             setSetKeyStatus(letterStatusKeyboard(letter))
                                //         }, 2500)
                                //     }
                                //     return () => {
                                //         clearTimeout(timeoutId)
                                //     }
                                // }, [guessAttemptNumber])

                                useKeyStatusDelay({ letter, setSetKeyStatus, letterStatusKeyboard })

                                return <Key key={letter} letter={letter} keyStatus={keyStatus} addToast={addToast} />
                            })} */}
                            <Row row={row} letterStatusKeyboard={letterStatusKeyboard} addToast={addToast} />
                        </div>
                    )
                }
                // 2nd row with left right spacing
                // if (index === 1) {
                //     return (
                //         <div className='keyboard-row' key={row}>
                //             <div className="keyboard-space"></div>
                //             <Row row={row} letterStatusKeyboard={letterStatusKeyboard} addToast={addToast} />
                //             <div className="keyboard-space"></div>
                //         </div>
                //     )
                // }
                // ! replaced grid w/ space divs to -> flex justify center keyboard
                // Last(3rd) row with Enter and Backspace buttons
                if (index === 2) {
                    return (
                        <div className='keyboard-row' key={row}>
                            <KeyEnter addToast={addToast} />
                            <Row row={row} letterStatusKeyboard={letterStatusKeyboard} addToast={addToast} />
                            <KeyBackspace addToast={addToast} />
                        </div>
                    )
                }
            }
            )}
        </div>
    )
}

export default Keyboard