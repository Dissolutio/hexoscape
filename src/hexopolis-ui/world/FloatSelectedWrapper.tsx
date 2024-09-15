import { Float } from '@react-three/drei'
import { useUIContext } from '../contexts'

export const FloatSelectedWrapper = ({
  unitID,
  children,
}: {
  unitID: string
  children: React.ReactNode
}) => {
  /* Use like so:
      <FloatSelectedWrapper unitID={gameUnit.unitID}>
        <UnitModelByID gameUnit={gameUnit} isHovered={isHovered} />
      </FloatSelectedWrapper>
    */
  const { selectedUnitID } = useUIContext()
  if (unitID === selectedUnitID) {
    return (
      <Float
        speed={10} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.1, 0.3]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        {children}
      </Float>
    )
  } else {
    return <>{children}</>
  }
}
