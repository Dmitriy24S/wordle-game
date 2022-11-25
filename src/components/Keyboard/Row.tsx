import { useState } from 'react'
import { AddToast } from '../../App'
import useKeyStatusDelay from '../../hooks/useKeyStatusDelay'
import Key from './Key'

interface Props {
    row: string
    letterStatusKeyboard: (key: string) => string
    addToast: AddToast
}

const Row = ({ row, letterStatusKeyboard, addToast }: Props) => {
    return (
        <>
            {row.split('').map((letter) => {
                // const status = letterStatusKeyboard(key)
                const [keyStatus, setSetKeyStatus] = useState<string>()
                // After submit word: change color of each key, wait for staggered letters to flip (delay 500ms * index 5 letters) = 2500ms?
                useKeyStatusDelay({ letter, setSetKeyStatus, letterStatusKeyboard })

                return <Key key={letter} letter={letter} keyStatus={keyStatus} addToast={addToast} />
            })}
        </>
    )
}

export default Row