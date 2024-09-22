import React, { useState } from 'react'
import { CameraControls } from '@react-three/drei'

import { BoardHex, GameUnit } from '../../game/types'
import {
  getBoardHex3DCoords,
  getDirectionOfNeighbor,
} from '../../game/hex-utils'
import { usePlacementContext } from '../contexts'
import { useBgioClientInfo, useBgioCtx, useBgioG } from '../../bgio-contexts'
import { selectHexForUnit, selectTailHexForUnit } from '../../game/selectors'
import { UnitModelByID } from './models/UnitModelByID'
import { getUnitDefaultCameraLookAt } from '../../shared/camera-utils'

export const GameUnit3D = ({
  gameUnit,
  boardHex,
  x,
  z,
  cameraControlsRef,
}: {
  gameUnit: GameUnit
  boardHex: BoardHex
  x: number
  z: number
  cameraControlsRef: React.MutableRefObject<CameraControls>
  // onClick?: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
}) => {
  const { boardHexes, gameUnits } = useBgioG()
  const { isPlacementPhase } = useBgioCtx()
  const { editingBoardHexes } = usePlacementContext()

  const positionX = x
  const positionZ = z
  const positionY = boardHex.altitude / 2
  const tailHex = selectTailHexForUnit(
    gameUnit.unitID,
    isPlacementPhase ? editingBoardHexes : boardHexes
  )
  const directionToTail = tailHex
    ? getDirectionOfNeighbor(boardHex, tailHex)
    : undefined
  const rotationToTail = ((directionToTail ?? 0) * Math.PI) / 3 + Math.PI
  const playerAdjustedRotationForSingleHexFigures =
    (gameUnit.rotation * Math.PI) / 3
  const rotationY = gameUnit.is2Hex
    ? rotationToTail
    : playerAdjustedRotationForSingleHexFigures
  const [isHovered, setIsHovered] = useState(false)
  const { playerID } = useBgioClientInfo()
  const randomEnemyUnit = Object.values(gameUnits).find(
    (u) => u.playerID !== playerID
  )
  const hexForRandomEnemyUnit = selectHexForUnit(
    randomEnemyUnit?.unitID ?? '',
    boardHexes
  )

  return (
    <group
      onPointerEnter={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerLeave={() => {
        setIsHovered(false)
      }}
      onClick={() => {
        const args = getUnitDefaultCameraLookAt(boardHex, boardHexes)
        cameraControlsRef.current.setLookAt(...args)
        cameraControlsRef.current.truck(0, 20, true)
        // cameraControlsRef.current.azimuthAngle = 0
        // cameraControlsRef.current.polarAngle = Math.PI / 8
        // cameraControlsRef.current.zoom(10, true) // Zoom is crazy
        // console.log(
        //   '🚀 ~ cameraControlsRef.current.zoom:',
        //   cameraControlsRef.current.zoom(0.1, false)
        // )
      }}
      position={[positionX, positionY, positionZ]}
      rotation={[0, rotationY, 0]}
    >
      <UnitModelByID gameUnit={gameUnit} isHovered={isHovered} />
    </group>
  )
}
