import * as React from 'react'
import { GType, PenMode } from '../game/hexxaform/hexxaform-types'
import { BoardHexes, HexMap } from '../game/types'

type HexxaformContextProviderProps = {
  children: React.ReactNode
  G: GType
}

const HexxaformContext = React.createContext<
  | {
      boardHexes: BoardHexes
      hexMap: HexMap
      selectedMapHex: string
      selectMapHex: (hexID: string) => void
      penMode: PenMode
      togglePenMode: (mode: PenMode) => void
      pieceSize: number
      togglePieceSize: (s: number) => void
      isShowStartZones: boolean
      toggleIsShowStartZones: () => void
    }
  | undefined
>(undefined)
export function HexxaformContextProvider({
  children,
  G,
}: HexxaformContextProviderProps) {
  const [selectedMapHex, setSelectedMapHex] = React.useState('')
  // Pen Mode
  const [penMode, setPenMode] = React.useState(PenMode.grass)
  const togglePenMode = (mode: PenMode) => {
    setPenMode(mode)
  }
  // piece size
  const [pieceSize, setPieceSize] = React.useState(1)
  const togglePieceSize = (s: number) => {
    setPieceSize(s)
  }
  // Show Start Zone edge highlights
  // Lenses
  const [isShowStartZones, setIsShowStartZones] = React.useState(true)

  const toggleIsShowStartZones = () => {
    setIsShowStartZones((s) => !s)
  }

  const selectMapHex = (hexID: string) => {
    setSelectedMapHex(hexID)
  }
  return (
    <HexxaformContext.Provider
      value={{
        boardHexes: G.boardHexes,
        hexMap: G.hexMap,
        selectedMapHex,
        selectMapHex,
        penMode,
        togglePenMode,
        pieceSize,
        togglePieceSize,
        isShowStartZones,
        toggleIsShowStartZones,
      }}
    >
      {children}
    </HexxaformContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useHexxaformContext() {
  const context = React.useContext(HexxaformContext)
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapContextProvider')
  }
  return context
}