import { BoardProps } from 'boardgame.io/react'
import {
  MapContextProvider,
  PlacementContextProvider,
  PlayContextProvider,
} from './contexts'
import { Layout } from './layout'
import {
  BgioClientInfoProvider,
  BgioGProvider,
  BgioMovesProvider,
  BgioEventsProvider,
  BgioCtxProvider,
  BgioChatProvider,
} from '../bgio-contexts'
import { ChatMessage } from 'boardgame.io'
import { GameState } from '../game/types'
import { TabsComponent } from './controls/TabsComponent'
import { SpecialAttackContextProvider } from './contexts/special-attack-context'
import { specialMatchIdToTellHeaderNavThisMatchIsLocal } from '../app/environment'
import { World } from '../shared/World'
import { HexopolisWorldWrapper } from './world/HexopolisWorldWrapper'
import HeaderNav from './layout/HeaderNav'
import { ModalDisplay } from './layout/ModalDisplay'
import { modalStates, useUIContext } from '../hooks/ui-context'

export interface HexoscapeBoardProps extends BoardProps<GameState> {
  chatMessages: ChatMessage[]
}

export const Board = ({
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
  // TODO: implement the observer playerID
  // playerID = 'observer',
  playerID = '0',
  log,
  matchID,
  matchData,
  isActive,
  isMultiplayer,
  isConnected,
  credentials,
}: HexoscapeBoardProps) => {
  const { modalState } = useUIContext()
  const isLocalOrDemoGame = matchID.includes(
    specialMatchIdToTellHeaderNavThisMatchIsLocal
  )
  const localOrDemoGameNumPlayers = parseInt(matchID?.split(':')?.[1])
  return (
    <div className="board-wrapper">
      {modalState !== modalStates.off && <ModalDisplay />}
      {/* BGIO CONTEXT BELOW */}
      <BgioClientInfoProvider
        isLocalOrDemoGame={isLocalOrDemoGame}
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
          <BgioCtxProvider isLocalOrDemoGame={isLocalOrDemoGame} ctx={ctx}>
            <BgioMovesProvider moves={moves} undo={undo} redo={redo}>
              <BgioEventsProvider reset={reset} events={events}>
                <BgioChatProvider
                  chatMessages={chatMessages}
                  sendChatMessage={sendChatMessage}
                >
                  {/* GAME CONTEXT BELOW */}
                  <MapContextProvider>
                    {/* Placement Context is consumed by Play Context  */}
                    <PlacementContextProvider>
                      <PlayContextProvider>
                        <SpecialAttackContextProvider>
                          <Layout playerID={playerID}>
                            <HeaderNav
                              linkProps={{
                                isLocalOrDemoGame,
                                localOrDemoGameNumPlayers,
                                playerID: playerID,
                              }}
                            />
                            <HexopolisWorldWrapper>
                              <World
                                boardHexes={G.boardHexes}
                                hexxaformMoves={undefined}
                                hexMap={G.hexMap}
                                glyphs={G.hexMap.glyphs}
                              />
                            </HexopolisWorldWrapper>
                            <TabsComponent />
                          </Layout>
                        </SpecialAttackContextProvider>
                      </PlayContextProvider>
                    </PlacementContextProvider>
                  </MapContextProvider>
                </BgioChatProvider>
              </BgioEventsProvider>
            </BgioMovesProvider>
          </BgioCtxProvider>
        </BgioGProvider>
      </BgioClientInfoProvider>
    </div>
  )
}
