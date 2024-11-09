import {
  HEXGRID_HEX_APOTHEM,
  HEXGRID_HEX_RADIUS,
  HEXGRID_SPACING,
} from './constants'
import {
  BoardHex,
  BoardHexes,
  HexCoordinates,
  HexNeighborsWithDirections,
} from './types'

const DIRECTIONS: HexCoordinates[] = [
  { q: 1, r: -1, s: 0 }, // NE +q -r
  { q: 1, r: 0, s: -1 }, // E +q -s
  { q: 0, r: 1, s: -1 }, // SE +r -s
  { q: -1, r: 1, s: 0 }, // SW -q +r
  { q: -1, r: 0, s: 1 }, // W -q +s
  { q: 0, r: -1, s: 1 }, // NW -r +s
]
export const hexUtilsAdd = (
  a: HexCoordinates,
  b: HexCoordinates
): HexCoordinates => {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s }
}
const hexUtilsSubtract = (
  a: HexCoordinates,
  b: HexCoordinates
): HexCoordinates => {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s }
}
const hexUtilsLengths = (hex: HexCoordinates): number => {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2
}
export const hexUtilsDistance = (
  a: HexCoordinates,
  b: HexCoordinates
): number => {
  return hexUtilsLengths(hexUtilsSubtract(a, b))
}
const hexUtilsDirection = (direction: number): HexCoordinates => {
  return DIRECTIONS[(6 + (direction % 6)) % 6]
}
export const hexUtilsNeighbor = (
  hex: HexCoordinates,
  direction: number
): HexCoordinates => {
  return hexUtilsAdd(hex, hexUtilsDirection(direction))
}
export const hexUtilsNeighbors = (hex: HexCoordinates): HexCoordinates[] => {
  const array: HexCoordinates[] = []
  for (let i = 0; i < DIRECTIONS.length; i += 1) {
    array.push(hexUtilsNeighbor(hex, i))
  }
  return array
}
export const hexUtilsNeighborsWithDirections = (
  hex: HexCoordinates
): HexNeighborsWithDirections => {
  const obj: HexNeighborsWithDirections = {}
  for (let i = 0; i < DIRECTIONS.length; i += 1) {
    const hexNeighbor = hexUtilsNeighbor(hex, i)
    const id = hexUtilsGetID(hexNeighbor)
    obj[id] = i
  }
  return obj
}
export const cubeToPixel = (hex: HexCoordinates) => {
  const x =
    HEXGRID_HEX_RADIUS * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r)
  const y = HEXGRID_HEX_RADIUS * ((3 / 2) * hex.r)
  return { x: x, y: y }
}
export const getBoardHex3DCoords = (hex: BoardHex) => {
  const { x, y } = cubeToPixel(hex)
  // DEV NOTE: THIS IS WHERE WE SWITCH Y AND Z (And I am not 100% certain I did it to maintain "y" as altitude, I may have just goofed up and covered it up with this)
  // I think I did it so that in our quadrant, all axes are positive in handy directions

  // ALSO: We scootch the map to the right one apothem so that X=0 aligns with the left edge of hexes, not the center. This makes width calculation easier, keeps things neat
  // ALSO: We scootch the map down one radius so that Y=0 aligns with the top edge of hexes, not the center. This makes height calculation easier, keeps things neat

  return {
    x: (x + HEXGRID_HEX_APOTHEM) * HEXGRID_SPACING,
    z: (y + HEXGRID_HEX_RADIUS) * HEXGRID_SPACING,
  }
}
function hexUtilsRotateVector(
  v: HexCoordinates,
  rotation: number
): HexCoordinates {
  switch (rotation % 6) {
    case 1:
    case -5:
      return {
        q: -v.r,
        r: -v.s,
        s: -v.q,
      }
    case 2:
    case -4:
      return {
        q: v.s,
        r: v.q,
        s: v.r,
      }
    case 3:
    case -3:
      return {
        q: -v.q,
        r: -v.r,
        s: -v.s,
      }
    case 4:
    case -2:
      return {
        q: v.r,
        r: v.s,
        s: v.q,
      }
    case 5:
    case -1:
      return {
        q: -v.s,
        r: -v.q,
        s: -v.r,
      }
    case 0:
    default:
      return v
  }
}
/* hexUtilsRotate: not this does not update the IDS of boardHexes */
export function hexUtilsRotate<T extends HexCoordinates>(
  h: T,
  origin: T,
  rotation: number
): T {
  const vector = hexUtilsSubtract(h, origin)
  const rotatedVector = hexUtilsRotateVector(vector, rotation)
  return {
    ...h,
    ...hexUtilsAdd(rotatedVector, origin),
  }
}
export const getDirectionOfNeighbor = (
  hexStart: HexCoordinates,
  neighbor: HexCoordinates
) => {
  const diff = hexUtilsSubtract(hexStart, neighbor)
  const matchedDir = DIRECTIONS.findIndex(
    (d) => d.q === diff.q && d.r === diff.r && d.s === diff.s
  )
  if (matchedDir === -1) return undefined
  if (matchedDir === 1) return 0 // east, E, the base facing of 3d models
  if (matchedDir === 0) return 1 // NE
  if (matchedDir === 5) return 2 // NW
  if (matchedDir === 4) return 3 // W
  if (matchedDir === 3) return 4 // SW
  if (matchedDir === 2) return 5 // SE
}

/** Return a string ID from Hex Coordinates.
 * Example: Hex Coordinates of {q: 1, r: 2, s: 3} is returned
 * as string "1,2,3"
 * @param {HexCoordinates} hex - target Hex
 * @returns {string} an ID string in the form `{q},{r},{s}`
 */
const hexUtilsGetID = (hex: HexCoordinates): string => {
  return `${hex.q},${hex.r},${hex.s}`
}
export const generateHexagonHexas = (mapRadius: number): HexCoordinates[] => {
  const hexas: HexCoordinates[] = []
  for (let q = -mapRadius; q <= mapRadius; q++) {
    const r1 = Math.max(-mapRadius, -q - mapRadius)
    const r2 = Math.min(mapRadius, -q + mapRadius)
    for (let r = r1; r <= r2; r++) {
      hexas.push({ q, r, s: -q - r })
    }
  }
  return hexas
}
export const generateRectangleHexas = (
  mapWidth: number,
  mapHeight: number
): HexCoordinates[] => {
  const hexas: HexCoordinates[] = []
  for (let r = 0; r < mapHeight; r++) {
    const offset = Math.floor(r / 2) // or r>>1
    for (let q = -offset; q < mapWidth - offset; q++) {
      hexas.push({ q, r, s: -q - r })
    }
  }
  return hexas
}
type MapDimensions = {
  width: number
  height: number
}
export const getBoardHexesRectangularMapDimensions = (
  boardHexes: BoardHexes
): MapDimensions => {
  // Gets the top-most, bottom-most, left-most, and right-most hexes, then calculates the difference for the map width and height
  const qPlusSMax = Math.max(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].q + boardHexes[hexID].s
    )
  )
  const qPlusSMin = Math.min(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].q + boardHexes[hexID].s
    )
  )
  const sMinusQMax = Math.max(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].s - boardHexes[hexID].q
    )
  )
  const sMinusQMin = Math.min(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].s - boardHexes[hexID].q
    )
  )
  const hexHeight = qPlusSMax - qPlusSMin
  const height = (hexHeight * 1.5 + 2 * HEXGRID_HEX_RADIUS) * HEXGRID_SPACING
  const hexWidth = sMinusQMax - sMinusQMin
  const width =
    (hexWidth * HEXGRID_HEX_APOTHEM + 2 * HEXGRID_HEX_APOTHEM) * HEXGRID_SPACING
  // const maxAltitude = Math.max(...Object.keys(boardHexes).map((hexID) => boardHexes[hexID].altitude))
  return { height, width }
}
