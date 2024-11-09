import { useRef, useLayoutEffect } from 'react'
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
import { BoardHex, BoardHexes } from '../../game/types'
import { halfLevel, isFluidTerrainHex } from '../../game/constants'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'

type Props = {
  boardHexes: BoardHexes
  onClick: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
}
const InstanceFluidHexCap = ({ boardHexes, onClick }: Props) => {
  const instanceRef = useRef<
    InstancedMesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      InstancedMeshEventMap
    >
  >(undefined!)
  const fluidCapHexesArray = Object.values(boardHexes).filter((bh) => {
    return isFluidTerrainHex(bh.terrain)
  })
  /* countOfCapHexes: Right now, this is simply all solid terrain boardHexes. But with overhangs, and "floaters", this would be calculated. */
  const countOfCapHexes = fluidCapHexesArray.length
  // effect where we create and update instance mesh for each subterrain mesh
  useLayoutEffect(() => {
    const placeholder = new Object3D()
    fluidCapHexesArray.forEach((boardHex, i) => {
      const altitude = boardHex.altitude
      // as of yet, this just looks right, it's not mathematically sound
      const yAdjustFluidCap = altitude / 2
      const { x, z } = getBoardHex3DCoords(boardHex)
      const capPosition = new Vector3(x, yAdjustFluidCap, z)
      const heightScaleSolidCap = halfLevel
      const terrainColor = new Color(hexTerrainColor[boardHex.terrain])
      //   const baseEmissivity = 0.2
      //   const fluidEmissivity = 2 * baseEmissivity
      //   const capFluidEmissiveIntensity = isHovered ? 8 : fluidEmissivity
      // set placeholder position
      placeholder.position.set(capPosition.x, capPosition.y, capPosition.z)
      // set placeholder scale
      placeholder.scale.set(1, heightScaleSolidCap, 1)
      // update placeholder matrix
      placeholder.updateMatrix()
      // update instance color
      instanceRef.current.setColorAt(i, terrainColor)
      // update instance matrix
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    // update the instance once we've updated all the instances
    instanceRef.current.instanceMatrix.needsUpdate = true
    // We only need to run this on init, until we ever have changing terrain
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardHexes])

  const capFluidOpacity = 0.85
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const hex = fluidCapHexesArray[event.instanceId]
    onClick(event, hex)
  }

  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfCapHexes]} //args:[geometry, material, count]
      onClick={handleClick}
      //   onPointerEnter={(e) => {
      //     // this keeps the hover from penetrating to hoverable-hexes behind this one
      //     e.stopPropagation()
      //     setIsHovered(true)
      //   }}
      //   onPointerLeave={() => setIsHovered(false)}
    >
      <meshLambertMaterial
        // emissive={capEmissiveColor}
        // emissiveIntensity={capFluidEmissiveIntensity}
        transparent
        opacity={capFluidOpacity}
      />
      <cylinderGeometry args={[1, 1, halfLevel, 6]} />
    </instancedMesh>
  )
}
export default InstanceFluidHexCap
