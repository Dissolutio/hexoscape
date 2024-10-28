import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import { Hexxaform } from '../game/hexxaform/hexxaform-game'
import { HexxaformBoard } from '../hexxaform-ui/HexxaformBoard'

const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()

const Local1PlayerMapEditorClient = Client({
  game: Hexxaform,
  board: HexxaformBoard,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  // debug: { impl: Debug },
  debug: false,
  numPlayers: 1,
})
const MapEditorBgioClient = () => {
  return <Local1PlayerMapEditorClient playerID={'0'} />
}
export default MapEditorBgioClient
