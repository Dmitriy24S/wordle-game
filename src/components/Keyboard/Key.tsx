import { AddToast } from '../../App'
import { useGameContext } from '../../context/GameContext'

interface Props {
    keyStatus?: string
    letter: string
    addToast: AddToast
}

const Key = ({ keyStatus, letter, addToast }: Props) => {
    const { handleKeyClick } = useGameContext()

    return (
        <button className={`keyboard-key ${keyStatus}`} onClick={(e) => handleKeyClick(addToast, e)}>
            {letter}
        </button>
    )
}

export default Key