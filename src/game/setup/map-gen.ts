import { translateHexagonBoardHexesToNormal } from './hex-gen'
import {
  BoardHexes,
  GameMap,
  GameUnits,
  HexTerrain,
  StartZones,
} from '../types'
import { giantsTable } from './maps/giantsTable'
import { forsakenWaters } from './maps/forsakenWaters'
import { transformBoardHexesWithPrePlacedUnits } from '../transformers'
import { cirdanGardenMap } from './maps/cirdanGarden'

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
  deleteEmptyHexesFromBoardHexes(boardHexes)
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
  deleteEmptyHexesFromBoardHexes(boardHexes)
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
export const getStartZonesFromBoardHexes = (
  boardHexes: BoardHexes
): StartZones => {
  const result: StartZones = {}
  deleteEmptyHexesFromBoardHexes(boardHexes)
  return result
}

const deleteEmptyHexesFromBoardHexes = (boardHexes: BoardHexes) => {
  for (const hex in boardHexes) {
    if (Object.prototype.hasOwnProperty.call(boardHexes, hex)) {
      const element = boardHexes[hex]
      if (element.terrain === HexTerrain.empty) {
        delete boardHexes[hex]
      }
    }
  }
}