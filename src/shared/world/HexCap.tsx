import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { BoardHex, EditingBoardHexes } from '../../game/types'
import { eighthLevel, halfLevel, isFluidTerrainHex } from '../../game/constants'
import { Color, Vector3 } from 'three'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'

type CapMeshProps = {
  capPosition: Vector3
  boardHex: BoardHex
  capEmissiveColor: Color
  terrainColor: Color
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
  onClick?: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
}

const SolidCapMesh = ({
  capPosition,
  boardHex,
  setIsHovered,
  capEmissiveColor,
  terrainColor,
  isHovered,
  onClick,
}: CapMeshProps) => {
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  const heightScaleFluidCap = 1
  const heightScaleSolidCap = halfLevel
  const scaleToUseForCap = isFluidHex
    ? heightScaleFluidCap
    : heightScaleSolidCap
  const baseEmissivity = 0.2
  const capEmissiveIntensity = isHovered ? 1 : baseEmissivity
  return (
    <mesh
      onClick={(e) => {
        if (onClick) {
          onClick(e, boardHex)
        }
      }}
      onPointerEnter={(e) => {
        // this keeps the hover from penetrating to hoverable-hexes behind this one
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerLeave={() => setIsHovered(false)}
      position={capPosition}
      scale={[1, scaleToUseForCap, 1]}
    >
      <meshLambertMaterial
        color={terrainColor}
        emissive={capEmissiveColor}
        emissiveIntensity={capEmissiveIntensity}
      />
      <cylinderGeometry args={[1, 1, halfLevel, 6]} />
    </mesh>
  )
}
const FluidCapMesh = ({
  capPosition,
  boardHex,
  setIsHovered,
  capEmissiveColor,
  terrainColor,
  isHovered,
  onClick,
}: CapMeshProps) => {
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  const heightScaleFluidCap = 1
  const heightScaleSolidCap = halfLevel
  const scaleToUseForCap = isFluidHex
    ? heightScaleFluidCap
    : heightScaleSolidCap
  const baseEmissivity = 0.2
  const fluidEmissivity = 2 * baseEmissivity
  const capFluidEmissiveIntensity = isHovered ? 8 : fluidEmissivity
  const capFluidOpacity = 0.85
  return (
    <mesh
      onClick={(e) => {
        if (onClick) {
          onClick(e, boardHex)
        }
      }}
      onPointerEnter={(e) => {
        // this keeps the hover from penetrating to hoverable-hexes behind this one
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerLeave={() => setIsHovered(false)}
      position={capPosition}
      scale={[1, scaleToUseForCap, 1]}
    >
      <meshLambertMaterial
        color={terrainColor}
        emissive={capEmissiveColor}
        emissiveIntensity={capFluidEmissiveIntensity}
        transparent
        opacity={capFluidOpacity}
      />
      <cylinderGeometry args={[1, 1, halfLevel, 6]} />
    </mesh>
  )
}

type Props = {
  x: number
  z: number
  boardHex: BoardHex
  editingBoardHexes: EditingBoardHexes
  selectedUnitID: string
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
  isPlacementPhase?: boolean
  onClick?: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
}
const HexCap = ({
  x,
  z,
  boardHex,
  editingBoardHexes,
  selectedUnitID,
  isHovered,
  setIsHovered,
  isPlacementPhase,
  onClick,
}: Props) => {
  const unitID = boardHex?.occupyingUnitID ?? ''
  const editingHexUnitID = editingBoardHexes[boardHex.id]?.occupyingUnitID ?? ''
  const isSelectedUnitHex =
    selectedUnitID &&
    (isPlacementPhase ? editingHexUnitID : unitID) &&
    selectedUnitID === (isPlacementPhase ? editingHexUnitID : unitID)

  const altitude = boardHex.altitude
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  const yAdjustFluidCap = altitude / 2
  const yAdjustSolidCap = yAdjustFluidCap - eighthLevel
  const hexCapYAdjust = isFluidHex ? yAdjustFluidCap : yAdjustSolidCap
  const capPosition = new Vector3(x, hexCapYAdjust, z)
  const hoverHexCapColor = new Color('orange')
  const terrainColor = new Color(hexTerrainColor[boardHex.terrain])
  const capEmissiveColor =
    isHovered || isSelectedUnitHex ? hoverHexCapColor : terrainColor
  return isFluidHex ? (
    <FluidCapMesh
      capPosition={capPosition}
      capEmissiveColor={capEmissiveColor}
      terrainColor={terrainColor}
      boardHex={boardHex}
      setIsHovered={setIsHovered}
      isHovered={isHovered}
      onClick={onClick}
    />
  ) : (
    <SolidCapMesh
      capPosition={capPosition}
      capEmissiveColor={capEmissiveColor}
      terrainColor={terrainColor}
      boardHex={boardHex}
      setIsHovered={setIsHovered}
      isHovered={isHovered}
      onClick={onClick}
    />
  )
}

export default HexCap
