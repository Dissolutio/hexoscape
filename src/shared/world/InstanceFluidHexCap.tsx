import { useRef, useLayoutEffect, useMemo } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import {
  BufferGeometry,
  Color,
  InstancedMesh,
  InstancedMeshEventMap,
  Material,
  NormalBufferAttributes,
  Object3D,
  Vector3,
} from 'three'
import { BoardHex } from '../../game/types'
import { halfLevel } from '../../game/constants'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'

export type InstanceCapProps = {
  capHexesArray: BoardHex[]
  onPointerEnter: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
  onPointerOut: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
  onPointerDown: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
  onPointerUp: (e: ThreeEvent<PointerEvent>) => void
}

const tempColor = new Color()
const capFluidOpacity = 0.85
const InstanceFluidHexCap = ({
  capHexesArray,
  onPointerEnter,
  onPointerOut,
  onPointerDown,
  onPointerUp,
}: InstanceCapProps) => {
  const instanceRef = useRef<
    InstancedMesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      InstancedMeshEventMap
    >
  >(undefined)
  const countOfCapHexes = capHexesArray.length
  const colorArray = useMemo(
    () => Float32Array.from(new Array(capHexesArray.length).fill(0).flatMap((_, i) => tempColor.set(hexTerrainColor[capHexesArray[i].terrain]).toArray())),
    [capHexesArray]
  )
  useLayoutEffect(() => {
    const placeholder = new Object3D()
    capHexesArray.forEach((boardHex, i) => {
      const altitude = boardHex.altitude
      const yAdjustFluidCap = altitude / 2
      const { x, z } = getBoardHex3DCoords(boardHex)
      const capPosition = new Vector3(x, yAdjustFluidCap, z)
      placeholder.position.set(capPosition.x, capPosition.y, capPosition.z)
      placeholder.scale.set(1, halfLevel, 1)
      placeholder.updateMatrix()
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
  }, [capHexesArray])

  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    onPointerEnter(e, capHexesArray[e.instanceId])
    tempColor.set('#fff').toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    onPointerOut(e, capHexesArray[e.instanceId])
    tempColor.set(hexTerrainColor[capHexesArray[e.instanceId].terrain]).toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const handleDown = (e: ThreeEvent<PointerEvent>) => {
    onPointerDown(e, capHexesArray[e.instanceId])
  }


  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfCapHexes]} //args:[geometry, material, count]
      onPointerEnter={handleEnter}
      onPointerOut={handleOut}
      onPointerDown={handleDown}
      onPointerUp={onPointerUp}
    >
      <meshLambertMaterial
        transparent
        opacity={capFluidOpacity}
        vertexColors
        toneMapped={false}
      />
      <cylinderGeometry args={[1, 1, halfLevel, 6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
    </instancedMesh>
  )
}
const FluidInstance = (colorArray) => {
  return (
    <>
      <meshLambertMaterial
        transparent
        opacity={capFluidOpacity}
        vertexColors
        toneMapped={false}
      />
      <cylinderGeometry args={[1, 1, halfLevel, 6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
    </>
  )
}

export default InstanceFluidHexCap
