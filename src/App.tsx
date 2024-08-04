import { Client } from 'boardgame.io/react'
import { TicTacToe } from './game/game'
import { TicTacToeBoard } from './Board'

const App: any = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
})

export default App
