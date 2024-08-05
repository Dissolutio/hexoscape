import { Route, Link, Routes } from 'react-router-dom'
import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import { Debug } from 'boardgame.io/debug'
import { Helmet } from 'react-helmet'
import { TicTacToe } from './game/game'
import { specialMatchIdToTellHeaderNavThisMatchIsLocal } from './constants'
import { TicTacToeBoard } from './Board'

const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()

export const LocalApp = () => {
  return (
    <>
      <Helmet>
        <title>TicTacToe - Local Game</title>
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Choose a game:</h1>
              <DemoLocalGameLinks />
            </>
          }
        />
        <Route path="/local2" element={<LocalDemoClients numPlayers={2} />} />
      </Routes>
    </>
  )
}

export const DemoLocalGameLinks = () => (
  <>
    <ul>
      <li>
        <Link reloadDocument to="/local2">
          2-Player Game
        </Link>
      </li>
    </ul>
  </>
)

const bgioLocalClientParams = {
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  debug: { impl: Debug },
  // debug: true,
}

const Local2PlayerClient = Client({
  ...bgioLocalClientParams,
  numPlayers: 2,
})

export const LocalDemoClients = ({ numPlayers }: { numPlayers: number }) => {
  const matchID = `${specialMatchIdToTellHeaderNavThisMatchIsLocal}:${numPlayers}`
  return (
    <>
      <Local2PlayerClient playerID={'0'} matchID={matchID} />
      <Local2PlayerClient playerID={'1'} matchID={matchID} />
    </>
  )
}
