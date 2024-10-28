/* eslint-disable react-refresh/only-export-components */
import { Route } from 'react-router-dom'
import { ROUTES } from './routes'
import { Helmet } from 'react-helmet'

import { generateLocalMatchID } from './environment'
import { lazy, Suspense } from 'react'
// Dynamic imports
const Local2PlayerClient = lazy(() =>
  // named export
  import('./HexoscapeBgioLocalClient').then((module) => ({
    default: module.Local2PlayerClient,
  }))
)
const Local3PlayerClient = lazy(() =>
  // named export
  import('./HexoscapeBgioLocalClient').then((module) => ({
    default: module.Local3PlayerClient,
  }))
)
const MapEditorBgioClient = lazy(() => import('./MapEditorBgioClient')) // default export

const localRoutes = () => (
  <>
    <Route
      path={ROUTES.mapEditor}
      element={
        <>
          <Helmet>
            <title>Hexoscape - Map Editor</title>
          </Helmet>
          <Suspense fallback={<div>Loading...</div>}>
            <MapEditorBgioClient />
          </Suspense>
        </>
      }
    />
    <Route
      path={ROUTES.local2}
      element={
        <>
          <Helmet>
            <title>Hexoscape - Local - 2 Player</title>
          </Helmet>
          <Suspense fallback={<div>Loading...</div>}>
            <Local2PlayerClient
              playerID={'0'}
              matchID={generateLocalMatchID(2)}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Local2PlayerClient
              playerID={'1'}
              matchID={generateLocalMatchID(2)}
            />
          </Suspense>
        </>
      }
    />
    <Route
      path={ROUTES.local3}
      element={
        <>
          <Helmet>
            <title>Hexoscape - Local - 3 Player</title>
          </Helmet>
          <Suspense fallback={<div>Loading...</div>}>
            <Local3PlayerClient
              playerID={'0'}
              matchID={generateLocalMatchID(3)}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Local3PlayerClient
              playerID={'1'}
              matchID={generateLocalMatchID(3)}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Local3PlayerClient
              playerID={'2'}
              matchID={generateLocalMatchID(3)}
            />
          </Suspense>
        </>
      }
    />
  </>
)
export default localRoutes
