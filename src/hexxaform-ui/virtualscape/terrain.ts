import { Dictionary } from 'lodash'
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
const typeCodes = {
  // Solid terrain types
  TYPE_GRASS: '10',
  TYPE_ROCK: '20',
  TYPE_SAND: '30',
  TYPE_ROAD: '80',
  TYPE_SNOW: '90',
  TYPE_LAVAFIELD: '70',
  TYPE_CONCRETE: '210',
  TYPE_ASPHALT: '220',
  TYPE_SWAMP: '200',
  TYPE_DUNGEON: '260',
  // Fluid terrain types
  TYPE_WATER: '40',
  TYPE_ICE: '50',
  TYPE_LAVA: '60',
  TYPE_SWAMPWATER: '190',
  TYPE_SHADOW: '250',
  // Start zones
  TYPE_STARTAREA: '150', // all are 15001 type, tile.colorf is what distinguishes them: red:255, green:65280, blue:16711680, yellow:65535, violet: 16711935, cyan:16776960, orange:33023, purple:16711808
  // Glyphs
  TYPE_GLYPH: '140',
  // Obstacles (Todo soon)
  TYPE_TREE: '100', // 10013 10012 10011 are the 3 single trees,10004 is the big 4-tree
  TYPE_RUIN: '110', // 11003, 11002 are the 2 ruins, 11006 is the marvel ruin (with wall), 11007 is the marvel ruin (with wall "destroyed")
  TYPE_ROADWALL: '120', // 12004
  TYPE_TICALLA: '240', // 24014, 24015, 24016 are the palms, 24002 is the brush
  TYPE_GLACIER: '130',
  TYPE_OUTCROP: '270',
  TYPE_HIVE: '230', // 23006 is the hive
  // Castle (Todo soonish)
  TYPE_CASTLE: '16', // 16 009,7,1 is the castle ground; 16401 is arch w/door, 16404 is arch no door, 16101,2,3, is wall-base corner/straight/end 16201,2,3, is wall corner/straight/end, 16301 battlement, 16402 is ladder, 16403 is flag
  // Types todo later
  TYPE_PERSONAL: '170',
  TYPE_FIGURE: '180',
}
const terrainCodes = {
  [typeCodes.TYPE_GRASS]: 'grass',
  [typeCodes.TYPE_ROCK]: 'rock',
  [typeCodes.TYPE_SAND]: 'sand',
  [typeCodes.TYPE_WATER]: 'water',
  [typeCodes.TYPE_ICE]: 'ice',
  [typeCodes.TYPE_LAVA]: 'lava',
  [typeCodes.TYPE_LAVAFIELD]: 'lavaField',
  [typeCodes.TYPE_ROAD]: 'road',
  [typeCodes.TYPE_SNOW]: 'snow',
  [typeCodes.TYPE_TREE]: 'tree',
  [typeCodes.TYPE_RUIN]: 'ruin',
  [typeCodes.TYPE_ROADWALL]: 'roadWall',
  [typeCodes.TYPE_GLACIER]: 'glacier',
  [typeCodes.TYPE_GLYPH]: 'glyph',
  [typeCodes.TYPE_STARTAREA]: 'startzone',
  [typeCodes.TYPE_CASTLE]: 'castle',
  [typeCodes.TYPE_PERSONAL]: 'personal',
  [typeCodes.TYPE_FIGURE]: 'figure',
  [typeCodes.TYPE_SWAMPWATER]: 'swampWater',
  [typeCodes.TYPE_SWAMP]: 'swamp',
  [typeCodes.TYPE_CONCRETE]: 'concrete',
  [typeCodes.TYPE_ASPHALT]: 'asphalt',
  [typeCodes.TYPE_HIVE]: 'hive',
  [typeCodes.TYPE_TICALLA]: 'ticalla',
  [typeCodes.TYPE_SHADOW]: 'shadow',
  [typeCodes.TYPE_DUNGEON]: 'dungeon',
  [typeCodes.TYPE_OUTCROP]: 'outcrop',
}
const glyphLetterToName = {
  '?': 'unknown', // 14063="unknown"
  A: 'astrid',
  G: 'gerda',
  I: 'ivor',
  V: 'valda',
  D: 'dragmar',
  B: 'brandar',
  K: 'kelda',
  E: 'erland',
  M: 'mitonsoul',
  L: 'lodin',
  S: 'sturla',
  R: 'rannveig',
  J: 'jalgard',
  W: 'wannok',
  P: 'proftaka',
  O: 'oreld',
  N: 'nilrend',
  C: 'crevcor',
  T: 'thorian',
  U: 'ulaniva',
}

type Terrain = {
  flatPieceSizes: number[]
}
export const hexTerrainColor: Dictionary<string> = {
  water: '#3794fd',
  grass: '#60840d',
  rock: '#475776',
  sand: '#ab8e10',
  road: '#868686',
}
export const terrain: Dictionary<Terrain> = {
  grass: { flatPieceSizes: [1, 2, 3, 7, 24] },
  rock: { flatPieceSizes: [1, 2, 3, 7, 24] },
  sand: { flatPieceSizes: [1, 2, 3, 7, 24] },
  water: { flatPieceSizes: [1] },
  // dungeon: {flatPieceSizes: [1, 2, 3, 7, 24]},
  // swamp: {flatPieceSizes: [1, 2, 3, 7, 24]},
  // lavaField: {flatPieceSizes: [1, 2, 7]},
  // concrete: {flatPieceSizes: [1, 2, 7]},
  // asphalt: {flatPieceSizes: [1, 2, 7]},
  // snow: {flatPieceSizes: [1, 2]},
  // road: {flatPieceSizes: [1, 2]},
  // swampWater: {flatPieceSizes: [1]},
  // lava: {flatPieceSizes: [1]},
  // ice: {flatPieceSizes: [1]},
  // shadow: {flatPieceSizes: [1]},
}
