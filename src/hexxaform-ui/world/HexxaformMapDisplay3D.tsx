import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { BoardHex, BoardHexes, Glyphs, HexMap } from '../../game/types'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { MapHex3D } from '../../shared/MapHex3D'
import { useZoomToMapCenterOnMapRender } from '../../hooks/useZoomToMapCenterOnMapRender'

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
  cameraControlsRef,
  boardHexes,
  glyphs,
  hexMap,
}: {
  cameraControlsRef: React.MutableRefObject<CameraControls>
  boardHexes: BoardHexes
  glyphs: Glyphs
  hexMap: HexMap
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
  cameraControlsRef,
}: {
  playerID: string
  boardHexID: string
  boardHexes: BoardHexes
  glyphs: Glyphs
  cameraControlsRef: React.MutableRefObject<CameraControls>
}) => {
  const boardHex = boardHexes[boardHexID]

  const onClick = (event: ThreeEvent<MouseEvent>, sourceHex: BoardHex) => {
    console.log('🚀 ~ onClick ~ event, sourceHex:', event, sourceHex)
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
