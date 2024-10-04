import { BoardProps } from 'boardgame.io/react'
import { ChatMessage } from 'boardgame.io'
import { GType } from '../game/hexxaform/hexxaform-types'
import { MapContextProvider } from './useMapContext'
import { EditorWorldWrapper } from './world/EditorWorldWrapper'
import { World } from '../shared/World'
import HeaderNav from '../hexopolis-ui/layout/HeaderNav'
import { Layout } from '../hexopolis-ui/layout'

type HexxaformBoardProps = BoardProps<GType> & {
  chatMessages?: ChatMessage[]
}

export function HexxaformBoard(props: HexxaformBoardProps) {
  const {
    // G
    G,
    // CTX
    ctx,
    // MOVES
    moves,
    undo,
    redo,
    // EVENTS
    events,
    reset,
    // CHAT
    sendChatMessage,
    chatMessages = [],
    // ALSO ON BOARD PROPS
    playerID,
    log,
    matchID,
    matchData,
    isActive,
    isMultiplayer,
    isConnected,
    credentials,
  } = props
  return (
    <MapContextProvider>
      <Layout playerID={''}>
        <HeaderNav
          linkProps={{
            isLocalOrDemoGame: false,
            localOrDemoGameNumPlayers: 0,
            playerID: '',
          }}
        />
        <EditorWorldWrapper>
          <World
            isEditor={true}
            boardHexes={G.boardHexes}
            hexMap={G.hexMap}
            glyphs={G.hexMap.glyphs}
          />
        </EditorWorldWrapper>
      </Layout>
    </MapContextProvider>
  )
}
