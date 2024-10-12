import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import {
  BoardHex,
  BoardHexes,
  Glyphs,
  HexMap,
  HexTerrain,
} from '../../game/types'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { MapHex3D } from '../../shared/MapHex3D'
import { useZoomToMapCenterOnMapRender } from '../../hooks/useZoomToMapCenterOnMapRender'
import { HexxaformMoves, PenMode } from '../../game/hexxaform/hexxaform-types'
import { useMapContext } from '../useMapContext'

/**
 * React component that renders the 3D hexmap.
 *
 * Takes a `cameraControlsRef` as a prop, which is a mutable ref to a
 * `react-three-fiber` `CameraControls` component.
 *
 * The component renders a collection of `Hex3D` components, one for each hex
 * in the game's `boardHexes` object. Each `Hex3D` is given the `cameraControlsRef`
 * and the `boardHexID` of the corresponding hex in the `boardHexes` object.
 *
 * The component returns a fragment containing all the `Hex3D` components.
 */
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
  useZoomToMapCenterOnMapRender({
    cameraControlsRef,
    boardHexes,
    mapID: hexMap.mapId,
  })
  return (
    <>
      {Object.values(boardHexes).map((bh: any) => {
        return (
          <HexxaformHex3D
            playerID="0"
            boardHexID={bh.id}
            boardHexes={boardHexes}
            glyphs={glyphs}
            moves={moves}
            cameraControlsRef={cameraControlsRef}
            key={`${bh.id}-${bh.altitude}`}
          />
        )
      })}
    </>
  )
}

const HexxaformHex3D = ({
  playerID,
  boardHexID,
  boardHexes,
  glyphs,
  moves,
  cameraControlsRef,
}: {
  playerID: string
  boardHexID: string
  boardHexes: BoardHexes
  glyphs: Glyphs
  moves: HexxaformMoves
  cameraControlsRef: React.MutableRefObject<CameraControls>
}) => {
  const {
    voidHex,
    voidStartZone,
    paintStartZone,
    incAltitudeOfHex,
    decAltitudeOfHex,
    paintWaterHex,
    paintGrassHex,
    paintSandHex,
    paintRockHex,
  } = moves
  const { penMode, penThickness } = useMapContext()
  const boardHex = boardHexes[boardHexID]

  const onClick = (event: ThreeEvent<MouseEvent>, hex: BoardHex) => {
    // const isVoidTerrainHex = hex.terrain === HexTerrain.void
    // if (penMode === PenMode.eraser && !isVoidTerrainHex) {
    //   voidHex({ hexID: hex.id })
    // }
    // if (penMode === PenMode.eraserStartZone) {
    //   voidStartZone({ hexID: hex.id })
    // }
    // last letter in string is playerID, but this seems inelegant
    // if (penMode.slice(0, -1) === 'startZone') {
    //   paintStartZone({ hexID: hex.id, playerID: penMode.slice(-1) })
    // }
    // if (penMode === PenMode.incAltitude && !isVoidTerrainHex) {
    //   incAltitudeOfHex({ hexID: hex.id })
    // }
    // if (penMode === PenMode.decAltitude && !isVoidTerrainHex) {
    //   decAltitudeOfHex({ hexID: hex.id })
    // }
    if (penMode === PenMode.water) {
      paintWaterHex({ hexID: hex.id })
    }
    if (penMode === PenMode.grass) {
      paintGrassHex({ hexID: hex.id, thickness: penThickness })
    }
    if (penMode === PenMode.sand) {
      paintSandHex({ hexID: hex.id, thickness: penThickness })
    }
    if (penMode === PenMode.rock) {
      paintRockHex({ hexID: hex.id, thickness: penThickness })
    }
  }

  const {
    x: positionX,
    y: positionY,
    z: positionZ,
  } = getBoardHex3DCoords(boardHex)

  return (
    <>
      <MapHex3D
        x={positionX}
        z={positionZ}
        playerID={playerID}
        boardHex={boardHex}
        onClick={onClick}
        glyphs={glyphs}
        isPlacementPhase={false}
        editingBoardHexes={{}}
        selectedUnitID={''}
        selectedUnitMoveRange={{}}
        isEditor={true}
      />
    </>
  )
}
