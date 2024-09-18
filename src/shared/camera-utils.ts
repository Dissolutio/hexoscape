import { CAMERA_FOV, HEXGRID_HEX_HEIGHT } from "../game/constants"
import { getBoardHex3DCoords, getBoardHexesRectangularMapDimensions } from "../game/hex-utils"
import { BoardHex, BoardHexes, GameUnit } from "../game/types"

type CameraLookAtArgs = [number, number, number, number, number, number, boolean] 

export const getMapCenterCameraLookAt = (boardHexes: BoardHexes): CameraLookAtArgs => {
  const { width, height } = getBoardHexesRectangularMapDimensions(boardHexes)
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
  export const getUnitDefaultCameraLookAt = ( boardHex: BoardHex, boardHexes: BoardHexes): CameraLookAtArgs => { 
    const { width, height } = getBoardHexesRectangularMapDimensions(boardHexes)
    const {
      x,
      z,
    } = getBoardHex3DCoords(boardHex)
    const hexHeight = boardHex.altitude * HEXGRID_HEX_HEIGHT
    const lilExtra = 10
    const y = hexHeight + lilExtra
      const unitOverheadCamera = {
        x,
        z,
        y,
      }
      const centerOfMapLookAt = {
        x: width / 2,
        z: height / 2,
        y: 0,
      }
      const midpointOfUnitAndCenterOfMap = {
        x: (unitOverheadCamera.x + centerOfMapLookAt.x) / 2,
        z: (unitOverheadCamera.z + centerOfMapLookAt.z) / 2,
        y: 0,
    }
    return [
      // from
      unitOverheadCamera.x,
      unitOverheadCamera.y,
      unitOverheadCamera.z,
      // at
      midpointOfUnitAndCenterOfMap.x,
      midpointOfUnitAndCenterOfMap.y,
      midpointOfUnitAndCenterOfMap.z,
      true
    ]
  }