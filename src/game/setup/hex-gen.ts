import { BoardHexes, HexCoordinates, HexTerrain } from '../types'
import { generateHexID } from '../constants'
import { generateHexagonHexas, generateRectangleHexas } from '../hex-utils'

export const generateHexagon = (mapSize: number): BoardHexes => {
  const hexgridHexes = generateHexagonHexas(mapSize)
  // in order to keep our hex grid within the same quadrant of the XY plane, we need to move it "to the right and down" according to the map size
  const translatedHexes = hexgridHexes.map((hex: HexCoordinates) => {
    return {
      ...hex,
      q: hex.q + mapSize,
      r: hex.r + mapSize,
    }
  })
  const boardHexes = hexesToBoardHexes(translatedHexes)
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
        terrain: HexTerrain.grass,
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
export function generateRectangle(mapWidth: number, mapHeight: number): BoardHexes {
  // why do i have +1 here?
  // const hexgridHexes = generateRectangleHexas(mapSize + 1, mapSize + 1)
  const hexgridHexes = generateRectangleHexas(mapWidth, mapHeight)
  const boardHexes = hexesToBoardHexes(hexgridHexes)
  return boardHexes
}

// function generateOrientedRectangle(mapSize: number): BoardHexes {
//   const hexgridHexes = generateOrientedRectangleHexas(mapSize, mapSize)
//   const boardHexes = hexesToBoardHexes(hexgridHexes)
//   return boardHexes
// }
// function generateParallelogram(mapSize: number): BoardHexes {
//   const hexgridHexes = generateParalellogramHexas(
//     -mapSize - 2,
//     mapSize + 2,
//     -mapSize,
//     mapSize
//   )
//   const boardHexes = hexesToBoardHexes(hexgridHexes)
//   return boardHexes
// }
