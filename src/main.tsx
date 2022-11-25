import ReactDOM from 'react-dom/client'
import App from './App'
import { GameContextProvider } from './context/GameContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <GameContextProvider>
    <App />
  </GameContextProvider>
  // </React.StrictMode>
)
