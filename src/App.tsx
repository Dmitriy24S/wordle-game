import { useState } from 'react'
import Guess from './components/Guess'
import Keyboard from './components/Keyboard'

function App() {
  const guess = 'guesh'
  const word = 'ghost'

  return (
    <>
      <div className="App">
        <h1 className='title'>Wordle Clone</h1>
        <div className="game">
          {[...Array(6)].map((item, index) => (
            <Guess word={word} guess={guess} key={index} />
          ))}
        </div>
        <Keyboard word={word} guess={guess} />
      </div>
    </>
  )
}

export default App
