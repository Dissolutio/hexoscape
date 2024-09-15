import { BoardProps } from 'boardgame.io/react'
import { ChatMessage } from 'boardgame.io'
import { GType } from '../game/hexxaform/types'
import { HexxaformLayout } from './HexxaformLayout'
import { HexxaformControls } from './HexxaformControls'
import { MapContextProvider } from './useMapContext'
import { EditorWorldWrapper } from './world/EditorWorldWrapper'
import { World } from '../shared/World'

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
      <HexxaformLayout>
        <EditorWorldWrapper>
          <World
            isEditor={true}
            boardHexes={G.boardHexes}
            hexMap={G.hexMap}
            glyphs={G.hexMap.glyphs}
          />
        </EditorWorldWrapper>
        <HexxaformControls
          moves={moves}
          boardHexes={G.boardHexes}
          hexMap={G.hexMap}
        />
      </HexxaformLayout>
    </MapContextProvider>
  )
}
