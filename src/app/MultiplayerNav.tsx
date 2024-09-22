import { useAuth } from '../hooks'
import { NavLink } from 'react-router-dom'

export const MultiplayerNav = () => {
  const { storedCredentials } = useAuth()
  const isJoinedInMatch = Boolean(storedCredentials.matchID)
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Multiplayer Lobby</NavLink>
        </li>
        <li>
          <NavLink to="/local1">{`Map Editor`}</NavLink>
        </li>
        <li>
          <NavLink to="/local2">{`2-Player Local Game`}</NavLink>
        </li>
        <li>
          <NavLink to="/local3">{`3-Player Local Game`}</NavLink>
        </li>
        {isJoinedInMatch ? (
          <li>
            <NavLink to="/play" reloadDocument>
              Play
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
