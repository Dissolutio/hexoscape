import { useState, useEffect } from 'react'

import { useMultiplayerLobby } from './useMultiplayerLobby'
import { useAuth } from '../hooks/useAuth'

export const Login = () => {
  const [inputText, setInputText] = useState('')
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }
  const { isAuthenticated, storedCredentials, signin } = useAuth()
  const { leaveMatchAndSignout } = useMultiplayerLobby()
  const isNameChanged = inputText !== storedCredentials.playerName

  // effect -- auto-fill input on auth change
  useEffect(() => {
    setInputText(storedCredentials?.playerName ?? '')
  }, [storedCredentials])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signin(inputText)
  }

  const inputHtmlId = `playerName`
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputHtmlId}>
          {isAuthenticated ? 'Change your ' : 'Choose a '} player name:
          <input
            type="text"
            onChange={handleTextInputChange}
            value={inputText}
            id={inputHtmlId}
          />
        </label>
        <div>
          {isNameChanged && (
            <button type="submit">
              {isAuthenticated ? 'Change Name' : 'Submit'}
            </button>
          )}
        </div>
      </form>
      {isAuthenticated && (
        <p>
          <button onClick={leaveMatchAndSignout}>
            Sign out {`${storedCredentials?.playerName}`}
          </button>
        </p>
      )}
    </>
  )
}
