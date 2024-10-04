import { useAuth } from '../hooks'
import { useMultiplayerLobby } from '../lobby'
import React from 'react'

export const LeaveJoinedMatchButton = () => {
  const { handleLeaveJoinedMatch } = useMultiplayerLobby()
  const { updateCredentials, storedCredentials } = useAuth()
  const handleClick = () => {
    handleLeaveJoinedMatch()
    const newCredentials = {
      ...storedCredentials,
      matchID: '',
      gameName: '',
      playerCredentials: '',
    }
    //save joined match
    updateCredentials(newCredentials)
  }
  return (
    <div>
      <button onClick={handleClick}>Leave Joined Game</button>
    </div>
  )
}
