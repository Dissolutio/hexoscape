import { Route, Routes } from 'react-router-dom'
import { Lobby } from 'boardgame.io/react'
import { Helmet } from 'react-helmet'
import { TicTacToe } from './game/game'
import { TicTacToeBoard } from './Board'
import { isLocalApp, SERVER } from './constants'
import { LocalApp, LocalDemoClients } from './LocalApp'

const App = () => {
  if (isLocalApp) {
    return (
      <>
        <LocalApp />
        <Helmet>
          <title>Hexoscape: Local App</title>
        </Helmet>
      </>
    )
  } else {
    return (
      <>
        <Helmet>
          <title>Hexoscape</title>
        </Helmet>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Lobby
                  gameServer={SERVER}
                  lobbyServer={SERVER}
                  gameComponents={[{ game: TicTacToe, board: TicTacToeBoard }]}
                />
              </>
            }
          />
          {/* Copied from Local App, because Routes can't handle a non-Route child */}
          <Route path="/local2" element={<LocalDemoClients numPlayers={2} />} />
        </Routes>
      </>
    )
  }
}

export default App
