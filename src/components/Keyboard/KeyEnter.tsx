import { AddToast } from '../../App'
import { useGameContext } from '../../context/GameContext'

interface Props {
    addToast: AddToast
}

const KeyEnter = ({ addToast }: Props) => {
    const { handleKeyClick } = useGameContext()

    return (
        <button className='keyboard-key enter-key' onClick={(e) => handleKeyClick(addToast, e)}>
            Enter
        </button>
    )
}

export default KeyEnter