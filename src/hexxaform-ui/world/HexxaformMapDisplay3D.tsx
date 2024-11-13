import { useRef } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'

import {
  BoardHex,
  BoardHexes,
  Glyphs,
  HexTerrain,
} from '../../game/types'
import { MapHex3D } from '../../shared/MapHex3D'
import { HexxaformMoves, PenMode } from '../../game/hexxaform/hexxaform-types'
import { useHexxaformContext } from '../useHexxaformContext'
import getVSTileTemplate from '../virtualscape/tileTemplates'
import { generateHexID, isFluidTerrainHex } from '../../game/constants'
import InstanceSubTerrainWrapper from '../../shared/world/InstanceSubTerrain'
import InstanceCapWrapper from '../../shared/world/InstanceCapWrapper'
import InstanceEmptyHexCap from '../../shared/world/InstanceEmptyHexCap'
import InstanceFluidHexCap from '../../shared/world/InstanceFluidHexCap'
import InstanceSolidHexCap from '../../shared/world/InstanceSolidHexCap'
import { useZoomCameraToMapCenter } from '../../hooks/useZoomCameraToMapCenter'


let rotation = 0

export function HexxaformMapDisplay3D({
  boardHexes,
  hexMapID,
  moves,
  glyphs,
  cameraControlsRef,
}: {
  boardHexes: BoardHexes
  hexMapID: string
  moves: HexxaformMoves
  glyphs: Glyphs
  cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
  useZoomCameraToMapCenter({
    cameraControlsRef,
    boardHexes,
    mapID: hexMapID,
  })
  const {
    voidHex,
    voidStartZone,
    paintStartZone,
    paintWaterHex,
    paintGrassTile,
  } = moves
  const { penMode, pieceSize } = useHexxaformContext()
  const hoverID = useRef('')

  const onPointerDown = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
    if (event.button === 2) return // ignore right clicks
    event.stopPropagation()
    // Early out if camera is active
    if (cameraControlsRef.current.active) return
    cameraControlsRef.current
    const isVoidTerrainHex = hex.terrain === HexTerrain.empty
    if (penMode === PenMode.eraser && !isVoidTerrainHex) {
      voidHex({ hexID: hex.id })
    }
    if (penMode === PenMode.eraserStartZone) {
      voidStartZone({ hexID: hex.id })
    }
    if (penMode === PenMode.grass) {
      const hexIDArr = getVSTileTemplate({
        clickedHex: { q: hex.q, r: hex.r, s: hex.s },
        rotation: rotation++ % 6,
        template: `${pieceSize}`, // DEV: Only land pieces will have their size as their template name, future things will have a string
      }).map((h) => generateHexID(h))
      paintGrassTile({ hexIDArr, altitude: hex.altitude })
    }
    // last letter in string is playerID, but this seems inelegant
    if (penMode.slice(0, -1) === 'startZone') {
      paintStartZone({ hexID: hex.id, playerID: penMode.slice(-1) })
    }
    if (penMode === PenMode.water) {
      paintWaterHex({ hexID: hex.id })
    }
  }

  const emptyHexCaps = Object.values(boardHexes).filter((bh) => {
    return bh.terrain === HexTerrain.empty
  })
  const fluidHexCaps = Object.values(boardHexes).filter((bh) => {
    return bh.terrain !== HexTerrain.empty && isFluidTerrainHex(bh.terrain)
  })
  const solidHexCaps = Object.values(boardHexes).filter((bh) => {
    return bh.terrain !== HexTerrain.empty && !isFluidTerrainHex(bh.terrain)
  })
  const onPointerEnter = (_e: ThreeEvent<PointerEvent>, hex: BoardHex) => {
    hoverID.current = hex.id
  }
  const onPointerOut = (_e: ThreeEvent<PointerEvent>) => {
    hoverID.current = ''
  }

  return (
    <>
      <InstanceCapWrapper
        capHexesArray={emptyHexCaps}
        glKey={'InstanceEmptyHexCap-'}
        component={InstanceEmptyHexCap}
        onPointerEnter={onPointerEnter}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
      />

      <InstanceCapWrapper
        capHexesArray={fluidHexCaps}
        glKey={'InstanceFluidHexCap-'}
        component={InstanceFluidHexCap}
        onPointerEnter={onPointerEnter}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
      />

      <InstanceCapWrapper
        capHexesArray={solidHexCaps}
        glKey={'InstanceSolidHexCap-'}
        component={InstanceSolidHexCap}
        onPointerEnter={onPointerEnter}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
      />

      <InstanceSubTerrainWrapper glKey={'InstanceSubTerrain-'} boardHexes={Object.values(boardHexes).filter(bh => !(bh.terrain === HexTerrain.empty))} />

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

