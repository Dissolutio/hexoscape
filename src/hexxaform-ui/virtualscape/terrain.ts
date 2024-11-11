import { Dictionary } from 'lodash'
import { HexTerrain } from '../../game/types'

function getTerrain(type: number) {
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
  // Solid
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
  // Fluid
  TYPE_WATER: '40',
  TYPE_ICE: '50',
  TYPE_LAVA: '60',
  TYPE_SWAMPWATER: '190',
  TYPE_SHADOW: '250',

  // Hex Obstacles
  TYPE_TREE: '100',
  TYPE_TICALLA: '240',
  TYPE_GLACIER: '130',
  TYPE_OUTCROP: '270',
  TYPE_HIVE: '230',
  // Edge Obstacles
  TYPE_RUIN: '110',
  TYPE_ROADWALL: '120',

  // Castle
  TYPE_CASTLE: '16',


  // Start zones
  TYPE_STARTAREA: '150',
  // Glyphs
  TYPE_GLYPH: '140',
  // Tiles that people could customize in Virtualscape:
  TYPE_PERSONAL: '170',
  // The MasterSet 1 figures (colored/textured too!), and Wave 1 figures (unpainted & incomplete but most of the meshes)
  TYPE_FIGURE: '180',
}
const startAreaColorsToPlayerID = {
  // Keys are the colorf values of StartAreaTiles from virtualscape (the colorf values are these tiles only differentiating property)
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
  // hex obstacles
  palm14: '014',
  palm15: '015',
  palm16: '016',
  brush9: '002',
  ffTree10: '11',
  ffTree11: '12',
  ffTree12: '13',
  ffTree415: '04',
  hive: '006',

  // castle
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

  // edge obstacles
  ruin2: '02',
  ruin3: '03',
  battlement: '301',
  ladder: '402',
  flag: '403',
  roadWall4: '04',

  // edge/hex obstacle
  marvelWallIntact: '06',
  marvelWallDestroyed: '07',

  // startzone
  startArea: '01',
}
const terrainCodes = {
  // Solid
  [typeCodes.TYPE_GRASS]: HexTerrain.grass,
  [typeCodes.TYPE_ROCK]: HexTerrain.rock,
  [typeCodes.TYPE_SAND]: HexTerrain.sand,
  [typeCodes.TYPE_ROAD]: HexTerrain.road,
  [typeCodes.TYPE_SNOW]: HexTerrain.snow,
  [typeCodes.TYPE_LAVAFIELD]: HexTerrain.lavaField,
  [typeCodes.TYPE_SWAMP]: HexTerrain.swamp,
  [typeCodes.TYPE_CONCRETE]: HexTerrain.concrete,
  [typeCodes.TYPE_ASPHALT]: HexTerrain.asphalt,
  [typeCodes.TYPE_DUNGEON]: HexTerrain.dungeon,
  // Fluid
  [typeCodes.TYPE_WATER]: HexTerrain.water,
  [typeCodes.TYPE_SWAMPWATER]: HexTerrain.swampWater,
  [typeCodes.TYPE_ICE]: HexTerrain.ice,
  [typeCodes.TYPE_LAVA]: HexTerrain.lava,
  [typeCodes.TYPE_SHADOW]: HexTerrain.shadow,
  // Obstructions
  [typeCodes.TYPE_TREE]: 'tree',
  [typeCodes.TYPE_TICALLA]: 'ticalla',
  [typeCodes.TYPE_GLACIER]: 'glacier',
  [typeCodes.TYPE_OUTCROP]: 'outcrop',
  [typeCodes.TYPE_HIVE]: 'hive',
  // Edge pieces
  [typeCodes.TYPE_RUIN]: 'ruin',
  [typeCodes.TYPE_ROADWALL]: 'roadWall',
  // Castle are many
  [typeCodes.TYPE_CASTLE]: 'castle',
  // startZones are a special case
  [typeCodes.TYPE_STARTAREA]: 'startzone',
  // glyphs are their own special case
  [typeCodes.TYPE_GLYPH]: 'glyph',
  // ignoring these below for now
  [typeCodes.TYPE_PERSONAL]: 'personal',
  [typeCodes.TYPE_FIGURE]: 'figure',
}

export const hexTerrainColor: Dictionary<string> = {
  [HexTerrain.empty]: '#040404',
  [HexTerrain.grass]: '#60840d',
  [HexTerrain.rock]: '#475776',
  [HexTerrain.sand]: '#ab8e10',
  [HexTerrain.road]: '#868686',
  [HexTerrain.water]: '#3794fd',
}

// This is used in Hexxaform context
export const landSizes = {
  // solid terrain below
  grass: [1, 2, 3, 7, 24],
  rock: [1, 2, 3, 7, 24],
  sand: [1, 2, 3, 7, 24],
  swamp: [1, 2, 3, 7, 24],
  dungeon: [1, 2, 3, 7, 24],
  lavaField: [1, 2, 7],
  concrete: [1, 2, 7],
  asphalt: [1, 2, 7],
  road: [1, 2],
  snow: [1, 2],
  // fluid terrain below
  water: [1, 3],
  swampWater: [1],
  lava: [1],
  ice: [1],
  shadow: [1],
}

const obstructionSizes = {
  outcrop1: { sizes: [1] },
  outcrop3: { sizes: [3] },
  glacier1: { sizes: [1] },
  glacier3: { sizes: [3] },
  glacier4: { sizes: ['glacier4'] },
  glacier6: { sizes: ['glacier6'] },
  hive6: { sizes: ['hive6'] },
  ruins2: { sizes: ['ruins2'] },
  ruins3: { sizes: ['ruins3'] },
  tree10: { sizes: [1] },
  tree11: { sizes: [1] },
  tree12: { sizes: [1] },
  tree04: { sizes: ['glacier4'] },
  palm14: { sizes: [1] },
  palm15: { sizes: [1] },
  palm16: { sizes: [1] },
  brush9: { sizes: [1] },
}