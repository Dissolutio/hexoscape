import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const MultiplayerNav = () => {
  const { storedCredentials } = useAuth()
  const isJoinedInMatch = Boolean(storedCredentials.matchID)
  return (
    <nav>
      <ul>
        {isJoinedInMatch ? (
          <li>
            <NavLink to="/play" reloadDocument>
              Go to Joined Match
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink to="/local1">{`Map Editor`}</NavLink>
        </li>
        <li>
          <NavLink to="/local2">{`2-Player Local Game`}</NavLink>
        </li>
        <li>
          <NavLink to="/local3">{`3-Player Local Game`}</NavLink>
        </li>
      </ul>
    </nav>
  )
}
