/* 
    WHAT/WHY
    These were mapped out by placing a tile down in virtualscape 6 times on known hexes. 1 for each rotation.
    So the first placement would mark the "origin" hex, whatever hex goes where you clicked. The tile-templates
    are built from this placement. The origin hex is {0,0,0} and the rest of the tiles for rotation-0 are in the 
    template with coordinates relative to the origin hex.
  
    Now, for each rotation, Virtualscape sometimes moves the origin hex, while still consistently rotating pieces clockwise.
    For instance, when your rotate the 24-hex piece, the origin hex moves a few hexes away from
    the actual hex you clicked.
  
    Here were my findings for all the pieces that are in Virtualscape:
  
    1-hex tiles rotation matters little.
    1-hex Obstructions: It will affect their display.
  
    1-hex castle walls/bases: 
    END(=>), STRAIGHT(=) connections to left 
    CORNER(>>) connections left-up & left-down
    All turn CW
  
    1-hex edge pieces: battlements, ladders, flags
    Start facing right-up, CW from there (remember, they are technically placed adjacent to the hex they are modifying)
    
    2-hex tiles have 3 unique orientations that repeat 2-times
  
    3-hex have 2 unique orientations that repeat 3-times
    Glacier-3, however, shows that if each part of the 3-hex is unique, then there is 6 unique orientations
  
    7-hex (rose/circle): rotation does not really matter
  
    All these are similar:
    4-hex: [glacier-4, tree-4]
    EdgeObstacles: [ruins-3, ruins-2, roadwall-4]
    "Long Tiles": [7-hex wallWalk, 9-hex wallWalk, arch-3/archnodoor-3,
    road-5, glacier-6, hive-6, marvelRuin-6, marvelBreakingWall-6]
    They go:
    ($%)--1 Then flip and repeat: (%$)--4
    |  \                          |  \
    3   2                         6   5

*/
const origin = { q: 0, r: 0, s: 0 }
const t1 = [origin, origin, origin, origin, origin, origin]
const straight2 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t3 = [
  // glacier3, outcrop3
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t7 = [
  // rose/circle style 7
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t24 = [
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 2, r: 3, s: -5 },
  { q: 2, r: 5, s: -7 },
  { q: -5, r: 7, s: -2 },
  { q: -5, r: 2, s: 3 },
]
const straight3 = [
  // straight3, arch3/door3
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 2, r: 0, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -2, r: 2, s: 0 },
]
const roadWall4 = [
  // straight4, roadWall4
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 3, r: 0, s: -3 },
  { q: 0, r: 3, s: -3 },
  { q: -3, r: 3, s: 0 },
]
const road5 = [
  // straight5, road5
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 4, r: 0, s: -4 },
  { q: 0, r: 4, s: -4 },
  { q: -4, r: 4, s: 0 },
]
const glacier6 = [
  // glacier6, hive6
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -2, r: 2, s: 0 },
]
const glacier4 = [
  // glacier4
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const castle7 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 2, r: 1, s: -3 },
  { q: 0, r: 3, s: -3 },
  { q: -3, r: 3, s: 0 },
]
const castle9 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 3, r: 1, s: -4 },
  { q: 0, r: 4, s: -4 },
  { q: -4, r: 4, s: 0 },
]
const marvel6 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 3, r: 1, s: -4 },
  { q: -1, r: 4, s: -3 },
  { q: -4, r: 3, s: 1 },
]
const rotationTransforms = {
  ruins2: straight2,
  ruins3: straight3,
  arch3: straight3,
  door3: straight3,
  marvel6,
  roadWall4,
  road5,
  glacier6,
  glacier4,
  castle7,
  castle9,
  1: t1,
  2: straight2,
  3: t3,
  7: t7,
  24: t24,
}

export default rotationTransforms