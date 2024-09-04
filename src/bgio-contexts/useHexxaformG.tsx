import React from 'react'
import { GType } from '../game/hexxaform/types'
import { HexxaformGContext } from './useHexxaformG'

type HexxaformGProviderProps = { children: React.ReactNode; G: GType }

export function HexxaformGProvider({ G, children }: HexxaformGProviderProps) {
  return (
    <HexxaformGContext.Provider
      value={{
        ...G,
      }}
    >
      {children}
    </HexxaformGContext.Provider>
  )
}
