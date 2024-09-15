import { CAMERA_FOV } from "../app/constants"

export const getMapCenterCameraLookAt = (width: number, height: number): [number, number, number, number, number, number, boolean] => {
    const alpha = CAMERA_FOV / 2
    const beta = 90 - alpha // 180 degrees in a right-triangle
    const heightCameraFitMapInFov = (width / 2) * Math.tan(beta) * 1.1 // zooms out to 1.1 to give a little space (it was too tight on mobile)
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
    return [
      // from
      centerOfMapCamera.x,
      centerOfMapCamera.y,
      centerOfMapCamera.z,
      // at
      centerOfMapLookAt.x,
      centerOfMapLookAt.y,
      centerOfMapLookAt.z,
      true
    ]
  }