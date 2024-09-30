import { Route, Link, Routes } from 'react-router-dom'
import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import { Helmet } from 'react-helmet'
import { Hexoscape } from '../game/game'
import { Hexxaform } from '../game/hexxaform/hexxaform-game'
import { Board } from '../hexopolis-ui/Board'
import { specialMatchIdToTellHeaderNavThisMatchIsLocal } from './environment'
import { HexxaformBoard } from '../hexxaform-ui/HexxaformBoard'
import BottomNav from './BottomNav'
import { Layout } from '../hexopolis-ui/layout'
import HeaderNav from '../hexopolis-ui/layout/HeaderNav'
import { ROUTES } from './routes'

const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()

export const LocalApp = () => {
  return (
    <>
      <Helmet>
        <title>Hexoscape - Local - Home</title>
      </Helmet>
      <Routes>
        <Route
          path={ROUTES.home}
          element={
            <Layout playerID={''}>
              <HeaderNav
                linkProps={{
                  isLocalOrDemoGame: false,
                  localOrDemoGameNumPlayers: 0,
                  playerID: '',
                }}
              />
              <DemoLocalGameLinks />
              <BottomNav />
            </Layout>
          }
        />
        {localRoutes()}
      </Routes>
    </>
  )
}
export const localRoutes = () => (
  <>
    {/* Route local1 is special, it's the Map Editor */}
    <Route
      path={ROUTES.mapEditor}
      element={<LocalDemoClients numPlayers={1} />}
    />
    {/* The rest of the routes are for the local-multiplayer games */}
    <Route path={ROUTES.local2} element={<LocalDemoClients numPlayers={2} />} />
    <Route path={ROUTES.local3} element={<LocalDemoClients numPlayers={3} />} />
  </>
)
export const DemoLocalGameLinks = () => (
  /* 
    Used to have a problem of shared/corrupted state between local games (if you clicked to one then backed up and tried another).
    Was fixed temporarily by using `reloadDocument` prop on <Link>.
    Was hopefully fixed permanently by fixing some state mutation in map setup.
   */
  <>
    <ul>
      <li>
        <Link to={ROUTES.mapEditor}>Map Editor</Link>
      </li>
      <li>
        <Link to={ROUTES.local2}>2-Player Game</Link>
      </li>
      <li>
        <Link to={ROUTES.local3}>3-Player Game</Link>
      </li>
    </ul>
  </>
)

const hexoscapeLocalClientParams = {
  game: Hexoscape,
  board: Board,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  // debug: { impl: Debug },
  debug: false,
}
const Local1PlayerMapEditorClient = Client({
  game: Hexxaform,
  board: HexxaformBoard,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  // debug: { impl: Debug },
  debug: false,
  numPlayers: 1,
})
const Local2PlayerClient = Client({
  ...hexoscapeLocalClientParams,
  numPlayers: 2,
})
const Local3PlayerClient = Client({
  ...hexoscapeLocalClientParams,
  numPlayers: 3,
})
const LocalDemoClients = ({ numPlayers }: { numPlayers: number }) => {
  const matchID = `${specialMatchIdToTellHeaderNavThisMatchIsLocal}:${numPlayers}`
  if (numPlayers === 1)
    return (
      <>
        <Helmet>
          <title>Hexoscape - Map Editor</title>
        </Helmet>
        <Local1PlayerMapEditorClient playerID={'0'} matchID={matchID} />
      </>
    )
  if (numPlayers === 2)
    return (
      <>
        <Helmet>
          <title>Hexoscape - Local - 2 Player</title>
        </Helmet>
        <Local2PlayerClient playerID={'0'} matchID={matchID} />
        <Local2PlayerClient playerID={'1'} matchID={matchID} />
      </>
    )
  if (numPlayers === 3)
    return (
      <>
        <Helmet>
          <title>Hexoscape - Local - 3 Player</title>
        </Helmet>
        <Local3PlayerClient playerID={'0'} matchID={matchID} />
        <Local3PlayerClient playerID={'1'} matchID={matchID} />
        <Local3PlayerClient playerID={'2'} matchID={matchID} />
      </>
    )
  return null
}
