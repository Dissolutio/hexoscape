import { Route, Link, Routes } from 'react-router-dom'
import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Helmet } from 'react-helmet'
import { BgioLobbyApiProvider } from '../bgio-contexts'
import { AuthProvider, useAuth } from '../hooks/useAuth'
import { MultiplayerLobby, MultiplayerLobbyProvider } from '../lobby'
import { MultiplayerNav } from './MultiplayerNav'
import { Hexoscape } from '../game/game'
import { isLocalApp, SERVER } from './environment'
import { Board } from '../hexopolis-ui/Board'
import { LocalApp } from './LocalApp'
import { Layout } from '../hexopolis-ui/layout'
import HeaderNav from '../hexopolis-ui/layout/HeaderNav'
import { ROUTES } from './routes'
import localRoutes from './localRoutes'

const MultiplayerGameClient = Client({
  game: Hexoscape,
  board: Board,
  numPlayers: 2,
  multiplayer: SocketIO({ server: SERVER }),
  debug: false,
})

export const App = () => {
  if (isLocalApp) {
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
        <Link to={ROUTES.home}>Return to Lobby?</Link>
      </p>
    )
  }
  return (
    <>
      <Helmet>
        <title>Hexoscape - Play</title>
      </Helmet>
      <MultiplayerGameClient
        matchID={matchID}
        playerID={playerID}
        credentials={playerCredentials}
      />
    </>
  )
}

const MultiplayerLobbyPage = () => {
  return (
    <>
      <Helmet>
        <title>Hexoscape - Lobby</title>
      </Helmet>
      <Layout playerID={''}>
        <HeaderNav
          linkProps={{
            isLocalOrDemoGame: false,
            localOrDemoGameNumPlayers: 0,
            playerID: '',
          }}
        />
        <MultiplayerLobby />
        <MultiplayerNav />
      </Layout>
    </>
  )
}
