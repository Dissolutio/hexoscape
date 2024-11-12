import { useState } from 'react'
import { Vector3, } from 'three'
import { BoardHex, Glyphs, MoveRange } from '../game/types'
import {
  eighthLevel,
  isFluidTerrainHex,
  quarterLevel,
} from '../game/constants'
import { selectGlyphForHex } from '../game/selectors'
import { powerGlyphs } from '../game/glyphs'
import { HeightRings } from './HeightRings'
import { MapHexGlyph } from './MapHexGlyph'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { getBoardHex3DCoords } from '../game/map-utils'


export const MapHex3D = ({
  playerID,
  boardHex,
  glyphs,
  selectedUnitMoveRange,
  isEditor,
}: {
  playerID: string
  boardHex: BoardHex
  glyphs: Glyphs
  selectedUnitMoveRange: MoveRange
  isEditor: boolean
}) => {
  const { x, z } = getBoardHex3DCoords(boardHex)
  // HOVERED STATE
  const [isHovered] = useState(false)
  const altitude = boardHex.altitude
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  const hexYPosition = altitude / 4
  const bottomRingYPosition = hexYPosition - altitude / 2
  const topRingYPosition = isFluidHex
    ? hexYPosition + quarterLevel
    : hexYPosition

  const hexPosition = new Vector3(x, hexYPosition, z)
  const yAdjustFluidCap = altitude / 2
  const yAdjustSolidCap = yAdjustFluidCap - eighthLevel

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
  const sleightLiftFromSurface = 0.15
  const glyphPosition = new Vector3(
    x,
    glyphYAdjust + sleightLiftFromSurface,
    z - sleightOffsetFromCenterOfHex
  )

  return (
    <group>
      <MapHexIDDisplay boardHexID={boardHex.id} glyphPosition={glyphPosition} />

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
    </group>
  )
}
