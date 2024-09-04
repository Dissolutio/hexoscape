import React from 'react';
import { GType } from '../game/hexxaform/types'

export const HexxaformGContext = React.createContext<
  | (GType)
  | undefined
>(undefined)

export function useHexxaformG() {
  const context = React.useContext(HexxaformGContext)
  if (context === undefined) {
    throw new Error('useHexxaformG must be used within a HexxaformGProvider')
  }
  return context
}
