import { lazy, Suspense } from 'react'
import { BoardProps } from 'boardgame.io/react'
import { ChatMessage } from 'boardgame.io'
import { useHotkeys } from 'react-hotkeys-hook'

import { GType } from '../game/hexxaform/hexxaform-types'
import { HexxaformContextProvider } from './useHexxaformContext'
import { EditorWorldWrapper } from './world/EditorWorldWrapper'
import HeaderNav from '../hexopolis-ui/layout/HeaderNav'
import { Layout } from '../hexopolis-ui/layout'
import { HexxaformControls } from './HexxaformControls'

const World = lazy(() =>
  import('../shared/World').then((module) => ({
    default: module.World,
  }))
)

type HexxaformBoardProps = BoardProps<GType> & {
  chatMessages?: ChatMessage[]
}

export function HexxaformBoard(props: HexxaformBoardProps) {
  const {
    // G
    G,
    // CTX
    // ctx,
    // MOVES
    moves,
    undo,
    redo,
    // EVENTS
    // events,
    // reset,
    // CHAT
    // sendChatMessage,
    // chatMessages = [],
    // ALSO ON BOARD PROPS
    // playerID,
    // log,
    // matchID,
    // matchData,
    // isActive,
    // isMultiplayer,
    // isConnected,
    // credentials,
  } = props
  useHotkeys('ctrl+z', () => undo())
  useHotkeys('ctrl+y', () => redo())
  return (
    <HexxaformContextProvider G={G}>
      <Layout playerID={''}>
        <HeaderNav
          linkProps={{
            isLocalOrDemoGame: false,
            localOrDemoGameNumPlayers: 0,
            playerID: '',
          }}
        />
        <EditorWorldWrapper>
          <Suspense fallback={<></>}>
            <World
              isEditor={true}
              boardHexes={G.boardHexes}
              hexMap={G.hexMap}
              hexxaformMoves={moves}
              glyphs={G.hexMap.glyphs}
            />
          </Suspense>
        </EditorWorldWrapper>
        <HexxaformControls
          boardHexes={G.boardHexes}
          hexMap={G.hexMap}
          moves={moves}
        />
      </Layout>
    </HexxaformContextProvider>
  )
}
