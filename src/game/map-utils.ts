import { HEXGRID_HEX_APOTHEM, HEXGRID_HEX_RADIUS, HEXGRID_SPACING } from "./constants"
import { BoardHexes } from "./types"

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
