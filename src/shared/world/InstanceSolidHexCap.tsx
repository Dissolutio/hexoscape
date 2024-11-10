import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import { ThreeEvent, useFrame } from '@react-three/fiber'
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
import {
  halfLevel,
  isFluidTerrainHex,
  quarterLevel,
} from '../../game/constants'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'

type Props = {
  boardHexes: BoardHexes
  onClick: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
  hoverID: string
  handleHover: (id: string) => void
  handleUnhover: (id: string) => void
}

const tempColor = new Color()
const InstanceSolidHexCap = ({
  boardHexes,
  onClick,
  hoverID,
  handleHover,
  handleUnhover,
}: Props) => {
  const prevRef = useRef('')
  const instanceRef = useRef<
    InstancedMesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      InstancedMeshEventMap
    >
  >(undefined!)
  const solidCapHexesArray = Object.values(boardHexes).filter((bh) => {
    return !isFluidTerrainHex(bh.terrain)
  })
  const colorArray = useMemo(
    () => Float32Array.from(new Array(solidCapHexesArray.length).fill(0).flatMap((_, i) => tempColor.set(hexTerrainColor[solidCapHexesArray[i].terrain]).toArray())),
    []
  )
  /* countOfCapHexes: Right now, this is simply all solid terrain boardHexes. But with overhangs, and "floaters", this would be calculated. */
  const countOfCapHexes = solidCapHexesArray.length

  // effect where we create and update instance mesh for each subterrain mesh
  useLayoutEffect(() => {
    console.log("🚀 ~ useLayoutEffect ~ useLayoutEffect:")
    const placeholder = new Object3D()
    solidCapHexesArray.forEach((boardHex, i) => {
      const altitude = boardHex.altitude
      // as of yet, this just looks right, it's not mathematically sound
      const mysteryMathValueThatSeemsToWorkWell = quarterLevel / 4
      const yAdjustFluidCap = altitude / 2
      const yAdjustSolidCap =
        yAdjustFluidCap - mysteryMathValueThatSeemsToWorkWell
      const { x, z } = getBoardHex3DCoords(boardHex)
      const capPosition = new Vector3(x, yAdjustSolidCap, z)
      const heightScaleSolidCap = halfLevel


      // COLOR SET STILL NEEDED WITH NEW useFrame ??
      const terrainColor = new Color(hexTerrainColor[boardHex.terrain])
      if (solidCapHexesArray[i].id === hoverID) {
        instanceRef.current.setColorAt(i, new Color("#fff"))
      } else {
        // update instance color
        instanceRef.current.setColorAt(i, terrainColor)
      }



      // set placeholder position
      placeholder.position.set(capPosition.x, capPosition.y, capPosition.z)
      // set placeholder scale
      placeholder.scale.set(1, heightScaleSolidCap, 1)
      // update placeholder matrix
      placeholder.updateMatrix()
      // update instance matrix
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    // update the instance once we've updated all the instances
    instanceRef.current.instanceMatrix.needsUpdate = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardHexes])

  useEffect(() => { prevRef.current = hoverID }, [hoverID])

  useFrame(() => {
    for (let i = 0; i < countOfCapHexes; i++) {
      if (hoverID === prevRef.current) {
        if (solidCapHexesArray[i].id === hoverID) {
          console.log("🚀 ~ Hex should be WHITE:", solidCapHexesArray[i].id)
          // update instance color
          // instanceRef.current.setColorAt(i, new Color('#fff'))
          // tempColor.set('#fff').toArray(colorArray, i * 3)
          tempColor.set(hexTerrainColor[solidCapHexesArray[i].terrain]).toArray(colorArray, ((i + 1) * 3))
        } else {
          console.log("🚀 ~ Hex should be terrain:", solidCapHexesArray[i].id)
          // instanceRef.current.setColorAt(i, new Color(hexTerrainColor[solidCapHexesArray[i].terrain]))
          tempColor.set(hexTerrainColor[solidCapHexesArray[i].terrain]).toArray(colorArray, i * 3)
        }
        instanceRef.current.geometry.attributes.color.needsUpdate = true
      }
    }
  })

  // const handleHover2 = (e) => {
  //     e.stopPropagation(); 
  //     handleHover(solidCapHexesArray[e.instanceId].id)
  // }
  // const handleUnhover2 = () => {
  //   (e) => handleUnhover(solidCapHexesArray[e.instanceId].id)
  // }

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const hex = solidCapHexesArray[event.instanceId]
    onClick(event, hex)
  }

  return (
    <instancedMesh
      ref={instanceRef}
      args={[null, null, countOfCapHexes]} //args:[geometry, material, count]
      onClick={handleClick}
      onPointerMove={(e) => { e.stopPropagation(); handleHover(solidCapHexesArray[e.instanceId].id) }}
      // onPointerMove={handleHover2}
      onPointerOut={(e) => handleUnhover(solidCapHexesArray[e.instanceId].id)}
    // onPointerOut={handleUnhover2}
    >
      <meshToonMaterial />
      <cylinderGeometry args={[1, 1, halfLevel, 6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
    </instancedMesh>
  )
}
export default InstanceSolidHexCap
