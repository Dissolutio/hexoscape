import { Route, Link, Routes } from 'react-router-dom'
import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Helmet } from 'react-helmet'
import { BgioLobbyApiProvider } from '../bgio-contexts'
import { AuthProvider, useAuth } from '../hooks/useAuth'
import { MultiplayerLobby, MultiplayerLobbyProvider } from '../lobby'
import { MultiplayerNav } from './MultiplayerNav'
import { Hexoscape } from '../game/game'
import { SERVER } from './constants'
import { Board } from '../hexopolis-ui/Board'
import { DemoLocalGameLinks, LocalApp, localRoutes } from './LocalApp'

const MultiplayerGameClient = Client({
  game: Hexoscape,
  board: Board,
  numPlayers: 2,
  multiplayer: SocketIO({ server: SERVER }),
  debug: false,
})

export const App = () => {
  // ! Two Options:
  // * A local game (for game development) `npm run start`
  // * Run a production server that serves up the client on localhost:8000: `npm run build` THEN `npm run server`
  if (import.meta.env.MODE === 'development') {
    return <LocalApp />
  } else {
    return (
      <AuthProvider>
        <BgioLobbyApiProvider serverAddress={SERVER}>
          <MultiplayerLobbyProvider>
            <Helmet>
              <title>Hexoscape</title>
            </Helmet>
            <Routes>
              <Route path="/" element={<MultiplayerLobbyPage />} />
              <Route path="/play" element={<PlayPage />} />
              <Route path="/demo" element={<DemoLocalGamePage />} />
              {localRoutes()}
            </Routes>
          </MultiplayerLobbyProvider>
        </BgioLobbyApiProvider>
      </AuthProvider>
    )
  }
}

const PlayPage = () => {
  const { storedCredentials } = useAuth()
  const { playerID, matchID, playerCredentials } = storedCredentials
  if (!playerID || !matchID || !playerCredentials) {
    return (
      <p>
        You are not currently joined in a match.{' '}
        <Link to="/">Return to Lobby?</Link>
      </p>
    )
  }
  return (
    <MultiplayerGameClient
      matchID={matchID}
      playerID={playerID}
      credentials={playerCredentials}
    />
  )
}
const DemoLocalGamePage = () => {
  return (
    <>
      <MultiplayerNav />
      <DemoLocalGameLinks />
    </>
  )
}
const MultiplayerLobbyPage = () => {
  return (
    <>
      <MultiplayerNav />
      <MultiplayerLobby />
    </>
  )
}
