import { useState } from 'react'
import { Vector3, Color } from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { BoardHex, EditingBoardHexes, Glyphs, MoveRange } from '../game/types'
import {
  getDefaultSubTerrainForTerrain,
  HEXGRID_HEX_HEIGHT,
  isFluidTerrainHex,
} from '../game/constants'
import { selectGlyphForHex } from '../game/selectors'
import { powerGlyphs } from '../game/glyphs'
import { HeightRings } from './HeightRings'
import { MapHexGlyph } from './MapHexGlyph'
import { hexTerrainColor } from '../game/terrain'
import HexCap from './world/HexCap'
import HexSubTerrain from './world/HexSubTerrain'

const halfLevel = HEXGRID_HEX_HEIGHT / 2
const quarterLevel = HEXGRID_HEX_HEIGHT / 4

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

  const altitude = boardHex.altitude
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  const hexYPosition = altitude / 4
  const bottomRingYPosition = hexYPosition - altitude / 2
  const topRingYPosition = isFluidHex
    ? hexYPosition + quarterLevel
    : hexYPosition

  const hexPosition = new Vector3(x, hexYPosition, z)
  const heightScaleSubTerrain = isFluidHex
    ? altitude - halfLevel
    : altitude - quarterLevel
  const mysteryMathValueThatSeemsToWorkWell = quarterLevel / 4
  const yAdjustFluidCap = altitude / 2
  const yAdjustSolidCap = yAdjustFluidCap - mysteryMathValueThatSeemsToWorkWell
  const subTerrain =
    boardHex?.subTerrain ?? getDefaultSubTerrainForTerrain(boardHex.terrain)
  const subTerrainYAdjust = (altitude - quarterLevel) / 4
  const subTerrainPosition = new Vector3(x, subTerrainYAdjust, z)
  const subTerrainColor = new Color(hexTerrainColor[subTerrain])

  /* GLYPHS */
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
      />
      <HexSubTerrain
        subTerrainPosition={subTerrainPosition}
        heightScaleSubTerrain={heightScaleSubTerrain}
        subTerrainColor={subTerrainColor}
      />

      <HexCap
        x={x}
        z={z}
        boardHex={boardHex}
        editingBoardHexes={editingBoardHexes}
        selectedUnitID={selectedUnitID}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        isPlacementPhase={isPlacementPhase}
        onClick={onClick}
      />
    </group>
  )
}
