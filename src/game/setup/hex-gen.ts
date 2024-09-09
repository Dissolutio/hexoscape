import { BoardHexes, HexCoordinates, HexTerrain } from '../types'
import { generateHexID } from '../constants'
import { generateHexagonHexas, generateRectangleHexas } from '../hex-utils'

export const generateHexagon = (mapSize: number): BoardHexes => {
  const hexgridHexes = generateHexagonHexas(mapSize)
  // in order to keep our hex grid within the same quadrant of the XY plane, we need to move it "to the right and down" according to the map size
  const translatedHexes = hexgridHexes.map((hex: HexCoordinates) => {
    return {
      ...hex,
      q: hex.q + mapSize / 2, // why does dividing by 2 work?
      r: hex.r + mapSize,
    }
  })
  const boardHexes = hexesToBoardHexes(translatedHexes)
  return boardHexes
}
export const generateRectangle = (mapWidth: number, mapHeight: number): BoardHexes => {
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

