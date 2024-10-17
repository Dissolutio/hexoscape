import { ArmyCard, CardAbility, GameArmyCard } from '../game/types'
import { ImZoomIn } from 'react-icons/im'
import { StyledBlueIconButton } from './layout/buttons'
import { useUIContext } from '../hooks/ui-context'

export const OpenAbilityModalButton = ({
  cardAbility,
}: {
  cardAbility: CardAbility
}) => {
  const { openModalAbility } = useUIContext()
  return (
    <StyledBlueIconButton onClick={() => openModalAbility(cardAbility)}>
      <ImZoomIn
        size={'1rem'}
        style={{
          marginRight: '0.4rem ',
          marginLeft: '-1rem',
        }}
      />
      <span>{cardAbility.name}</span>
    </StyledBlueIconButton>
  )
}
export const OpenCardModalButton = ({
  card,
}: {
  card: GameArmyCard | ArmyCard
}) => {
  const { openModalCard } = useUIContext()
  return (
    <StyledBlueIconButton onClick={() => openModalCard(card)}>
      <ImZoomIn
        size={'1rem'}
        style={{
          marginRight: '0.4rem ',
          marginLeft: '-1rem',
        }}
      />
      View
    </StyledBlueIconButton>
  )
}
