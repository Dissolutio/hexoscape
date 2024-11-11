import { Dictionary } from 'lodash'
import { hexUtilsAdd, hexUtilsRotate } from '../../game/hex-utils'
import { HexCoordinates } from '../../game/types'
import rotationTransforms from './rotationTransforms'

export default function getVSTileTemplate({
  clickedHex,
  rotation,
  size,
}: {
  clickedHex: HexCoordinates
  size: number
  rotation: number
}): HexCoordinates[] {
  const originOfTileTransform =
    rotationTransforms[size][rotation]
  const originOfTile = hexUtilsAdd(clickedHex, originOfTileTransform)
  return vsTileTemplates[size]
    .map((t) => {
      return hexUtilsRotate(t, origin, rotation)
    })
    .map((t) => hexUtilsAdd(t, originOfTile))
}

const origin = { q: 0, r: 0, s: 0 }
const basic2 = [
  origin,
  {
    q: 1,
    r: 0,
    s: -1,
  },
]
const basic3 = [
  ...basic2,
  {
    q: 0,
    r: 1,
    s: -1,
  },
]
const basic7 = [
  ...basic3,
  {
    q: -1,
    r: 1,
    s: 0,
  },
  {
    q: 1,
    r: 1,
    s: -2,
  },
  {
    q: -1,
    r: 2,
    s: -1,
  },
  {
    q: 0,
    r: 2,
    s: -2,
  },
]
const basic24 = [
  ...basic7,
  {
    q: 1,
    r: 2,
    s: -3,
  },
  {
    q: -2,
    r: 3,
    s: -1,
  },
  {
    q: -1,
    r: 3,
    s: -2,
  },
  {
    q: 0,
    r: 3,
    s: -3,
  },
  {
    q: 1,
    r: 3,
    s: -4,
  },
  {
    q: 2,
    r: 3,
    s: -5,
  },
  {
    q: -2,
    r: 4,
    s: -2,
  },
  {
    q: -1,
    r: 4,
    s: -3,
  },
  {
    q: 0,
    r: 4,
    s: -4,
  },
  {
    q: 1,
    r: 4,
    s: -5,
  },
  {
    q: 2,
    r: 4,
    s: -6,
  },
  {
    q: -3,
    r: 5,
    s: -2,
  },
  {
    q: -2,
    r: 5,
    s: -3,
  },
  {
    q: -1,
    r: 5,
    s: -4,
  },
  {
    q: 0,
    r: 5,
    s: -5,
  },
  {
    q: 1,
    r: 5,
    s: -6,
  },
  {
    q: 2,
    r: 5,
    s: -7,
  },
]
const straight3 = [
  ...basic2,
  {
    q: 2,
    r: 0,
    s: -2,
  },
]
const straight4 = [ // roadwall4
  ...straight3,
  {
    q: 3,
    r: 0,
    s: -3,
  },
]
const straight5 = [
  ...straight4,
  {
    q: 4,
    r: 0,
    s: -4,
  },
]
const glacier4 = [
  // glacier4, tree4
  ...basic3,
  {
    q: 1,
    r: 1,
    s: -2,
  },
]
const glacier6 = [
  // marro hive, glacier-6
  ...basic3,
  {
    q: -1,
    r: 1,
    s: 0,
  },
  {
    q: 2,
    r: 0,
    s: -2,
  },
  {
    q: 1,
    r: 1,
    s: -2,
  },
]
const wallWalk7 = [
  ...basic3,
  {
    q: 2,
    r: 0,
    s: -2,
  },
  {
    q: 3,
    r: 0,
    s: -3,
  },
  {
    q: 1,
    r: 1,
    s: -2,
  },
  {
    q: 2,
    r: 1,
    s: -3,
  },
]
const wallWalk9 = [
  ...wallWalk7,
  {
    q: 4,
    r: 0,
    s: -4,
  },
  {
    q: 3,
    r: 1,
    s: -4,
  },
]

const vsTileTemplates: Dictionary<HexCoordinates[]> = {
  1: [origin],
  2: basic2,
  3: basic3,
  7: basic7,
  24: basic24,
  ruins2: basic2,
  ruins3: straight3,
  road5: straight5,
  roadWall4: straight4,
  glacier4,
  glacier6,
  hive6: glacier6,
  wallWalk7,
  wallWalk9,

  outcrop1: [origin],
  outcrop3: basic3,
  glacier1: [origin],
  glacier3: basic3,
  tree10: [origin],
  tree11: [origin],
  tree12: [origin],
  tree4: glacier4,
  palm14: [origin],
  palm15: [origin],
  palm16: [origin],
  brush9: [origin],
}


/* 
ROTATIONS (virtualscape)

Long-hex 123-flip
archway3/door3(connecting side down first),
 road5(either side),
  roadwall4(connecting-side side down first, remember it is placed adjacent to the hexes it modifies):
(start concave down)

(flip main-hex with its mirror-hex, the other "most outside" hex from piece-center, and rotate 3 times each way)
start out with next CW hex from main being to the right
rot: 0,1,2 rotate CCW from going right, to right-down, to left-down
rot: 3,4,5 rotate CCW the same, the main hex being the mirror hex 

*/
