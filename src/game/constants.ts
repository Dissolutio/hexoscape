import {
  HexCoordinates,
  HexTerrain,
  MoveRange,
  OrderMarker,
  OrderMarkers,
  PlayerOrderMarkers,
  PlayerState,
  PlayerStateToggle,
} from './types'

export const HEXGRID_SPACING = 1.05
export const HEXGRID_HEX_RADIUS = 1
export const HEXGRID_HEX_APOTHEM = 0.866
export const HEXGRID_HEX_HEIGHT = 0.5
export const halfLevel = HEXGRID_HEX_HEIGHT / 2
export const quarterLevel = HEXGRID_HEX_HEIGHT / 4
export const eighthLevel = HEXGRID_HEX_HEIGHT / 8
export const CAMERA_FOV = 65
export const EVENTS = {
  savePng: 'savePng',
  saveJpg: 'saveJpg',
}
export const phaseNames = {
  draft: 'draft',
  placement: 'placement',
  beforePlaceOrderMarkers: 'beforePlaceOrderMarkers',
  placeOrderMarkers: 'placeOrderMarkers',
  roundOfPlay: 'roundOfPlay',
}

export const stageNames = {
  pickingUnits: 'pickingUnits',
  theDrop: 'theDrop',
  idleTheDrop: 'idleTheDrop',
  placingUnits: 'placingUnits',
  placeOrderMarkers: 'placeOrderMarkers',
  attacking: 'attacking',
  movement: 'movement',
  waitingForDisengageSwipe: 'waitingForDisengageSwipe',
  disengagementSwipe: 'disengagementSwipe',
  waterClone: 'waterClone',
  berserkerCharge: 'berserkerCharge',
  mindShackle: 'mindShackle',
  placingAttackSpirit: 'placingAttackSpirit',
  idlePlacingAttackSpirit: 'idlePlacingAttackSpirit',
  placingArmorSpirit: 'placingArmorSpirit',
  idlePlacingArmorSpirit: 'idlePlacingArmorSpirit',
  chomp: 'chomp',
  fireLineSA: 'fireLineSA',
  explosionSA: 'explosionSA',
  grenadeSA: 'grenadeSA',
}

export const OM_COUNT = 3
const ORDERS = ['0', '1', '2', 'X']
const blankOrderMarkers = ORDERS.reduce((prev, curr) => {
  return [...prev, { gameCardID: '', order: curr }]
}, [] as OrderMarker[])

export const MINOR_FALL_DAMAGE = 1
export const MAJOR_FALL_DAMAGE = 3

export function generateBlankOrderMarkersForNumPlayers(
  numPlayers: number
): OrderMarkers {
  const result: { [key: string]: any } = {}
  for (let index = 0; index < numPlayers; index++) {
    result[index] = blankOrderMarkers
  }
  return result
}
export function generateBlankPlayersStateForNumPlayers(
  numPlayers: number
): PlayerState {
  const result: { [key: string]: any } = {}
  for (let index = 0; index < numPlayers; index++) {
    result[index] = { orderMarkers: generateBlankPlayersOrderMarkers() }
  }
  return result
}
export function generateBlankPlayersOrderMarkers(): PlayerOrderMarkers {
  return {
    '0': '',
    '1': '',
    '2': '',
    X: '',
  }
}

export function generateHexID(hex: HexCoordinates) {
  return `${hex.q},${hex.r},${hex.s}`
}
export function generateBlankMoveRange(): MoveRange {
  return {}
}
export function transformMoveRangeToArraysOfIds(moveRange: MoveRange): {
  safeMoves: string[]
  engageMoves: string[]
  dangerousMoves: string[]
} {
  return {
    safeMoves: Object.keys(moveRange).filter(
      (hexID) => moveRange[hexID].isSafe
    ),
    engageMoves: Object.keys(moveRange).filter(
      (hexID) => moveRange[hexID].isEngage
    ),
    dangerousMoves: Object.keys(moveRange).filter(
      (hexID) =>
        moveRange[hexID].isDisengage ||
        (moveRange[hexID]?.fallDamage ?? 0) > 0 ||
        moveRange[hexID].isActionGlyph
    ),
  }
}
// Use this when you know the playerID and stage to put one player in, and need the rest to go to an idle stage
export function getActivePlayersIdleStage({
  gamePlayerIDs,
  activePlayerID,
  activeStage,
  idleStage,
}: {
  gamePlayerIDs: string[]
  activePlayerID: string
  activeStage: string
  idleStage: string
}) {
  return gamePlayerIDs.reduce((prev, curr) => {
    if (curr === activePlayerID) {
      return { ...prev, [curr]: activeStage }
    }
    return { ...prev, [curr]: idleStage }
  }, {})
}

export function generateReadyStateForNumPlayers(
  numPlayers: number,
  defaultValue: boolean
): PlayerStateToggle {
  const rdyState: { [key: string]: boolean } = {}
  for (let index = 0; index < numPlayers; index++) {
    rdyState[index] = defaultValue
  }
  const result = rdyState
  return result
}

export function isFluidTerrainHex(terrain: string) {
  if (
    terrain === HexTerrain.water ||
    terrain === HexTerrain.lava ||
    terrain === HexTerrain.swampWater ||
    terrain === HexTerrain.ice ||
    terrain === HexTerrain.shadow
  ) {
    return true
  } else {
    return false
  }
}

export function getDefaultSubTerrainForTerrain(terrain: string) {
  // for fluid types, this returns some type of sub terrain, but for solid types, it just returns terrain
  if (terrain === HexTerrain.lava) {
    return HexTerrain.lavaField
  }
  if (terrain === HexTerrain.water) {
    return HexTerrain.rock
  }
  if (terrain === HexTerrain.swampWater) {
    return HexTerrain.swamp
  }
  if (terrain === HexTerrain.ice) {
    return HexTerrain.snow
  }
  if (terrain === HexTerrain.shadow) {
    return HexTerrain.dungeon
  } 
  else {
    return terrain
  }
}

export function generateTimestampID(): string {
  return new Date().getTime().toString()
}
