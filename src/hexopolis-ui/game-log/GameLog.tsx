import { useBgioG } from '../../bgio-contexts'
import { decodeGameLogMessage } from '../../game/gamelog'
import { GameLogMsg } from './GameLogMsg'
import styled from 'styled-components'

type Props = {}

export const GameLog = (props: Props) => {
  const { gameLog } = useBgioG()
  const gameLogMsgArray = gameLog.map((msg) => decodeGameLogMessage(msg))
  // const { type, playerID } = gameLogMessage
  return (
    <StyledDiv>
      {gameLogMsgArray.map(
        (msg) => msg && <GameLogMsg key={msg.id} gameLogMessage={msg} />
      )}
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  font-size: 0.8rem;
  @media screen and (max-width: 1100px) {
    font-size: 0.7rem;
  }
`
