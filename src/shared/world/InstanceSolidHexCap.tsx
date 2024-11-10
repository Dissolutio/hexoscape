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

export const AnotherThing = (props: Props) => {
  const solidCapHexesArray = Object.values(props.boardHexes).filter((bh) => {
    return !isFluidTerrainHex(bh.terrain)
  })
  const numInstances = solidCapHexesArray.length
  if (numInstances < 1) return null
  const key = 'InstanceSolidHexCap-' + numInstances // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceSolidHexCap key={key} {...props} />
}

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
  const countOfCapHexes = solidCapHexesArray.length
  const tempColor = new Color()
  const niceColors = ['#490a3d', '#bd1550', '#e97f02', '#f8ca00', '#8a9b0f']
  const data = Array.from({ length: countOfCapHexes }, () => ({
    color: niceColors[Math.floor(Math.random() * niceColors.length)],
    scale: 1
  }))
  const colorArray = useMemo(
    () => Float32Array.from(new Array(countOfCapHexes).fill(0).flatMap((_, i) => tempColor.set(hexTerrainColor[solidCapHexesArray[i].terrain]).toArray())),
    []
  )
  /* countOfCapHexes: Right now, this is simply all solid terrain boardHexes. But with overhangs, and "floaters", this would be calculated. */

  // effect where we create and update instance mesh for each subterrain mesh
  // useLayoutEffect(() => {
  //   console.log("🚀 ~ useLayoutEffect ~ useLayoutEffect:")
  //   const placeholder = new Object3D()
  //   solidCapHexesArray.forEach((boardHex, i) => {
  //     const altitude = boardHex.altitude
  //     // as of yet, this just looks right, it's not mathematically sound
  //     const mysteryMathValueThatSeemsToWorkWell = quarterLevel / 4
  //     const yAdjustFluidCap = altitude / 2
  //     const yAdjustSolidCap =
  //       yAdjustFluidCap - mysteryMathValueThatSeemsToWorkWell
  //     const { x, z } = getBoardHex3DCoords(boardHex)
  //     const capPosition = new Vector3(x, yAdjustSolidCap, z)
  //     const heightScaleSolidCap = halfLevel


  //     // COLOR SET STILL NEEDED WITH NEW useFrame ??
  //     // const terrainColor = new Color(hexTerrainColor[boardHex.terrain])
  //     // if (solidCapHexesArray[i].id === hoverID) {
  //     //   instanceRef.current.setColorAt(i, new Color("#fff"))
  //     // } else {
  //     //   // update instance color
  //     //   instanceRef.current.setColorAt(i, terrainColor)
  //     // }



  //     // set placeholder position
  //     placeholder.position.set(capPosition.x, capPosition.y, capPosition.z)
  //     // set placeholder scale
  //     placeholder.scale.set(1, heightScaleSolidCap, 1)
  //     // update placeholder matrix
  //     placeholder.updateMatrix()
  //     // update instance matrix
  //     instanceRef.current.setMatrixAt(i, placeholder.matrix)
  //   })
  //   // update the instance once we've updated all the instances
  //   instanceRef.current.instanceMatrix.needsUpdate = true
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [boardHexes])

  useEffect(() => { prevRef.current = hoverID }, [hoverID])

  useFrame(() => {
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

      if (boardHex.id === hoverID) {
        // update instance color
        // instanceRef.current.setColorAt(i, new Color('#fff'))
        tempColor.set('#fff').toArray(colorArray, i * 3)
      } else {
        // instanceRef.current.setColorAt(i, new Color(hexTerrainColor[solidCapHexesArray[i].terrain]))
        tempColor.set(hexTerrainColor[boardHex.terrain]).toArray(colorArray, i * 3)
      }
      // prevRef.current = hoverID
      instanceRef.current.geometry.attributes.color.needsUpdate = true



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
    // for (let i = 0; i < countOfCapHexes; i++) {
    //   if (hoverID === prevRef.current) {
    //     if (solidCapHexesArray[i].id === hoverID) {
    //       // update instance color
    //       // instanceRef.current.setColorAt(i, new Color('#fff'))
    //       tempColor.set('#fff').toArray(colorArray, i * 3)
    //     } else {
    //       // instanceRef.current.setColorAt(i, new Color(hexTerrainColor[solidCapHexesArray[i].terrain]))
    //       tempColor.set(hexTerrainColor[solidCapHexesArray[i].terrain]).toArray(colorArray, i * 3)
    //     }
    //     instanceRef.current.geometry.attributes.color.needsUpdate = true
    //   }
    // }
  })

  // const handleHover2 = (e) => {
  //   e.stopPropagation();
  //   handleHover(solidCapHexesArray[e.instanceId].id)
  //   instanceRef.current.setColorAt(e.instanceId, new Color('#fff'))
  //   instanceRef.current.geometry.attributes.color.needsUpdate = true
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
      {/* <meshToonMaterial /> */}
      <cylinderGeometry args={[1, 1, halfLevel, 6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />

    </instancedMesh>
  )
}
export default InstanceSolidHexCap
