import { useEffect } from 'react'
import { CameraControls } from '@react-three/drei'
import { BoardHexes } from '../game/types'
import { getMapCenterCameraLookAt } from '../shared/camera-utils'

export const useZoomCameraToMapCenter = ({
  cameraControlsRef,
  boardHexes,
  mapID,
}: {
  cameraControlsRef: React.MutableRefObject<CameraControls>
  boardHexes: BoardHexes
  mapID: string
}) => {
  useEffect(() => {
    const cameraArgs = getMapCenterCameraLookAt(boardHexes)
    cameraControlsRef.current.setLookAt(...cameraArgs)
    // only run on render and load-new-map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapID])
}
