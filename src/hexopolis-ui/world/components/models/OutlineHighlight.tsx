import { Outlines } from '@react-three/drei'
import { Color } from 'three'
import { GameUnit } from '../../../../game/types'
import { useUIContext } from '../../../../hexopolis-ui/contexts'
import { playerColors } from '../../../../hexopolis-ui/theme'

export const OutlineHighlight = ({
  gameUnit,
  isHovered,
}: {
  gameUnit: GameUnit
  isHovered: boolean
}) => {
  const { unitID } = gameUnit
  // This component cannot be moved off of context, it would require updating its usage in a BUNCH of places for each model file, EEK!
  const { selectedUnitID } = useUIContext()

  const isSelectedUnitHex =
    selectedUnitID && unitID && selectedUnitID === unitID
  const getHighlightColor = () => {
    if (isSelectedUnitHex) {
      return 'white'
    }
    if (isHovered) {
      return playerColors[gameUnit.playerID]
    }
    return ''
  }
  const highlightColor = getHighlightColor()
  return highlightColor ? (
    <Outlines
      thickness={0.025}
      color={new Color(highlightColor)}
      screenspace={false}
      opacity={1}
      transparent={false}
      angle={15}
    />
  ) : (
    <></>
  )
}
