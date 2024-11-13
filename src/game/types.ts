export interface GameState {
  boardHexes: BoardHexes
  hexMap: HexMap
  maxArmyValue: number
  maxRounds: number
  gameArmyCards: GameArmyCard[]
  killedArmyCards: GameArmyCard[]
  gameUnits: GameUnits
  killedUnits: GameUnits // killedUnits is updated when units die, and when units are resurrected/cloned
  players: PlayerState // players is secret state, each player ID only sees their slice: (G.players[0] = { secret stuff for player 0 })
  startZones: StartZones
  orderMarkers: OrderMarkers
  initiative: string[]
  currentRound: number
  currentOrderMarker: number
  draftReady: PlayerStateToggle
  placementReady: PlayerStateToggle
  orderMarkersReady: PlayerStateToggle
  // Stage queue: This is how, when Mimring kills many units that cause different stages to happen, we track the order of those stages
  stageQueue: StageQueueItem[]
  // Draft tracking below
  cardsDraftedThisTurn: string[]
  // ROP game state below
  unitsMoved: string[] // unitsMoved is not unique ids; for now used to track # of moves used
  unitsAttacked: { [attackingUnitID: string]: string[] }
  unitsKilled: UnitsKilled // unitsKilled does not get erased or updated when killed units are resurrected/cloned
  gameLog: string[]
  /* 
    disengagesAttempting 
    Tracks the data passed from 
    1. clicking a `moveRange.disengage` hex in UI while moving
    to
    2. the bgio-move `disengagementSwipe`
   */
  disengagesAttempting: undefined | DisengageAttempt

  /* 
    disengagedUnitIds
     tracks for a unit who has survived a disengage with unit(s) and should now have its move range adjusted. Should be reset (every move?)
   */
  disengagedUnitIds: string[]
  waterCloneRoll?: WaterCloneRoll
  waterClonesPlaced: WaterClonesPlaced
  grenadesThrown: string[] // array of gameCardIDs, added to when a grenade is thrown, flags Game "use up" the grenades
  chompsAttempted: string[] // this marks grimnak as having chomped
  mindShacklesAttempted: string[] // this marks negoksa as having attempted mind shackle
  // this is used to track results of Tarn Viking Warrior berserker charges
  berserkerChargeRoll: BerserkerChargeRoll | undefined
  berserkerChargeSuccessCount: number
  theDropUsed: string[] // tracks which cards that need to use The Drop have used it
  // theDropResult: this temporarily stores the results of The Drop rolls for players to see while they decide if/where to drop, does NOT mean they have used The Drop
  theDropResult?: {
    [playerID: string]: TheDropRoll
  }
}
export type SetupData = {
  numPlayers: number
  scenarioName: string
  withPrePlacedUnits: boolean
}
export type StageQueueItem = {
  stage: string
  playerID: string
}

// PlayersState keys are playerIDS, players only see their slice of it at G.players
export type GameMap = {
  boardHexes: BoardHexes
  startZones: StartZones
  hexMap: HexMap
}
export type HexMap = {
  id: string
  name: string
  shape: string // 'hexagon' | 'rectangle'
  glyphs: Glyphs
  size?: number // for hexagon shaped maps
  height?: number // for rectangle shaped maps
  width?: number // for rectangle shaped maps
}
export type Glyphs = {
  [boardHexID: string]: Glyph
}
export type Glyph = {
  hexID: string
  glyphID: string
  isRevealed: boolean
}
export type Point = {
  x: number
  y: number
}
export type HexCoordinates = {
  q: number
  r: number
  s: number
}
export enum HexTerrain {
  empty = 'empty',
  // solid
  grass = 'grass',
  rock = 'rock',
  sand = 'sand',
  road = 'road',
  snow = 'snow',
  lavaField = 'lavaField',
  swamp = 'swamp',
  asphalt = 'asphalt',
  concrete = 'concrete',
  dungeon = 'dungeon',
  // fluid
  water = 'water',
  lava = 'lava',
  ice = 'ice',
  swampWater = 'swampWater',
  shadow = 'shadow',
}
export enum HexObstacles {
  tree10 = 'tree10',
  tree11 = 'tree11',
  tree12 = 'tree12',
  tree415 = 'tree415',
  palm14 = 'palm14',
  palm15 = 'palm15',
  palm16 = 'palm16',
  brush9 = 'brush9',
  outcrop1 = 'outcrop1',
  outcrop3 = 'outcrop3',
  glacier1 = 'glacier1',
  glacier3 = 'glacier3',
  glacier4 = 'glacier4',
  glacier6 = 'glacier6',
  hive6 = 'hive6',
}
export enum EdgeObstacles {
  ruins2 = 'ruins2',
  ruins3 = 'ruins3',
  marvel6 = 'marvel6',
  marvelBroken6 = 'marvelBroken6',
}
export enum EdgeAddons {
  roadWall4 = 'roadWall4',
}
export enum CastleObstacles {
  wallWalk7 = 'wallWalk7',
  wallWalk9 = 'wallWalk9',
  archDoor3 = 'archDoor3',
  archNoDoor3 = 'archNoDoor3',
  castleBaseCorner = 'castleBaseCorner',
  castleBaseStraight = 'castleBaseStraight',
  castleBaseEnd = 'castleBaseEnd',
  castleWallCorner = 'castleWallCorner',
  castleWallStraight = 'castleWallStraight',
  castleWallEnd = 'castleWallEnd',
}
export interface BoardHex extends HexCoordinates {
  id: string
  occupyingUnitID: string
  isUnitTail: boolean
  altitude: number
  startzonePlayerIDs: string[]
  terrain: string
  subTerrain?: string
}
export type BoardHexes = {
  [key: string]: BoardHex
}
export type EditingBoardHexes = {
  [boardHexId: string]: HexCoordinates & {
    id: string
    occupyingUnitID: string
    isUnitTail: boolean
  }
}
export type StartZones = {
  [playerID: string]: string[] // boardHex IDs
}
export interface ICoreHeroscapeCard {
  name: string
  singleName: string
  armyCardID: string
  race: string
  life: string
  move: string
  range: string
  attack: string
  defense: string
  height: string
  heightClass: string
  points: string
  figures: string
  hexes: string
  image: string
  portraitPattern: string
  general:
  | 'jandar'
  | 'utgar'
  | 'ullar'
  | 'vydar'
  | 'einar'
  | 'aquilla'
  | 'valkrill'
  type: string
  cardClass: string
  personality: string
  setWave: string
  abilities: CardAbility[]
}
export type CardAbility = {
  name: string
  desc: string
}
export type ArmyCard = {
  abilities: CardAbility[]
  name: string
  singleName: string
  armyCardID: string
  race: string
  life: number
  move: number
  range: number
  attack: number
  defense: number
  points: number
  figures: number
  hexes: number
  general: string
  type: string // unique common uncommon
  cardClass: string // warlord, soldier, beast etc
  personality: string // valiant, relentless etc
  height: number // 3-14
  heightClass: string // small medium large huge
  image: string
  // CURRENTLY, THESE ARE OMITTED UNTIL WE USE THEM
  // setWave: string
  // portraitPattern: string
}
export type GameArmyCard = ArmyCard & {
  playerID: string
  gameCardID: string
  cardQuantity: number
  // this is for the airborn elite ability, which is a one time use
  hasThrownGrenade?: boolean
}
export type GameUnit = {
  unitID: string
  playerID: string
  gameCardID: string
  armyCardID: string
  wounds: number
  movePoints: number
  is2Hex: boolean
  rotation: number // 0-5 for the 6 directions. 1-hex figures can be rotated, 2-hex figures can be flipped during the movement stage
  modelIndex: number
}
export type GameUnits = {
  [unitID: string]: GameUnit
}
export type PlacementUnit = GameUnit & {
  singleName: string
}
export type PlayerStateToggle = {
  [playerID: string]: boolean
}
export type MoveRange = {
  [hexID: string]: {
    fromHexID: string
    fromCost: number
    movePointsLeft: number
    disengagedUnitIDs: string[]
    engagedUnitIDs: string[]
    fallDamage?: number
    isSafe?: boolean
    isEngage?: boolean
    isFallDamage?: boolean
    isDisengage?: boolean
    isGrappleGun?: boolean
    isActionGlyph?: boolean
  }
}
export type StartingArmies = { [playerID: string]: string[] }
export type DisengageAttempt = {
  unit: GameUnit
  endHexID: string
  endFromHexID: string
  movePointsLeft: number
  fallDamage: number
  defendersToDisengage: GameUnit[]
}
export type UnitsCloning = {
  // The units that are cloning, and the valid hex IDs they can clone onto
  clonerID: string
  clonerHexID: string
  tails: string[]
}[]
export type WaterClonesPlaced = {
  clonedID: string
  hexID: string
  clonerID: string
}[]
// this is what the server will send to the client
export type WaterCloneRoll = {
  diceRolls: { [gameUnitID: string]: number }
  threshholds: { [gameUnitID: string]: number }
  cloneCount: number
  placements: {
    // placements tell us where the clones are cloning "from" and the tails are where they could be placed
    [gameUnitID: string]: {
      clonerID: string
      clonerHexID: string
      tails: string[]
    }
  }
}
export type TheDropRoll = {
  playerID: string
  roll: number
  threshold: number
  isSuccessful: boolean
}
// for secret state
export type PlayerState = {
  [playerID: string]: {
    orderMarkers: PlayerOrderMarkers
  }
}
export type PlayerOrderMarkers = { [order: string]: string }
export type OrderMarker = {
  gameCardID: string
  order: string
}
export type OrderMarkers = {
  [playerID: string]: OrderMarker[]
}
export type MapOptions = {
  mapSize: number
  gameUnits?: GameUnits | undefined
  withPrePlacedUnits?: boolean
}
export type RangeScan = {
  isInRange: boolean
  isMelee: boolean
  isRanged: boolean
}
export type HexNeighborsWithDirections = { [hexID: string]: number }
export type PossibleFireLineAttack = {
  affectedUnitIDs: string[]
  clickableHexID: string
  direction: number
  line: BoardHex[]
}
export type PossibleExplosionAttack = {
  clickableHexID: string
  clickableHexUnitID: string
  affectedUnitIDs: string[]
  affectedHexIDs: string[]
}
export type PossibleChomp = {
  chompingUnitID: string
  targetHexID: string
  isSquad: boolean
}
export type BerserkerChargeRoll = {
  roll: number
  isSuccessful: boolean
}
export type UnitsKilled = { [unitID: string]: string[] }
