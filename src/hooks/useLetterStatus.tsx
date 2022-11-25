interface Props {
    exactGuesses: string[]
    inexactGuesses: string[]
    allGuesses: string[]
    word: string
}

const useLetterStatus = ({
    exactGuesses,
    inexactGuesses,
    allGuesses,
    word
}: Props) => {
    // Key/letter status color:
    const letterStatusGameBoard = (letter: string, guessLetterIndex: number) => {
        return exactGuesses.includes(letter) && letter === word[guessLetterIndex] ? 'correct flip'
            : inexactGuesses.includes(letter) && letter !== word[guessLetterIndex] ? 'wrong-order flip'
                : allGuesses.includes(letter) ? 'wrong flip' : ''
    }

    const letterStatusKeyboard = (letter: string) => {
        return exactGuesses.includes(letter) ? 'correct'
            : inexactGuesses.includes(letter) ? 'wrong-order'
                : allGuesses.includes(letter) ? 'wrong' : ''
    }

    return { letterStatusGameBoard, letterStatusKeyboard }
}

export default useLetterStatus