import { Helmet } from 'react-helmet'
import { Route, Link, Routes } from 'react-router-dom'
import { Layout } from '../hexopolis-ui/layout'
import HeaderNav from '../hexopolis-ui/layout/HeaderNav'
import localRoutes from './localRoutes'
import { ROUTES } from './routes'

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
            </Layout>
          }
        />
        {localRoutes()}
      </Routes>
    </>
  )
}

const DemoLocalGameLinks = () => (
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
