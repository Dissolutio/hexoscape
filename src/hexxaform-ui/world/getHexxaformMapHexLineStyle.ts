import { Color } from "three"

const highlightWhiteStyle = { color: 'white', opacity: 1, lineWidth: 2 }
const nonTopRingGrayStyle = {
  color: new Color('#686868'),
  opacity: 1,
  lineWidth: 1,
}
const basicGrayTopRingStyle = {
  color: new Color('#b4b4b4'),
  opacity: 1,
  lineWidth: 1,
}
export const getHexxaformMapHexLineStyle = (isHeightEqualToTop: boolean, isHighlighted: boolean) => {
  // all non-top rings are as below:
  if (isHeightEqualToTop) {
    return nonTopRingGrayStyle
  }
  // top ring styles below:
  if (isHighlighted) {
    return highlightWhiteStyle
  }
  // FINALLY: top rings, if not modified, are gray to highlight the edge between hexes
  return basicGrayTopRingStyle
}