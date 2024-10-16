import { useState } from 'react'
import { Vector3, Color } from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import {
  BoardHex,
  EditingBoardHexes,
  Glyphs,
  MoveRange,
  StringKeyedObj,
} from '../game/types'
import {
  getDefaultSubTerrainForTerrain,
  HEXGRID_HEX_HEIGHT,
  isFluidTerrainHex,
} from '../game/constants'
import { selectGlyphForHex } from '../game/selectors'
import { powerGlyphs } from '../game/glyphs'
import { HeightRings } from './HeightRings'

const halfLevel = 0.25
const quarterLevel = 0.125

const hexTerrainColor: StringKeyedObj = {
  grass: '#60840d',
  water: '#3794fd',
  rock: '#475776',
  road: '#868686',
  sand: '#ab8e10',
}
/**
 * @function MapHex3D
 * @description A single hex on the board. It renders:
 * - A sub-terrain mesh (from the floor to the cap mesh)
 * - A cap-terrain mesh (either fluid or solid)
 * - A group of height rings around the cap-terrain (for height indication)
 * - A glyph on the hex (if there is one)
 *
 * The hex also listens to pointer events, and triggers hover effects on the top height ring and the cap-terrain mesh.
 *
 * @prop {number} x - The x-coordinate of the hex
 * @prop {number} z - The z-coordinate of the hex
 * @prop {BoardHex} boardHex - The board hex data
 * @prop {function} onClick - An optional function to call when the hex is clicked
 */
export const MapHex3D = ({
  x,
  z,
  playerID,
  boardHex,
  onClick,
  glyphs,
  isPlacementPhase,
  editingBoardHexes,
  selectedUnitID,
  selectedUnitMoveRange,
  isEditor,
  startZones,
}: {
  x: number
  z: number
  playerID: string
  boardHex: BoardHex
  onClick?: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
  glyphs: Glyphs
  isPlacementPhase: boolean
  editingBoardHexes: EditingBoardHexes
  selectedUnitID: string
  selectedUnitMoveRange: MoveRange
  isEditor: boolean
}) => {
  // HOVERED STATE
  const [isHovered, setIsHovered] = useState(false)

  const unitID = boardHex?.occupyingUnitID ?? ''
  const editingHexUnitID = editingBoardHexes[boardHex.id]?.occupyingUnitID ?? ''
  const isSelectedUnitHex =
    selectedUnitID &&
    (isPlacementPhase ? editingHexUnitID : unitID) &&
    selectedUnitID === (isPlacementPhase ? editingHexUnitID : unitID)

  const altitude = boardHex.altitude
  const hexYPosition = altitude / 4
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  const bottomRingYPosition = hexYPosition - altitude / 2
  const topRingYPosition = isFluidHex
    ? hexYPosition + quarterLevel
    : hexYPosition

  const hexPosition = new Vector3(x, hexYPosition, z)
  const heightScaleSubTerrain = isFluidHex
    ? altitude - halfLevel
    : altitude - quarterLevel
  const heightScaleFluidCap = 1
  const heightScaleSolidCap = halfLevel
  const scaleToUseForCap = isFluidHex
    ? heightScaleFluidCap
    : heightScaleSolidCap
  // as of yet, this just looks right, it's not mathematically sound
  const mysteryMathValueThatSeemsToWorkWell = quarterLevel / 4
  const yAdjustFluidCap = altitude / 2
  const yAdjustSolidCap = yAdjustFluidCap - mysteryMathValueThatSeemsToWorkWell
  const hexCapYAdjust = isFluidHex ? yAdjustFluidCap : yAdjustSolidCap
  const capPosition = new Vector3(x, hexCapYAdjust, z)
  const subTerrain =
    boardHex?.subTerrain ?? getDefaultSubTerrainForTerrain(boardHex.terrain)
  const subTerrainYAdjust = (altitude - quarterLevel) / 4
  const subTerrainPosition = new Vector3(x, subTerrainYAdjust, z)

  const whiteColor = new Color('white')
  const terrainColor = new Color(hexTerrainColor[boardHex.terrain])
  // const isPlaceableOccupiedPlacementHex =
  //   isMyStartZoneHex &&
  //   occupyingPlacementUnitId &&
  //   occupyingPlacementUnitId !== selectedUnitID

  const capEmissiveColor =
    isHovered || isSelectedUnitHex ? whiteColor : terrainColor
  const baseEmissivity = 0.2
  const capFluidOpacity = 0.85
  const fluidEmissivity = 2 * baseEmissivity
  const capEmissiveIntensity = isHovered ? 1 : baseEmissivity
  const capFluidEmissiveIntensity = isHovered ? 8 : fluidEmissivity
  const subTerrainColor = new Color(hexTerrainColor[subTerrain])

  /* 
    GLYPHS
     */
  const glyphOnHex = selectGlyphForHex({ hexID: boardHex.id, glyphs })
  const isGlyphRevealed = Boolean(glyphOnHex?.isRevealed)
  const canonicalGlyph = powerGlyphs[glyphOnHex?.glyphID ?? '']
  const glyphShortName = canonicalGlyph?.shortName || ''
  const glyphText = isGlyphRevealed ? glyphShortName : '?'
  const layerBetweenHexCapAndUnitFeet = 0.01
  const glyphYAdjust = isFluidHex
    ? yAdjustFluidCap + layerBetweenHexCapAndUnitFeet
    : yAdjustSolidCap + layerBetweenHexCapAndUnitFeet
  const sleightOffsetFromCenterOfHex = 0.2
  const glyphPosition = new Vector3(
    x,
    glyphYAdjust + 0.15,
    z - sleightOffsetFromCenterOfHex
  )

  return (
    <group>
      {/* <MapHexIDDisplay boardHexID={boardHex.id} glyphPosition={glyphPosition} /> */}

      <MapHexGlyph
        glyphOnHex={Boolean(glyphOnHex)}
        glyphText={glyphText}
        glyphPosition={glyphPosition}
        isGlyphRevealed={isGlyphRevealed}
      />

      {/* These rings around the hex cylinder convey height levels to the user, so they can visually see how many levels of height between 2 adjacent hexes */}
      {/* The top ring will be highlighted when we hover the cap-terrain mesh, and also for all sorts of game reasons */}
      <HeightRings
        boardHexID={boardHex.id}
        playerID={playerID}
        selectedUnitMoveRange={selectedUnitMoveRange}
        bottomRingYPos={bottomRingYPosition}
        topRingYPos={topRingYPosition}
        position={hexPosition}
        isHighlighted={isHovered}
        isEditor={isEditor}
        startZones={startZones}
      />

      {/* This is the big sub-terrain mesh from the floor to the cap mesh */}
      <mesh position={subTerrainPosition} scale={[1, heightScaleSubTerrain, 1]}>
        <cylinderGeometry args={[1, 1, HEXGRID_HEX_HEIGHT, 6]} />
        <meshBasicMaterial color={subTerrainColor} />
      </mesh>

      {/* This group wraps the cap-terrain, and triggers the hover for this hex's top height ring */}
      <group
        onClick={(e) => {
          if (onClick) {
            onClick(e, boardHex)
          }
        }}
        onPointerEnter={(e) => {
          // this keeps the hover from penetrating to hoverable-hexes behind this one
          e.stopPropagation()
          setIsHovered(true)
        }}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* The cap hex is either fluid-terrain or solid-terrain */}
        {isFluidHex ? (
          <mesh position={capPosition} scale={[1, scaleToUseForCap, 1]}>
            <meshLambertMaterial
              color={terrainColor}
              emissive={terrainColor}
              emissiveIntensity={capFluidEmissiveIntensity}
              transparent
              opacity={capFluidOpacity}
            />
            <cylinderGeometry args={[1, 1, halfLevel, 6]} />
          </mesh>
        ) : (
          <mesh position={capPosition} scale={[1, scaleToUseForCap, 1]}>
            <meshToonMaterial
              color={terrainColor}
              emissive={capEmissiveColor}
              emissiveIntensity={capEmissiveIntensity}
            />
            <cylinderGeometry args={[1, 1, halfLevel, 6]} />
          </mesh>
        )}
      </group>
    </group>
  )
}

/* 
  MapHexIDDisplay
  This component is expensive to render if there are a lot of hexes
 */
const MapHexIDDisplay = ({
  boardHexID,
  glyphPosition,
}: {
  boardHexID: string
  glyphPosition: Vector3
}) => {
  return (
    <Billboard position={glyphPosition}>
      <Text fontSize={0.3} color={new Color('black')}>
        {boardHexID}
      </Text>
    </Billboard>
  )
}
const MapHexGlyph = ({
  glyphText,
  glyphPosition,
  isGlyphRevealed,
  glyphOnHex,
}: {
  glyphText: string
  glyphPosition: Vector3
  isGlyphRevealed: boolean
  glyphOnHex: boolean
}) => {
  return glyphOnHex ? (
    <group position={glyphPosition}>
      <Billboard position={[isGlyphRevealed ? -1 : -0.5, 0.4, 0]}>
        <Text fontSize={isGlyphRevealed ? 0.3 : 0.6} color={new Color('black')}>
          {glyphText}
        </Text>
      </Billboard>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
        <meshBasicMaterial color={new Color('maroon')} />
      </mesh>
    </group>
  ) : null
}
