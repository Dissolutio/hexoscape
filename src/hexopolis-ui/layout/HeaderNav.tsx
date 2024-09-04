import styled from 'styled-components'
import { playerIDDisplay } from '../../game/transformers'

export const HeaderNav = ({
  isLocalOrDemoGame,
  localOrDemoGameNumPlayers,
  playerID,
}: {
  isLocalOrDemoGame: boolean
  localOrDemoGameNumPlayers: number
  playerID: string
}) => {
  return (
    <StyledNavbar>
      <PlayerTeamLogo
        playerID={playerID ?? '0'}
        isLocalOrDemoGame={isLocalOrDemoGame}
        localOrDemoGameNumPlayers={localOrDemoGameNumPlayers}
      />
    </StyledNavbar>
  )
}

const StyledNavbar = styled.nav`
  background-color: var(--black);
  padding: 4px 36px 0px 36px;
  z-index: 10;
  & button:focus,
  & button:hover {
    outline: 2px solid var(--white);
  }
  a {
    color: var(--player-color) !important ;
  }
`

const PlayerTeamLogo = ({
  playerID,
  isLocalOrDemoGame,
  localOrDemoGameNumPlayers,
}: {
  playerID: string
  isLocalOrDemoGame: boolean
  localOrDemoGameNumPlayers: number
}) => {
  if (isLocalOrDemoGame) {
    // for pass-and-play / development, making the logo a link to the other players screens is helpful (see Layout.tsx for the html-id we link to)
    // this will make it so player 0-4 will link to player 1-5, and player 5 will link to player 0 (or for however many players you have)
    const localLink = `#player${
      parseInt(playerID) === localOrDemoGameNumPlayers - 1
        ? 0
        : parseInt(playerID) + 1
    }`
    return (
      <a href={localLink}>
        <PlayerTeamLogoH1>
          Hexoscape: {playerIDDisplay(playerID)}
        </PlayerTeamLogoH1>
      </a>
    )
  }
  return (
    <PlayerTeamLogoH1>Hexoscape: {playerIDDisplay(playerID)}</PlayerTeamLogoH1>
  )
}

const PlayerTeamLogoH1 = styled.h1`
  margin: 0;
  font-size: 1.3rem;
  color: var(--player-color);
`
