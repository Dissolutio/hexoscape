import { Billboard, Text } from '@react-three/drei'
import { Color, Vector3 } from 'three'

export const MapHexGlyph = ({
  glyphText,
  glyphPosition,
  isGlyphRevealed,
  glyphOnHex,
}: {
  glyphText: string
  glyphPosition: Vector3
  isGlyphRevealed: boolean
  glyphOnHex: boolean
}) => {
  return glyphOnHex ? (
    <group position={glyphPosition}>
      <Billboard position={[isGlyphRevealed ? -1 : -0.5, 0.4, 0]}>
        <Text fontSize={isGlyphRevealed ? 0.3 : 0.6} color={new Color('black')}>
          {glyphText}
        </Text>
      </Billboard>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
        <meshBasicMaterial color={new Color('maroon')} />
      </mesh>
    </group>
  ) : null
}
