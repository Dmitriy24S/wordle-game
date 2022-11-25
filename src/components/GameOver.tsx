import { useGameContext } from '../context/GameContext'

// interface Props {
//     word: string
//     gameResult: string
//     resetGame: () => void
// }


// const GameOver = ({ word, gameResult, resetGame }: Props)
const GameOver = () => {
    const { word, gameResult, resetGame } = useGameContext()

    return (
        <div className='play-again-container'>
            <div className='play-again-title'>
                {gameResult === 'win' && <h4 className='win-text'>Congratulations! You Won.</h4>}
                {gameResult === 'lost' && <h4 className='lost-text'>The word was: <span className='play-again-title-word'>{word}</span></h4>}
            </div>
            <button className='play-again-btn' onClick={resetGame}>Play again</button>
        </div>
    )
}

export default GameOver