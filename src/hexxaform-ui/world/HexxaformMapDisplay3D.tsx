import { useState } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import {
  BoardHex,
  BoardHexes,
  Glyphs,
  HexMap,
  HexTerrain,
} from '../../game/types'
import { MapHex3D } from '../../shared/MapHex3D'
import { useZoomCameraToMapCenter } from '../../hooks/useZoomCameraToMapCenter'
import { HexxaformMoves, PenMode } from '../../game/hexxaform/hexxaform-types'
import { useHexxaformContext } from '../useHexxaformContext'
import InstanceSubTerrain from '../../shared/world/InstanceSubTerrain'
import { getFlatTileHexes } from '../virtualscape/flatTile'
import { generateHexID, isFluidTerrainHex } from '../../game/constants'
import InstanceSolidHexCapCountWrapper from '../../shared/world/InstanceSolidHexCap'
import InstanceFluidHexCapCountWrapper from '../../shared/world/InstanceFluidHexCap'


export function HexxaformMapDisplay3D({
  boardHexes,
  hexMap,
  moves,
  cameraControlsRef,
  glyphs,
}: {
  boardHexes: BoardHexes
  hexMap: HexMap
  moves: HexxaformMoves
  cameraControlsRef: React.MutableRefObject<CameraControls>
  glyphs: Glyphs
}) {
  useZoomCameraToMapCenter({
    cameraControlsRef,
    boardHexes,
    mapID: hexMap.id,
  })
  const {
    voidHex,
    voidStartZone,
    paintStartZone,
    paintWaterHex,
    paintGrassTile,
    paintSandHex,
    paintRockHex,
  } = moves
  const { penMode, pieceSize } = useHexxaformContext()
  const [hoverID, setHoverID] = useState('')
  const handleHover = (id: string) => {
    setHoverID(id)
  }
  const handleUnhover = () => {
    setHoverID('')
  }


  const onClick = (event: ThreeEvent<MouseEvent>, hex: BoardHex) => {
    // Prevent this click from going through to other hexes
    event.stopPropagation()
    // const isVoidTerrainHex = hex.terrain === HexTerrain.empty
    const isVoidTerrainHex = hex.terrain === HexTerrain.empty
    if (penMode === PenMode.eraser && !isVoidTerrainHex) {
      voidHex({ hexID: hex.id })
    }
    if (penMode === PenMode.eraserStartZone) {
      voidStartZone({ hexID: hex.id })
    }
    // last letter in string is playerID, but this seems inelegant
    if (penMode.slice(0, -1) === 'startZone') {
      paintStartZone({ hexID: hex.id, playerID: penMode.slice(-1) })
    }
    if (penMode === PenMode.water) {
      paintWaterHex({ hexID: hex.id })
    }
    if (penMode === PenMode.grass) {
      const hexIDArr = getFlatTileHexes({
        clickedHex: { q: hex.q, r: hex.r, s: hex.s },
        rotation: 0,
        size: pieceSize,
      }).map((h) => generateHexID(h))
      paintGrassTile({ hexIDArr, altitude: hex.altitude })
    }
    if (penMode === PenMode.sand) {
      paintSandHex({ hexID: hex.id, thickness: 1 })
    }
    if (penMode === PenMode.rock) {
      paintRockHex({ hexID: hex.id, thickness: 1 })
    }
  }

  return (
    <>
      <InstanceSubTerrain boardHexes={boardHexes} />
      <InstanceSolidHexCapCountWrapper
        capHexesArray={Object.values(boardHexes).filter((bh) => {
          return !isFluidTerrainHex(bh.terrain)
        })}
        onClick={onClick}
        handleHover={handleHover}
        handleUnhover={handleUnhover}
      />
      <InstanceFluidHexCapCountWrapper
        capHexesArray={Object.values(boardHexes).filter((bh) => {
          return isFluidTerrainHex(bh.terrain)
        })}
        onClick={onClick}
        handleHover={handleHover}
        handleUnhover={handleUnhover}
      />
      {Object.values(boardHexes).map((bh: any) => {
        return (
          <MapHex3D
            playerID={'0'}
            boardHex={bh}
            glyphs={glyphs}
            selectedUnitMoveRange={{}}
            isEditor={true}
            key={`${bh.id}-${bh.altitude}`}
          />
        )
      })}
    </>
  )
}

