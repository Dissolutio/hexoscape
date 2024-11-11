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

export type VirtualScapeMap = {
  version: number
  name: string
  author: string
  playerNumber: string
  scenario: string
  levelPerPage: number
  printingTransparency: number
  printingGrid: boolean
  printTileNumber: boolean
  printStartAreaAsLevel: boolean
  tileCount: number
  tiles: VirtualScapeTile[]
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
  isFigureTile: boolean
  figure: {
    name: string
    name2: string
  },
  isPersonalTile: boolean
  personal: {
    pieceSize: number
    textureTop: string
    textureSide: string
    letter: string
    name: string
  },
}