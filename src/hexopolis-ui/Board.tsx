import { ThemeProvider } from 'styled-components'
import { BoardProps } from 'boardgame.io/react'
import {
  MapContextProvider,
  UIContextProvider,
  PlacementContextProvider,
  PlayContextProvider,
} from './contexts'
import { Layout, HeaderNav } from './layout'
import { theme } from './theme'
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
import { specialMatchIdToTellHeaderNavThisMatchIsLocal } from '../app/constants'
import { World } from './world/World'
import { HexopolisWorldWrapper } from './world/HexopolisWorldWrapper'

interface MyGameProps extends BoardProps<GameState> {
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
}: MyGameProps) => {
  const isLocalOrDemoGame = matchID.includes(
    specialMatchIdToTellHeaderNavThisMatchIsLocal
  )
  const localOrDemoGameNumPlayers = parseInt(matchID.split(':')[1])
  return (
    <>
      <ThemeProvider theme={theme(playerID ?? '')}>
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
                      {/* UI Context is consumed by PlacementContext and PlayContext */}
                      <UIContextProvider>
                        {/* Placement Context is consumed by Play Context  */}
                        <PlacementContextProvider>
                          <PlayContextProvider>
                            <SpecialAttackContextProvider>
                              <Layout>
                                <HeaderNav
                                  isLocalOrDemoGame={isLocalOrDemoGame}
                                  localOrDemoGameNumPlayers={
                                    localOrDemoGameNumPlayers
                                  }
                                  playerID={playerID ?? '0'}
                                />
                                <HexopolisWorldWrapper>
                                  <World boardHexes={G.boardHexes} />
                                </HexopolisWorldWrapper>
                                <TabsComponent />
                              </Layout>
                            </SpecialAttackContextProvider>
                          </PlayContextProvider>
                        </PlacementContextProvider>
                      </UIContextProvider>
                    </MapContextProvider>
                  </BgioChatProvider>
                </BgioEventsProvider>
              </BgioMovesProvider>
            </BgioCtxProvider>
          </BgioGProvider>
        </BgioClientInfoProvider>
      </ThemeProvider>
    </>
  )
}
