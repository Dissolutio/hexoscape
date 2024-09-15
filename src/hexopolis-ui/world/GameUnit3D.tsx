import React, { useState } from 'react'
import { CameraControls, Float } from '@react-three/drei'

import { BoardHex, GameUnit } from '../../game/types'
import {
  getBoardHex3DCoords,
  getDirectionOfNeighbor,
} from '../../game/hex-utils'
import { usePlacementContext, useUIContext } from '../contexts'
import { useBgioClientInfo, useBgioCtx, useBgioG } from '../../bgio-contexts'
import { selectHexForUnit, selectTailHexForUnit } from '../../game/selectors'
import { UnitModelByID } from './models/UnitModelByID'

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
        // we will focus the react three camera on this unit
        const pos = boardHex ? getBoardHex3DCoords(boardHex) : undefined
        const posLookAt = hexForRandomEnemyUnit
          ? getBoardHex3DCoords(hexForRandomEnemyUnit)
          : undefined
        if (pos && posLookAt) {
          // so, we pick the first enemy unit, to look in their direction
          // then, we kick the camera back on the X & Z axes, and kick the look-at similarly towards the target
          // the result is we are looking from a spot a little behind and above our unit, at a spot a little in front of and below our unit, towards the enemy
          const cameraOutKick = 0
          const cameraFromAbove = 10
          const cameraLookBelow = 2
          const dX = pos.x - posLookAt.x > 0 ? cameraOutKick : -cameraOutKick
          const dZ = pos.z - posLookAt.z > 0 ? cameraOutKick : -cameraOutKick
          cameraControlsRef.current.setLookAt(
            // from
            pos.x + dX,
            pos.y + cameraFromAbove,
            pos.z + dZ,
            // at
            pos.x - dX,
            pos.y - cameraLookBelow,
            pos.z - dZ,

            true
          )
        }
      }}
      position={[positionX, positionY, positionZ]}
      rotation={[0, rotationY, 0]}
    >
      <FloatSelectedWrapper unitID={gameUnit.unitID}>
        <UnitModelByID gameUnit={gameUnit} isHovered={isHovered} />
      </FloatSelectedWrapper>
    </group>
  )
}

const FloatSelectedWrapper = ({
  unitID,
  children,
}: {
  unitID: string
  children: React.ReactNode
}) => {
  const { selectedUnitID } = useUIContext()
  if (unitID === selectedUnitID) {
    return (
      <Float
        speed={10} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.1, 0.3]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        {children}
      </Float>
    )
  } else {
    return <>{children}</>
  }
}
