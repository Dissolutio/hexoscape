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
import {
  eighthLevel,
  halfLevel,
} from '../../game/constants'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'

type Props = {
  solidCapHexesArray: BoardHex[]
  onClick: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
  handleHover: (id: string) => void
  handleUnhover: (id: string) => void
}

const InstanceSolidHexCapCountWrapper = (props: Props) => {
  const numInstances = props.solidCapHexesArray.length
  if (numInstances < 1) return null
  const key = 'InstanceSolidHexCap-' + numInstances // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceSolidHexCap key={key} {...props} />
}

const tempColor = new Color()
const InstanceSolidHexCap = ({
  solidCapHexesArray,
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
  const countOfCapHexes = solidCapHexesArray.length
  const colorArray = useMemo(
    () => {
      return Float32Array.from(new Array(solidCapHexesArray.length).fill(0).flatMap((_, i) => tempColor.set(hexTerrainColor[solidCapHexesArray[i].terrain]).toArray()))
    },
    [solidCapHexesArray]
  )

  // effect where we create and update instance position
  useLayoutEffect(() => {
    const placeholder = new Object3D()
    solidCapHexesArray.forEach((boardHex, i) => {
      const altitude = boardHex.altitude
      const yAdjustFluidCap = altitude / 2
      const yAdjustSolidCap =
        yAdjustFluidCap - eighthLevel
      const { x, z } = getBoardHex3DCoords(boardHex)
      const capPosition = new Vector3(x, yAdjustSolidCap, z)

      placeholder.position.set(capPosition.x, capPosition.y, capPosition.z)
      placeholder.scale.set(1, halfLevel, 1)
      placeholder.updateMatrix()
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solidCapHexesArray])

  const onPointerMove = (e) => {
    e.stopPropagation();
    handleHover(solidCapHexesArray[e.instanceId].id)
    tempColor.set('#fff').toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const onPointerOut = (e) => {
    handleUnhover(solidCapHexesArray[e.instanceId].id)
    tempColor.set(hexTerrainColor[solidCapHexesArray[e.instanceId].terrain]).toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    onClick(e, solidCapHexesArray[e.instanceId])
  }

  return (
    <instancedMesh
      ref={instanceRef}
      args={[null, null, countOfCapHexes]} //args:[geometry, material, count]
      onClick={handleClick}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
    >
      <cylinderGeometry args={[1, 1, halfLevel, 6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
      <meshLambertMaterial toneMapped={false} vertexColors />

    </instancedMesh>
  )
}
export default InstanceSolidHexCapCountWrapper
