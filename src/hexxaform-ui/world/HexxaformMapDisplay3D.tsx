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
import InstanceSolidHexCapCountWrapper from '../../shared/world/InstanceSolidHexCap'
import InstanceFluidHexCapCountWrapper from '../../shared/world/InstanceFluidHexCap'
import InstanceEmptyHexCapCountWrapper from '../../shared/world/InstanceEmptyHexCap'
import InstanceSubTerrainCountWrapper from '../../shared/world/InstanceSubTerrain'

let rotation = 0
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
      const hexIDArr = getVSTileTemplate({
        clickedHex: { q: hex.q, r: hex.r, s: hex.s },
        rotation: rotation++ % 6,
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
      <InstanceEmptyHexCapCountWrapper
        capHexesArray={Object.values(boardHexes).filter((bh) => {
          return bh.terrain === HexTerrain.empty
        })}
        onClick={onClick}
      />

      <InstanceSolidHexCapCountWrapper
        capHexesArray={Object.values(boardHexes).filter((bh) => {
          return bh.terrain !== HexTerrain.empty && !isFluidTerrainHex(bh.terrain)
        })}
        onClick={onClick}
      />
      <InstanceFluidHexCapCountWrapper
        capHexesArray={Object.values(boardHexes).filter((bh) => {
          return bh.terrain !== HexTerrain.empty && isFluidTerrainHex(bh.terrain)
        })}
        onClick={onClick}
      />
      <InstanceSubTerrainCountWrapper boardHexes={Object.values(boardHexes).filter(bh => !(bh.terrain === HexTerrain.empty))} />

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

