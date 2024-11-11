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
import getVSTileTemplate from '../virtualscape/tileTemplates'
import { generateHexID, isFluidTerrainHex } from '../../game/constants'
import InstanceSubTerrainWrapper from '../../shared/world/InstanceSubTerrain'
import { useMemo, useState } from 'react'
import InstanceCapWrapper from '../../shared/world/InstanceCapWrapper'
import InstanceEmptyHexCap from '../../shared/world/InstanceEmptyHexCap'
import InstanceFluidHexCap from '../../shared/world/InstanceFluidHexCap'
import InstanceSolidHexCap from '../../shared/world/InstanceSolidHexCap'
import { useUIContext } from '../../hooks/ui-context'
import { BufferGeometry, Color, InstancedMesh, InstancedMeshEventMap, Material, NormalBufferAttributes } from 'three'

type InstanceRef = React.MutableRefObject<InstancedMesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], InstancedMeshEventMap>>

let rotation = 0
const tempColor1 = new Color()
const tempColor2 = new Color()

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
  } = moves
  const { penMode, pieceSize } = useHexxaformContext()
  const { isCameraActive, toggleIsCameraDisabled } = useUIContext()
  const [hoverID, setHoverID] = useState('')

  const onClick = useMemo(() => {
    return (event: ThreeEvent<MouseEvent>, hex: BoardHex) => {
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
      if (penMode === PenMode.grass) {
        const hexIDArr = getVSTileTemplate({
          clickedHex: { q: hex.q, r: hex.r, s: hex.s },
          rotation: rotation++ % 6,
          size: pieceSize,
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

  }, [paintGrassTile, paintStartZone, paintWaterHex, penMode, pieceSize, voidHex, voidStartZone])

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
    if (isCameraActive) return
    setHoverID(hex.id)
  }
  const onPointerOut = (_e: ThreeEvent<PointerEvent>, hex: BoardHex) => {
    if (isCameraActive) return
    setHoverID('')
  }

  const onPointerDown = (e: ThreeEvent<PointerEvent>, hex: BoardHex) => {
    if (e.button === 2) return // ignore right clicks
    if (isCameraActive) return
    e.stopPropagation();
    toggleIsCameraDisabled(true)
    onClick(e, hex)
  }
  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2) return // ignore right clicks
    toggleIsCameraDisabled(false)
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
        onPointerUp={onPointerUp}
      />

      <InstanceCapWrapper
        capHexesArray={fluidHexCaps}
        glKey={'InstanceFluidHexCap-'}
        component={InstanceFluidHexCap}
        onPointerEnter={onPointerEnter}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      />

      <InstanceCapWrapper
        capHexesArray={solidHexCaps}
        glKey={'InstanceSolidHexCap-'}
        component={InstanceSolidHexCap}
        onPointerEnter={onPointerEnter}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
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

