import { BoardHexes, HexMap } from '../types'

export type GType = {
  hexMap: HexMap
  boardHexes: BoardHexes
}
export type HexxaformMoves = any

export type BgioProps = {
  boardHexes: BoardHexes
  hexMap: HexMap
  moves?: any
}
export enum PenMode {
  none = 'none',
  eraser = 'empty',
  eraserStartZone = 'eraserStartZone',
  water = 'water',
  grass = 'grass',
  sand = 'sand',
  rock = 'rock',
  startZone0 = 'startZone0',
  startZone1 = 'startZone1',
  startZone2 = 'startZone2',
  // startZone3 = 'startZone3',
  // startZone4 = 'startZone4',
  // startZone5 = 'startZone5',
}
export type VirtualScapeTile = {
  type: number
  version: number
  rotation: number
  posX: number
  posY: number
  posZ: number
  glyphLetter: string
  glyphName: string
  startName: string
  colorf: number
}
