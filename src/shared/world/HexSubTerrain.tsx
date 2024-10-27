import { Color, Vector3 } from 'three'
import { HEXGRID_HEX_HEIGHT } from '../../game/constants'

type Props = {
  subTerrainPosition: Vector3
  heightScaleSubTerrain: number
  subTerrainColor: Color
}
const HexSubTerrain = ({
  subTerrainPosition,
  heightScaleSubTerrain,
  subTerrainColor,
}: Props) => {
  return (
    <mesh position={subTerrainPosition} scale={[1, heightScaleSubTerrain, 1]}>
      <cylinderGeometry args={[1, 1, HEXGRID_HEX_HEIGHT, 6]} />
      <meshBasicMaterial color={subTerrainColor} />
    </mesh>
  )
}

export default HexSubTerrain
