import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { BoardHexes } from '../../game/types'
import {
  getDefaultSubTerrainForTerrain,
  halfLevel,
  HEXGRID_HEX_HEIGHT,
  isFluidTerrainHex,
  quarterLevel,
} from '../../game/constants'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'

type Props = {
  boardHexes: BoardHexes
}

const InstanceSubTerrain = ({ boardHexes }: Props) => {
  const instanceRef = useRef<any>(undefined!)
  const boardHexesArray = Object.values(boardHexes)
  /* countOfSubTerrains: Right now, this is simply all boardHexes. But with overhangs, and "floaters", this would be calculated. */
  const countOfSubTerrains = boardHexesArray.length

  // effect where we create and update instance mesh for each subterrain mesh
  useLayoutEffect(() => {
    const placeholder = new THREE.Object3D()
    boardHexesArray.forEach((boardHex, i) => {
      const altitude = boardHex.altitude
      const isFluidHex = isFluidTerrainHex(boardHex.terrain)
      const { x, z } = getBoardHex3DCoords(boardHex)
      const heightScaleSubTerrain = isFluidHex
        ? altitude - halfLevel
        : altitude - quarterLevel
      const subTerrain =
        boardHex?.subTerrain ?? getDefaultSubTerrainForTerrain(boardHex.terrain)
      const subTerrainYAdjust = (altitude - quarterLevel) / 4
      const subTerrainColor = new THREE.Color(hexTerrainColor[subTerrain])
      const subTerrainPosition = new THREE.Vector3(x, subTerrainYAdjust, z)
      // set placeholder position
      placeholder.position.set(
        subTerrainPosition.x,
        subTerrainPosition.y,
        subTerrainPosition.z
      )
      // set placeholder scale
      placeholder.scale.set(1, heightScaleSubTerrain, 1)
      // update placeholder matrix
      placeholder.updateMatrix()
      // update instance color
      instanceRef.current.setColorAt(i, subTerrainColor)
      // update instance matrix
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    // update the instance once we've updated all the instances
    instanceRef.current.instanceMatrix.needsUpdate = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardHexes])

  // https://threejs.org/docs/#api/en/objects/InstancedMesh
  //   args:[geometry, material, count]
  //     geometry - an instance of THREE.BufferGeometry
  //     material - an instance of THREE.Material. Default is a new MeshBasicMaterial
  //     count - the number of instances
  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfSubTerrains]} //args:[geometry, material, count]
    >
      <cylinderGeometry args={[1, 1, HEXGRID_HEX_HEIGHT, 6]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}
export default InstanceSubTerrain
