import { Color } from "three"
import { playerColors } from "../../hexopolis-ui/theme"
import { StartZones } from "../../game/types"

const highlightWhiteStyle = { color: 'white', opacity: 1, lineWidth: 2 }
const nonTopRingGrayStyle = {
  color: '#686868',
  opacity: 1,
  lineWidth: 1,
}
const basicGrayTopRingStyle = {
  // color: new Color('#b4b4b4'),
  color: '#b4b4b4',
  opacity: 1,
  lineWidth: 1,
}
export const getHexxaformMapHexLineStyle = (isHeightEqualToTop: boolean, isHighlighted: boolean, boardHexID: string, startZones: StartZones, isShowStartZones: boolean) => {
  // all non-top rings are as below:
  if (!isHeightEqualToTop) {
    return nonTopRingGrayStyle
  }
  // top ring styles below:
  if (isHighlighted) {
    return highlightWhiteStyle
  }
  if (isShowStartZones) {
    if ((startZones?.['0'] ?? [])?.includes(boardHexID)) {
      return {
        color: new Color(playerColors['0']),
        opacity: 1,
        lineWidth: 2,
      }
    }
    if ((startZones?.['1'] ?? [])?.includes(boardHexID)) {
      return {
        color: new Color(playerColors['1']),
        opacity: 1,
        lineWidth: 2,
      }
    }
    if ((startZones?.['2'] ?? [])?.includes(boardHexID)) {
      return {
        color: new Color(playerColors['2']),
        opacity: 1,
        lineWidth: 2,
      }
    }
    if ((startZones?.['3'] ?? [])?.includes(boardHexID)) {
      return {
        color: new Color(playerColors['3']),
        opacity: 1,
        lineWidth: 2,
      }
    }
    if ((startZones?.['4'] ?? [])?.includes(boardHexID)) {
      return {
        color: new Color(playerColors['4']),
        opacity: 1,
        lineWidth: 2,
      }
    }
    if ((startZones?.['5'] ?? [])?.includes(boardHexID)) {
      return {
        color: new Color(playerColors['5']),
        opacity: 1,
        lineWidth: 2,
      }
    }
  }

  // FINALLY: top rings, if not modified, are gray to highlight the edge between hexes
  return basicGrayTopRingStyle
}