interface Props {
    word: string
    guessWordList: string[]
    guessAttemptNumber: number
}

const useGuessesStatus = ({ word, guessWordList, guessAttemptNumber }: Props) => {
    // Collect guesses accuracy:
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

    return { allGuesses, inexactGuesses, exactGuesses }
}

export default useGuessesStatus