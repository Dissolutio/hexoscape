// import styled from 'styled-components'
// import { playerIDDisplay } from '../../game/transformers'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { MdMenu } from 'react-icons/md'
import styled from 'styled-components'
import { playerIDDisplay } from '../../game/transformers'
import { useUIContext } from '../contexts'

type LocalGameLinkProps = {
  playerID: string
  isLocalOrDemoGame: boolean
  localOrDemoGameNumPlayers: number
}
export default function HeaderNav({
  linkProps,
}: {
  linkProps: LocalGameLinkProps
}) {
  const { playerID, isLocalOrDemoGame, localOrDemoGameNumPlayers } = linkProps
  const { toggleIsNavOpen } = useUIContext()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'var(--black)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleIsNavOpen(true)}
          >
            <MdMenu />
          </IconButton>
          <PlayerTeamLogo
            playerID={playerID}
            isLocalOrDemoGame={isLocalOrDemoGame}
            localOrDemoGameNumPlayers={localOrDemoGameNumPlayers}
          />
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

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
    // So clicking on the logo should cycle you through the other players' screens
    const firstPlayerID = 0
    const maxPlayerID = localOrDemoGameNumPlayers - 1
    const isLastPlayer = parseInt(playerID) === maxPlayerID
    const nextPlayerID = isLastPlayer ? firstPlayerID : parseInt(playerID) + 1
    const localLink = `#player${nextPlayerID}`
    return (
      <div style={{ flexGrow: 1 }}>
        <a href={localLink}>
          <PlayerTeamLogoH1>
            Hexoscape: {playerIDDisplay(playerID)}
          </PlayerTeamLogoH1>
        </a>
      </div>
    )
  }
  return <PlayerTeamLogoH1>Hexoscape</PlayerTeamLogoH1>
}

const PlayerTeamLogoH1 = styled.h1`
  margin: 0;
  font-size: 1.3rem;
  color: var(--player-color);
`
