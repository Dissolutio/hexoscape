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
import { useUIContext } from '../../hooks/ui-context'

export type InstanceCapProps = {
  capHexesArray: BoardHex[]
  onClick: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
}
const InstanceFluidHexCapCountWrapper = (props: InstanceCapProps) => {
  const numInstances = props.capHexesArray.length
  if (numInstances < 1) return null
  const key = 'InstanceFluidHexCap-' + numInstances // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceFluidHexCap key={key} {...props} />
}
const tempColor = new Color()
const InstanceFluidHexCap = ({
  capHexesArray,
  onClick,
}: InstanceCapProps) => {
  const instanceRef = useRef<
    InstancedMesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      InstancedMeshEventMap
    >
  >(undefined!)
  const capFluidOpacity = 0.85
  const countOfCapHexes = capHexesArray.length
  const { isCameraActive, hoverID, handleHover, handleUnhover, toggleIsCameraDisabled } = useUIContext()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capHexesArray])

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isCameraActive) return
    e.stopPropagation();
    const hovered = capHexesArray[e.instanceId].id
    if (hovered === hoverID) return // can skip if it's already hovered
    handleHover(hovered)
    tempColor.set('#fff').toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (isCameraActive) return
    handleUnhover()
    tempColor.set(hexTerrainColor[capHexesArray[e.instanceId].terrain]).toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2) return // ignore right clicks
    if (isCameraActive) return
    e.stopPropagation();
    toggleIsCameraDisabled(true)
    onClick(e, capHexesArray[e.instanceId])
  }
  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2) return // ignore right clicks
    toggleIsCameraDisabled(false)
  }


  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfCapHexes]} //args:[geometry, material, count]
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
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
export default InstanceFluidHexCapCountWrapper
