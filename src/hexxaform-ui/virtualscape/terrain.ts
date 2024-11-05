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
  TYPE_STARTAREA: '150',
  // Glyphs
  TYPE_GLYPH: '140',
  // Hex Tile Obstacles
  TYPE_TREE: '100',
  TYPE_TICALLA: '240',
  TYPE_GLACIER: '130',
  TYPE_OUTCROP: '270',
  TYPE_HIVE: '230',
  // Castle: Walls, Ladders, a lot
  TYPE_CASTLE: '16',
  // Hex-Edge Obstacles
  TYPE_RUIN: '110',
  TYPE_ROADWALL: '120',
  // REQUIRES FURTHER VIRTUALSCAPE FILE DECODING
  TYPE_PERSONAL: '170',
  TYPE_FIGURE: '180',
}
const startZonePlayerIds = {
  // Keys are the colorf values of tiles from virtualscape (the colorf values are the only differentiator between start zone tiles)
  255: '1', // red
  65280: '2', // green
  16711680: '3', // blue
  65535: '4', // yellow
  16711935: '5', // violet
  16776960: '6', // cyan
  33023: '7', // orange
  16711808: '8', // purple
}
const terrainSubcodes = {
  palm14: '014',
  palm15: '015',
  palm16: '016',
  brush9: '002',
  ruin2: '02',
  ruin3: '03',
  marvelWallIntact: '06',
  marvelWallDestroyed: '07',
  ffTree10: '11',
  ffTree11: '12',
  ffTree12: '13',
  ffTree415: '04',
  hive: '006',
  wallWalk1: '001',
  wallWalk7: '007',
  wallWalk9: '009',
  castleBaseCorner: '101',
  castleBaseStraight: '102',
  castleBaseEnd: '103',
  castleWallCorner: '201',
  castleWallStraight: '202',
  castleWallEnd: '203',
  archDoor: '401',
  archOpen: '404',
  battlement: '301',
  ladder: '402',
  flag: '403',
  roadWall4: '04',
  startArea: '01',
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
  empty: '#ff29bb',
  water: '#3794fd',
  grass: '#60840d',
  rock: '#475776',
  sand: '#ab8e10',
  road: '#868686',
}
export const terrain: Dictionary<Terrain> = {
  grass: { flatPieceSizes: [1, 2, 3, 4, 6, 7, 9, 24] },
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
