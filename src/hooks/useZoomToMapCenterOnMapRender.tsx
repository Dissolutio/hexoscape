import { useEffect } from 'react'
import { getBoardHexesRectangularMapDimensions } from '../game/hex-utils'
import { CameraControls } from '@react-three/drei'
import { BoardHexes } from '../game/types'
import { getMapCenterCameraLookAt } from '../shared/camera-utils'

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
    const { width, height } = getBoardHexesRectangularMapDimensions(boardHexes)
    const cameraArgs = getMapCenterCameraLookAt(width, height)
    cameraControlsRef.current.setLookAt(...cameraArgs)
    // only run on render and load-new-map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapID])
}
