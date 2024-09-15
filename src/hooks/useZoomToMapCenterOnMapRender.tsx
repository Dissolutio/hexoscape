import { useEffect } from 'react'
import { getBoardHexesRectangularMapDimensions } from '../game/hex-utils'
import { CameraControls } from '@react-three/drei'
import { BoardHexes } from '../game/types'

export const useZoomToMapCenterOnMapRender = ({
  cameraControlsRef,
  boardHexes,
}: {
  cameraControlsRef: React.MutableRefObject<CameraControls>
  boardHexes: BoardHexes
}) => {
  useEffect(() => {
    // Set the camera position to the center of the map

    const { width, height, maxAltitude } =
      getBoardHexesRectangularMapDimensions(boardHexes)
    const heightCameraAboveMap = maxAltitude * 2
    const centerOfMapCamera = {
      x: width / 2,
      z: height / 2,
      y: heightCameraAboveMap,
    }
    const centerOfMapLookAt = {
      x: width / 2,
      z: height / 2,
      y: 0,
    }
    cameraControlsRef.current.setLookAt(
      // from
      centerOfMapCamera.x,
      centerOfMapCamera.y,
      centerOfMapCamera.z,
      // at
      centerOfMapLookAt.x,
      centerOfMapLookAt.y,
      centerOfMapLookAt.z,
      true
    )
    // only run on render, empty dep array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
