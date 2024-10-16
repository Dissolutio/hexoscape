import { Vector3, BufferGeometry } from 'three'
import { getHexxaformMapHexLineStyle } from './getHexxaformMapHexLineStyle'
import { StartZones } from '../../game/types'

export const HexxaformHeightRing = ({
  points,
  height,
  top,
  position,
  isHighlighted,
  boardHexID,
  startZones,
}: {
  points: Vector3[]
  height: number
  top: number
  position: Vector3
  isHighlighted: boolean
  boardHexID: string
  startZones: StartZones
}) => {
  const lineGeometry = new BufferGeometry().setFromPoints(points)
  const {
    color,
    //  opacity,
    lineWidth,
  } = getHexxaformMapHexLineStyle(
    top === height,
    isHighlighted,
    boardHexID,
    startZones
  )
  return (
    <line_
      geometry={lineGeometry}
      position={position}
      rotation={[0, Math.PI / 6, 0]}
    >
      <lineBasicMaterial
        attach="material"
        // warning, opacity can be a bit fps expensive
        // transparent
        // opacity={opacity}
        color={color}
        linewidth={lineWidth}
        linecap={'round'}
        linejoin={'round'}
      />
    </line_>
  )
}
