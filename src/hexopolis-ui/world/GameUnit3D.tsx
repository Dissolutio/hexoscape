import React, { useState } from 'react'
import { CameraControls } from '@react-three/drei'

import { BoardHex, GameUnit } from '../../game/types'
import {
  getBoardHex3DCoords,
  getDirectionOfNeighbor,
} from '../../game/hex-utils'
import { usePlacementContext } from '../contexts'
import { useBgioCtx, useBgioG } from '../../bgio-contexts'
import { selectTailHexForUnit } from '../../game/selectors'
import { UnitModelByID } from './models/UnitModelByID'
import { getUnitDefaultCameraLookAt } from '../../shared/camera-utils'
import { HEXGRID_HEX_HEIGHT } from '../../game/constants'

export const GameUnit3D = ({
  gameUnit,
  boardHex,
  cameraControlsRef,
}: {
  gameUnit: GameUnit
  boardHex: BoardHex
  cameraControlsRef: React.MutableRefObject<CameraControls>
}) => {
  const { boardHexes } = useBgioG()
  const { isPlacementPhase } = useBgioCtx()
  const { editingBoardHexes } = usePlacementContext()
  const { x, z } = getBoardHex3DCoords(boardHex)
  const positionY = boardHex.altitude * HEXGRID_HEX_HEIGHT
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
      }}
      position={[x, positionY, z]}
      rotation={[0, rotationY, 0]}
    >
      <UnitModelByID gameUnit={gameUnit} isHovered={isHovered} />
    </group>
  )
}
