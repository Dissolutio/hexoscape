import * as React from 'react'
import { GType, PenMode } from '../game/hexxaform/hexxaform-types'
import { BoardHexes, HexMap } from '../game/types'
import { terrain } from '../game/terrain'

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
      flatPieceSizes: number[]
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
    const { newSize, flatPieceSizes } = getNewPieceSizeForPenMode(
      mode,
      penMode,
      pieceSize
    )
    setPenMode(mode)
    setPieceSize(newSize)
    setFlatPieceSizes(flatPieceSizes)
  }
  // piece size
  const [pieceSize, setPieceSize] = React.useState(1)
  const [flatPieceSizes, setFlatPieceSizes] = React.useState(
    terrain[penMode]?.flatPieceSizes ?? []
  )
  const togglePieceSize = (s: number) => {
    setPieceSize(s)
  }
  const getNewPieceSizeForPenMode = (
    newMode: string,
    oldMode: string,
    oldPieceSize: number
  ): { newSize: number; flatPieceSizes: number[] } => {
    const terrainsWithFlatPieceSizes = Object.keys(terrain).filter((t) => {
      return terrain[t].flatPieceSizes.length > 0
    })
    const newPieceSizes = terrainsWithFlatPieceSizes.includes(newMode)
      ? terrain[newMode].flatPieceSizes
      : []
    if (!(newPieceSizes.length > 0)) {
      return { newSize: 1, flatPieceSizes: [] }
    }
    if (newPieceSizes.includes(oldPieceSize)) {
      return { newSize: oldPieceSize, flatPieceSizes: newPieceSizes }
    } else {
      const oldIndex = terrain[oldMode].flatPieceSizes.indexOf(oldPieceSize)
      return {
        newSize: newPieceSizes?.[oldIndex] ?? newPieceSizes[0],
        flatPieceSizes: newPieceSizes,
      }
    }
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
        flatPieceSizes,
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
