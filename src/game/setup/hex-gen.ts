import { BoardHex, BoardHexes, HexCoordinates, HexTerrain } from '../types'
import { generateHexID } from '../constants'
import { generateHexagonHexas, generateRectangleHexas } from '../hex-utils'

export const generateHexagon = (mapSize: number): BoardHexes => {
  const hexgridHexes = generateHexagonHexas(mapSize)
  // in order to keep our hex grid within the same quadrant of the XY plane, we need to move it "to the right and down" according to the map size
  const boardHexes = hexesToBoardHexes(
    translateHexagonHexesToNormal(hexgridHexes, mapSize)
  )
  return boardHexes
}

/* 
  translateHexagonHexesToNormal
  translateHexagonBoardHexesToNormal
    These functions normalize a hexagon map that is centered around (0,0), to one that stays in the same XY quadrant as rectangular maps. 
    (Moves it "to the right and down" according to the map size)
    DOWNSIDE: It causes decimal values for q if the map size is odd
*/
const qAdjust = 2 // why does dividing by 2 work?
const translateHexagonHexesToNormal = (
  hexes: HexCoordinates[],
  mapSize: number
): HexCoordinates[] => {
  return hexes.map((hex: HexCoordinates) => {
    return {
      ...hex,
      q: hex.q + mapSize / qAdjust,
      r: hex.r + mapSize,
    }
  })
}
export const translateHexagonBoardHexesToNormal = (
  boardhexes: BoardHexes,
  mapSize: number
): BoardHexes => {
  const hexArray = Object.values(boardhexes)
  return hexArray.reduce((prev: BoardHexes, curr: BoardHex) => {
    const q = curr.q + mapSize / qAdjust
    const r = curr.r + mapSize
    const newID = generateHexID({ q, r, s: curr.s })
    prev[newID] = {
      ...curr,
      id: newID,
      q,
      r,
    }
    return prev
  }, {} as BoardHexes)
}
export const generateRectangle = (
  mapWidth: number,
  mapHeight: number
): BoardHexes => {
  const hexgridHexes = generateRectangleHexas(mapWidth, mapHeight)
  const boardHexes = hexesToBoardHexes(hexgridHexes)
  return boardHexes
}

function hexesToBoardHexes(hexgridHexes: HexCoordinates[]): BoardHexes {
  return hexgridHexes.reduce(
    (prev: BoardHexes, curr: HexCoordinates): BoardHexes => {
      const boardHex = {
        ...curr,
        id: generateHexID(curr),
        occupyingUnitID: '',
        isUnitTail: false,
        altitude: 1,
        terrain: HexTerrain.void,
        startzonePlayerIDs: [],
      }
      return {
        ...prev,
        [boardHex.id]: boardHex,
      }
    },
    {}
  )
}
