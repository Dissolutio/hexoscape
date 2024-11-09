import { generateHexagon, translateHexagonBoardHexesToNormal } from './hex-gen'
import {
  BoardHexes,
  GameMap,
  GameUnits,
  HexTerrain,
  MapOptions,
  StartZones,
} from '../types'
import { giantsTable } from './maps/giantsTable'
import { forsakenWaters } from './maps/forsakenWaters'
import { selectHexNeighbors } from '../selectors'
import { transformBoardHexesWithPrePlacedUnits } from '../transformers'
import { cirdanGardenMap } from './maps/cirdanGarden'

function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart: string | number = (Math.random() * 46656) | 0
  let secondPart: string | number = (Math.random() * 46656) | 0
  firstPart = ('000' + firstPart.toString(36)).slice(-3)
  secondPart = ('000' + secondPart.toString(36)).slice(-3)
  return firstPart + secondPart
}
export function makeForsakenWatersMap(
  withPrePlacedUnits?: boolean,
  gameUnitsToPrePlace?: GameUnits
): GameMap {
  const boardHexes = forsakenWaters.boardHexes as unknown as BoardHexes
  if (!boardHexes) {
    throw new Error('forsakenWaters.boardHexes is not defined')
  }
  for (const hex in boardHexes) {
    if (Object.prototype.hasOwnProperty.call(boardHexes, hex)) {
      const element = boardHexes[hex]
      if (element.terrain === HexTerrain.empty) {
        delete boardHexes[hex]
      }
    }
  }
  const startZones = getStartZonesFromBoardHexes(boardHexes)
  if (withPrePlacedUnits) {
    transformBoardHexesWithPrePlacedUnits(
      boardHexes,
      startZones,
      gameUnitsToPrePlace ?? {}
    )
  }
  return {
    boardHexes: forsakenWaters.boardHexes as unknown as BoardHexes,
    hexMap: forsakenWaters.hexMap,
    startZones: getStartZonesFromBoardHexes(boardHexes),
  }
}
export function makeCirdanGardenMap(
  withPrePlacedUnits?: boolean,
  gameUnitsToPrePlace?: GameUnits
): GameMap {
  const preNormalizedBoardHexes =
    cirdanGardenMap.boardHexes as unknown as BoardHexes
  if (!preNormalizedBoardHexes) {
    throw new Error('cirdanGardenMap.boardHexes is not defined')
  }
  const boardHexes = translateHexagonBoardHexesToNormal(
    preNormalizedBoardHexes,
    cirdanGardenMap.hexMap.size
  )
  for (const hex in boardHexes) {
    if (Object.prototype.hasOwnProperty.call(boardHexes, hex)) {
      const element = boardHexes[hex]
      if (element.terrain === HexTerrain.empty) {
        delete boardHexes[hex]
      }
    }
  }
  const startZones = getStartZonesFromBoardHexes(boardHexes)
  if (withPrePlacedUnits) {
    transformBoardHexesWithPrePlacedUnits(
      boardHexes,
      startZones,
      gameUnitsToPrePlace ?? {}
    )
  }
  return {
    boardHexes,
    hexMap: cirdanGardenMap.hexMap,
    startZones: getStartZonesFromBoardHexes(boardHexes),
  }
}
export function makeGiantsTableMap({
  withPrePlacedUnits,
  gameUnitsToPrePlace,
}: {
  withPrePlacedUnits?: boolean
  gameUnitsToPrePlace: GameUnits
}): GameMap {
  const boardHexes = giantsTable.boardHexes as unknown as BoardHexes
  if (!boardHexes) {
    throw new Error('giantsTable.boardHexes is not defined')
  }
  for (const hex in boardHexes) {
    if (Object.prototype.hasOwnProperty.call(boardHexes, hex)) {
      const element = boardHexes[hex]
      if (element.terrain === HexTerrain.empty) {
        delete boardHexes[hex]
      }
    }
  }
  const startZones = getStartZonesFromBoardHexes(boardHexes)
  if (withPrePlacedUnits) {
    transformBoardHexesWithPrePlacedUnits(
      boardHexes,
      startZones,
      gameUnitsToPrePlace ?? {}
    )
  }
  return {
    boardHexes: giantsTable.boardHexes as unknown as BoardHexes,
    hexMap: giantsTable.hexMap,
    startZones: getStartZonesFromBoardHexes(boardHexes),
  }
}
export function makeHexagonShapedMap(mapOptions?: MapOptions): GameMap {
  const size = mapOptions?.mapSize ?? 3
  const withPrePlacedUnits = mapOptions?.withPrePlacedUnits ?? false
  const gameUnits = mapOptions?.gameUnits ?? {}

  const boardHexes: BoardHexes = transformBoardHexesToHaveStartZones(
    generateHexagon(size),
    size
  )
  const startZones = getStartZonesFromBoardHexes(boardHexes)
  const boardHexesWithPrePlacedUnits: BoardHexes =
    transformBoardHexesWithPrePlacedUnits(boardHexes, startZones, gameUnits)
  return {
    boardHexes: withPrePlacedUnits ? boardHexesWithPrePlacedUnits : boardHexes,
    startZones,
    hexMap: {
      id: generateUID(),
      shape: 'hexagon',
      name: 'The Big Hexagon',
      size,
      glyphs: {},
    },
  }
}

const transformBoardHexesToHaveStartZones = (
  boardHexes: BoardHexes,
  mapSize: number
): BoardHexes => {
  const maxSpreadToAvoidOverlapping = Math.floor(mapSize / 2)
  const startZones: {
    [key: string]: string[]
  } = {
    '0': [`0,-${mapSize},${mapSize}`],
    '1': [`0,${mapSize},-${mapSize}`],
    '2': [`-${mapSize},0,${mapSize}`],
    '3': [`${mapSize},0,-${mapSize}`],
    '4': [`-${mapSize},${mapSize},0`],
    '5': [`${mapSize},-${mapSize},0`],
  }
  for (let index = 0; index < maxSpreadToAvoidOverlapping; index++) {
    Object.entries(startZones).forEach(([playerID, hexIDArr]) => {
      const newHexes = hexIDArr.flatMap((hexID) => {
        return selectHexNeighbors(hexID, boardHexes).map((h) => h.id)
      })
      startZones[playerID] = [...startZones[playerID], ...newHexes]
    })
  }
  return Object.entries(boardHexes).reduce((acc: BoardHexes, [hexID, hex]) => {
    const startzonePlayerIDs = Object.entries(startZones).reduce(
      (acc: string[], [playerID, hexIDs]) => {
        if (hexIDs?.includes(hexID)) {
          return [...acc, playerID]
        } else {
          return acc
        }
      },
      []
    )
    return {
      ...acc,
      [hexID]: {
        ...hex,
        startzonePlayerIDs,
      },
    }
  }, {})
}
export const getStartZonesFromBoardHexes = (
  boardHexes: BoardHexes
): StartZones => {
  const result: StartZones = {}
  for (const boardHex in boardHexes) {
    if (Object.prototype.hasOwnProperty.call(boardHexes, boardHex)) {
      boardHexes[boardHex].startzonePlayerIDs.forEach((id) => {
        result[id] = [...(result?.[id] ?? []), boardHexes[boardHex].id]
      })
    }
  }
  return result
}
