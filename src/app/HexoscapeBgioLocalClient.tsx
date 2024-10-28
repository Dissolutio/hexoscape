import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import { Hexoscape } from '../game/game'
import {
  Board,
  HexoscapeBoardProps as _HexoscapeBoardProps, // To avoid: "but cannot be named.ts(4023)"
} from '../hexopolis-ui/Board'

const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()

const hexoscapeLocalClientParams = {
  game: Hexoscape,
  board: Board,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  // debug: { impl: Debug },
  debug: false,
}
export const Local2PlayerClient = Client({
  ...hexoscapeLocalClientParams,
  numPlayers: 2,
})
export const Local3PlayerClient = Client({
  ...hexoscapeLocalClientParams,
  numPlayers: 3,
})
