import React, { useEffect } from 'react'
import { useGameContext } from '../context/GameContext'

interface Props {
  letter: string
  setSetKeyStatus: React.Dispatch<React.SetStateAction<string | undefined>>
  letterStatusKeyboard: (key: string) => string
}

const useKeyStatusDelay = ({ letter, setSetKeyStatus, letterStatusKeyboard }: Props) => {
  const { guessAttemptNumber } = useGameContext()

  // After submit word: change color of each key, wait for staggered letters to flip (delay 500ms * index 5 letters) = 2500ms?
  useEffect(() => {
    let timeoutId: number
    // if (guessWordList.length === 0) {
    if (guessAttemptNumber === 0) {
      // update keys without delay if RESET game
      setSetKeyStatus(letterStatusKeyboard(letter))
    } else {
      timeoutId = setTimeout(() => {
        setSetKeyStatus(letterStatusKeyboard(letter))
      }, 2500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [guessAttemptNumber])
}

export default useKeyStatusDelay