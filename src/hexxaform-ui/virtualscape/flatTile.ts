import { Dictionary } from 'lodash'
import { hexUtilsAdd, hexUtilsRotate } from '../../game/hex-utils'
import { HexCoordinates } from '../../game/types'

const origin = { q: 0, r: 0, s: 0 }
const flatTile2 = [
  origin,
  {
    q: 1,
    r: 0,
    s: -1,
  },
]
const flatTile3 = [
  ...flatTile2,
  {
    q: 0,
    r: 1,
    s: -1,
  },
]
const flatTile4 = [
  ...flatTile3,
  {
    q: 1,
    r: 1,
    s: -2,
  },
]
const flatTile6 = [
  ...flatTile3,
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
const flatTile7 = [
  ...flatTile3,
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
const flatTile24 = [
  ...flatTile7,
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
const flatTileCastle7 = [
  ...flatTile3,
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
const flatTileCastle9 = [
  ...flatTileCastle7,
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
const virtualscapeRotationOriginTransformsBySize = {
  // order matters here, rotations go 0-5
  1: [origin, origin, origin, origin, origin, origin],
  2: [
    { q: 0, r: 0, s: 0 },
    { q: 0, r: 0, s: 0 },
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 0, r: 1, s: -1 },
    { q: -1, r: 1, s: 0 },
  ],
  3: [
    { q: 0, r: 0, s: 0 },
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 0, r: 1, s: -1 },
    { q: 0, r: 1, s: -1 },
    { q: -1, r: 1, s: 0 },
  ],
  4: [
    { q: 0, r: 0, s: 0 },
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 1, r: 1, s: -2 },
    { q: -1, r: 2, s: -1 },
    { q: -1, r: 1, s: 0 },
  ],
  6: [
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 0, r: 1, s: -1 },
    { q: 1, r: 1, s: -2 },
    { q: 0, r: 2, s: -2 },
    { q: -2, r: 2, s: 0 },
  ],
  // 7: [
  //   { q: 0, r: 0, s: 0 },
  //   { q: 1, r: 0, s: -1 },
  //   { q: 1, r: 1, s: -2 },
  //   { q: 0, r: 2, s: -2 },
  //   { q: -1, r: 2, s: -1 },
  //   { q: -1, r: 1, s: 0 },
  // ],
  7: [
    // castle7
    { q: 0, r: 0, s: 0 },
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 2, r: 1, s: -3 },
    { q: 0, r: 3, s: -3 },
    { q: -3, r: 3, s: 0 },
  ],
  9: [
    // castle9
    { q: 0, r: 0, s: 0 },
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 3, r: 1, s: -4 },
    { q: 0, r: 4, s: -4 },
    { q: -4, r: 4, s: 0 },
  ],
  24: [
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 2, r: 3, s: -5 },
    { q: 2, r: 5, s: -7 },
    { q: -5, r: 7, s: -2 },
    { q: -5, r: 2, s: 3 },
  ],
}

export const getFlatTileHexes = ({
  clickedHex,
  rotation,
  size,
}: {
  clickedHex: HexCoordinates
  size: number
  rotation: number
}): HexCoordinates[] => {
  const originOfTileTransform =
    virtualscapeRotationOriginTransformsBySize[size][rotation]
  const originOfTile = hexUtilsAdd(clickedHex, originOfTileTransform)
  return flatTiles[size]
    .map((t) => {
      return hexUtilsRotate(t, origin, rotation)
    })
    .map((t) => hexUtilsAdd(t, originOfTile))
}
const flatTiles: Dictionary<HexCoordinates[]> = {
  1: [origin],
  2: flatTile2,
  3: flatTile3,
  4: flatTile4,
  6: flatTile6,
  // 7: flatTile7,
  7: flatTileCastle7,
  9: flatTileCastle9,
  24: flatTile24,
}

/* 
ROTATIONS (virtualscape)

24-hex (clicked hex x=1,y=1)
(main=X,next=N)(main is top-left hex if you lay the piece like a giant L)
 X N
0 0 0
 0 0 0
0 0 0 0 0
 0 0 0 0 0
0 0 0 0 0 0  
10,10 rot:0 next is right
10,10 rot:1 main to 11,10, next is right-down [1,0,-1]
10,10 rot:2 main to 13,13, next is left-down  [2,3,-5]
10,10 rot:3 main to 14,15, next is left  [1,5,-2]
10,10 rot:4 main to 8,17, next is left-up []
10,10 rot:5 main to 6,12 next is right-up

7-hex pieces are simple
1,1 rot:0 next is right
1,1 rot:1 main to 2,1, next is right-down
1,1 rot:2 main to 3,2, next is left-down
1,1 rot:3 main to 2,3, next is left
1,1 rot:4 main to 1,3, next is left-up
1,1 rot:5 main to 1,2, next is right-up

3-hex (clicked hex x=1,y=1)
(use glacier/outcrop in virtualscape to see)
(heights 5/9/7 clockwise)
1,1 rot:0 main=height-5 hex, next is right 
1,1 rot:1 main stays 1,1: next is right-down
1,1 rot:2 main to 2,1: next is left-down
1,1 rot:3 main to 2,2: next is left
1,1 rot:4 main stays 2,2: next is left-up
1,1 rot:5 main to 1,2: next is right-up 

2-hex
1,1 rot:0 main=height-5 hex, next is right
1,1 rot:1 main stays: next is right-down
1,1 rot:2 main to 2,1: next is left-down
1,1 rot:3 main to 2,2: next is left
1,1 rot:4 main stays: next is left-up
1,1 rot:5 main to 1,2: next is right-up 

9-hex castleground
rot: 0 main=left-most of longest row, short row goes below, next-hex is right
rot: 1 main stays: next is right-down
rot: 2 main to 2,1: next is left-down
rot: 3 main to 5,2: next is left
rot: 4 main to 3,5: next is left-up
rot: 5 main to -1,5: next is right-up

7-hex castleground very similar ^^
rot: 0 main=left-most of longest row, short row goes below, next-hex is right
rot: 1 main stays: next is right-down
rot: 2 main to 2,1: next is left-down
rot: 3 main to 3,2: next is left
rot: 4 main to 2,4: next is left-up
rot: 5 main to -1,4: next is right-up

6-hex glacier6, hive6
(xx 17,17,9)
(9,17,(peak)17 xx)
1,1 rot:0 main= height-17(1) hex (heights 17/17/9/17/17/9 clockwise), the next is CW height-17(2) is directly right
1,1 rot:1 main to 2,1: next is right-down
1,1 rot:2 main to 1,2 : next is left-down
1,1 rot:3 main to 2,2: next is left
1,1 rot:4 main to 2,3: next is left-up
1,1 rot:5 main to 0,3: next is right-up

4-hex glacier, tree4
(use glacier in virtualscape to see)
(heights 7/11/9/11 clockwise)
1,1 rot:0 main=height-7 hex , next hex is CW height-11(1) is directly right
1,1 rot:1 main stays: next is right-down
1,1 rot:2 main to 2,1 : next is left-down
1,1 rot:3 main to 3,2: next is left
1,1 rot:4 main to 1,3: next is left-up
1,1 rot:5 main to 1,2: next is right-up

castlebase end(>), straight(=), corner(<=connections left-up/down)
All start "facing" left, and turn CW

battlements, ladders, flags:
Start facing right-up, CW from there (remember, they are technically placed adjacent to the hex they are modifying)

Long-hex 123-flip
archway3/door3(connecting side down first), road5(either side), roadwall4(connecting-side side down first, remember it is placed adjacent to the hexes it modifies):
(start concave down)
(flip main-hex with its mirror-hex, the other "most outside" hex from piece-center, and rotate 3 times each way)
start out with next CW hex from main being to the right
rot: 0,1,2 rotate CCW from going right, to right-down, to left-down
rot: 3,4,5 rotate CCW the same, the main hex being the mirror hex 

*/
