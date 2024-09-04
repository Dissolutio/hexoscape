import React from 'react'
import { BoardProps } from 'boardgame.io/react'
import { ChatMessage } from 'boardgame.io'
import { GType } from '../game/hexxaform/types'
import { HexxaformLayout } from './HexxaformLayout'
import { HexxaformControls } from './HexxaformControls'
import { MapContextProvider } from './useMapContext'

// import { GType } from "./game/types";

type MyBoardProps = BoardProps<GType> & { chatMessages?: ChatMessage[] }

export function HexxaformBoard(props: MyBoardProps) {
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
        <div></div>
        <HexxaformControls
          moves={moves}
          boardHexes={G.boardHexes}
          hexMap={G.hexMap}
        />
      </HexxaformLayout>
    </MapContextProvider>
  )
}
