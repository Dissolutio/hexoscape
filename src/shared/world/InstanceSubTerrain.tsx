import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { BoardHex } from '../../game/types'
import {
  getDefaultSubTerrainForTerrain,
  halfLevel,
  HEXGRID_HEX_HEIGHT,
  isFluidTerrainHex,
  quarterLevel,
} from '../../game/constants'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'


type InstanceSubTerrainWrapperProps = {
  boardHexes: BoardHex[] // OVERHANGS will change this, somehow
  glKey: string
}

const InstanceSubTerrainWrapper = (props: InstanceSubTerrainWrapperProps) => {
  const numInstances = props.boardHexes.length
  if (numInstances < 1) return null
  const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceSubTerrain key={key} boardHexes={props.boardHexes} />
}

const InstanceSubTerrain = ({ boardHexes }: { boardHexes: BoardHex[] }) => {
  const instanceRef = useRef<any>(undefined!)
  const countOfSubTerrains = boardHexes.length

  // effect where we create and update instance mesh for each subterrain mesh
  useLayoutEffect(() => {
    const placeholder = new THREE.Object3D()
    boardHexes.forEach((boardHex, i) => {
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
      placeholder.position.set(
        subTerrainPosition.x,
        subTerrainPosition.y,
        subTerrainPosition.z
      )
      placeholder.scale.set(1, heightScaleSubTerrain, 1)
      placeholder.updateMatrix()
      instanceRef.current.setColorAt(i, subTerrainColor)
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
  }, [boardHexes])

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
export default InstanceSubTerrainWrapper
