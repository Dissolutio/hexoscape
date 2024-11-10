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
import { halfLevel, isFluidTerrainHex } from '../../game/constants'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'
import { useUIContext } from '../../hooks/ui-context'

type Props = {
  fluidCapHexesArray: BoardHex[]
  onClick: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
  handleHover: (id: string) => void
  handleUnhover: (id: string) => void
}
const InstanceFluidHexCapCountWrapper = (props: Props) => {
  const fluidCapHexesArray = (props.fluidCapHexesArray).filter((bh) => {
    return isFluidTerrainHex(bh.terrain)
  })
  const numInstances = fluidCapHexesArray.length
  if (numInstances < 1) return null
  const key = 'InstanceFluidHexCap-' + numInstances // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceFluidHexCap key={key} {...props} />
}
const tempColor = new Color()
const InstanceFluidHexCap = ({
  fluidCapHexesArray,
  onClick,
  handleHover,
  handleUnhover,
}: Props) => {
  const instanceRef = useRef<
    InstancedMesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      InstancedMeshEventMap
    >
  >(undefined!)
  const capFluidOpacity = 0.85
  const countOfCapHexes = fluidCapHexesArray.length
  const { isCameraActive } = useUIContext()
  const colorArray = useMemo(
    () => Float32Array.from(new Array(fluidCapHexesArray.length).fill(0).flatMap((_, i) => tempColor.set(hexTerrainColor[fluidCapHexesArray[i].terrain]).toArray())),
    [fluidCapHexesArray]
  )
  useLayoutEffect(() => {
    const placeholder = new Object3D()
    fluidCapHexesArray.forEach((boardHex, i) => {
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
  }, [fluidCapHexesArray])


  const onPointerMove = (e) => {
    if (isCameraActive) return
    e.stopPropagation();
    handleHover(fluidCapHexesArray[e.instanceId].id)
    tempColor.set('#fff').toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const onPointerOut = (e) => {
    if (isCameraActive) return
    handleUnhover(fluidCapHexesArray[e.instanceId].id)
    tempColor.set(hexTerrainColor[fluidCapHexesArray[e.instanceId].terrain]).toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    onClick(event, fluidCapHexesArray[event.instanceId])
  }


  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfCapHexes]} //args:[geometry, material, count]
      onClick={handleClick}
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
