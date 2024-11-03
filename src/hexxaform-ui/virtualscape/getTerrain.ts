export default function getTerrain(type: number) {
  const str = type.toString()
  let terrainCode = str.substring(0, str.length - 2)
  let terrainSubcode = Number(str.substring(str.length - 2)).toString()
  if (terrainCode.startsWith('16')) {
    // Castle is the only tile type with 3 digit subcode
    terrainCode = '16'
    terrainSubcode = Number(str.substring(str.length - 3)).toString()
  }
  return { terrain: terrainCodes[terrainCode], hexCount: terrainSubcode }
}

// Solid terrain types
const TYPE_GRASS = '10'
const TYPE_ROCK = '20'
const TYPE_SAND = '30'
const TYPE_ROAD = '80'
const TYPE_SNOW = '90'
const TYPE_LAVAFIELD = '70'
const TYPE_CONCRETE = '210'
const TYPE_ASPHALT = '220'
const TYPE_SWAMP = '200'
const TYPE_DUNGEON = '260'
// Fluid terrain types
const TYPE_WATER = '40'
const TYPE_ICE = '50'
const TYPE_LAVA = '60'
const TYPE_SWAMPWATER = '190'
const TYPE_SHADOW = '250'
// Start zones
const TYPE_STARTAREA = '150' // all are 15001 type, tile.colorf is what distinguishes them: red:255, green:65280, blue:16711680, yellow:65535, violet: 16711935, cyan:16776960, orange:33023, purple:16711808
// Glyphs
const TYPE_GLYPH = '140'
// Obstacles (Todo soon)
const TYPE_TREE = '100' // 10013 10012 10011 are the 3 single trees,10004 is the big 4-tree
const TYPE_RUIN = '110' // 11003, 11002 are the 2 ruins, 11006 is the marvel ruin (with wall), 11007 is the marvel ruin (with wall "destroyed")
const TYPE_ROADWALL = '120' // 12004
const TYPE_TICALLA = '240' // 24014, 24015, 24016 are the palms, 24002 is the brush
const TYPE_GLACIER = '130'
const TYPE_OUTCROP = '270'
const TYPE_HIVE = '230' // 23006 is the hive
// Castle (Todo soonish)
const TYPE_CASTLE = '16' // 16 009,7,1 is the castle ground; 16401 is arch w/door, 16404 is arch no door, 16101,2,3, is wall-base corner/straight/end 16201,2,3, is wall corner/straight/end, 16301 battlement, 16402 is ladder, 16403 is flag
// Types todo later
const TYPE_PERSONAL = '170'
const TYPE_FIGURE = '180'

const terrainCodes = {
  [TYPE_GRASS]: 'grass',
  [TYPE_ROCK]: 'rock',
  [TYPE_SAND]: 'sand',
  [TYPE_WATER]: 'water',
  [TYPE_ICE]: 'ice',
  [TYPE_LAVA]: 'lava',
  [TYPE_LAVAFIELD]: 'lavaField',
  [TYPE_ROAD]: 'road',
  [TYPE_SNOW]: 'snow',
  [TYPE_TREE]: 'tree',
  [TYPE_RUIN]: 'ruin',
  [TYPE_ROADWALL]: 'roadWall',
  [TYPE_GLACIER]: 'glacier',
  [TYPE_GLYPH]: 'glyph',
  [TYPE_STARTAREA]: 'startzone',
  [TYPE_CASTLE]: 'castle',
  [TYPE_PERSONAL]: 'personal',
  [TYPE_FIGURE]: 'figure',
  [TYPE_SWAMPWATER]: 'swampWater',
  [TYPE_SWAMP]: 'swamp',
  [TYPE_CONCRETE]: 'concrete',
  [TYPE_ASPHALT]: 'asphalt',
  [TYPE_HIVE]: 'hive',
  [TYPE_TICALLA]: 'ticalla',
  [TYPE_SHADOW]: 'shadow',
  [TYPE_DUNGEON]: 'dungeon',
  [TYPE_OUTCROP]: 'outcrop',
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
1,1 rot:0 next is right
1,1 rot:1 main to 7,5
1,1 rot:2 main to 10,8
1,1 rot:3 main to 11,10
1,1 rot:4 main to 5,12
1,1 rot:5 main to 2,7

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
1,1 rot:1 main stays: next is right-down
1,1 rot:2 main to 2,1: next is left-down
1,1 rot:3 main to 2,2: next is left
1,1 rot:4 main stays: next is left-up
1,1 rot:5 main to 1,2: next is right-up 

2-hex
1,1 rot:0 main=height-5 hex, next is right
1,1 rot:1 main stays: next is right-down
1,1 rot:2 main to 2,1: next is left-down
1,1 rot:3 main to 2,2: next is left
1,1 rot:4 main stays: next is left-up
1,1 rot:5 main to 1,2: next is right-up 

4-hex glacier, tree4
(use glacier in virtualscape to see)
(heights 7/11/9/11 clockwise)
1,1 rot:0 main=height-7 hex , next hex is CW height-11(1) is directly right
1,1 rot:1 main stays: next is right-down
1,1 rot:2 main to 2,1 : next is left-down
1,1 rot:3 main to 3,2: next is left
1,1 rot:4 main to 1,3: next is left-up
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

6-hex glacier6
(xx 17,17,9)
(9,17,(peak)17 xx)
1,1 rot:0 main= height-17(1) hex (heights 17/17/9/17/17/9 clockwise), the next is CW height-17(2) is directly right
1,1 rot:1 main to 2,1: next is right-down
1,1 rot:2 main to 1,2 : next is left-down
1,1 rot:3 main to 2,2: next is left
1,1 rot:4 main to 2,3: next is left-up
1,1 rot:5 main to 0,3: next is right-up
*/
