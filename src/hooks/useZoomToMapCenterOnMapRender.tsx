import { useEffect } from 'react'
import { getBoardHexesRectangularMapDimensions } from '../game/hex-utils'
import { CameraControls } from '@react-three/drei'
import { BoardHexes } from '../game/types'

export const useZoomToMapCenterOnMapRender = ({
  cameraControlsRef,
  boardHexes,
  mapID,
}: {
  cameraControlsRef: React.MutableRefObject<CameraControls>
  boardHexes: BoardHexes
  mapID: string
}) => {
  useEffect(() => {
    // Set the camera position to the center of the map

    const { width, height, heightCameraFitMapInFov } =
      getBoardHexesRectangularMapDimensions(boardHexes)
    const centerOfMapCamera = {
      x: width / 2,
      z: height / 2,
      y: heightCameraFitMapInFov,
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
    // only run on render and load-new-map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapID])
}
