import { BoardProps } from 'boardgame.io/react'
import { ChatMessage } from 'boardgame.io'
import {
  BgioChatProvider,
  BgioClientInfoProvider,
  BgioCtxProvider,
  BgioEventsProvider,
  BgioGProvider,
  BgioMovesProvider,
} from '../bgio-contexts'
import { GType } from '../game/hexxaform/types'

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
    <BgioClientInfoProvider
      isLocalOrDemoGame={true}
      log={log}
      playerID={playerID || ''}
      matchID={matchID}
      matchData={matchData}
      credentials={credentials || ''}
      isMultiplayer={isMultiplayer}
      isConnected={isConnected}
      isActive={isActive}
    >
      <BgioGProvider G={G}>
        <BgioCtxProvider isLocalOrDemoGame={true} ctx={ctx}>
          <BgioMovesProvider moves={moves} undo={undo} redo={redo}>
            <BgioEventsProvider reset={reset} events={events}>
              <BgioChatProvider
                chatMessages={chatMessages}
                sendChatMessage={sendChatMessage}
              >
                {/* <HexxaformUI mapSize={G.hexMap.mapSize} /> */}
              </BgioChatProvider>
            </BgioEventsProvider>
          </BgioMovesProvider>
        </BgioCtxProvider>
      </BgioGProvider>
    </BgioClientInfoProvider>
  )
}
