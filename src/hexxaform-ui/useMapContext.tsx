import * as React from 'react'
import { GType, PenMode } from '../game/hexxaform/hexxaform-types'
import { BoardHexes, HexMap } from '../game/types'

type MapContextProviderProps = {
  children: React.ReactNode
  G: GType
}

const MapContext = React.createContext<
  | {
      boardHexes: BoardHexes
      hexMap: HexMap
      selectedMapHex: string
      selectMapHex: (hexID: string) => void
      penMode: PenMode
      toggleEraserPen: () => void
      toggleEraserStartZonePen: () => void
      toggleIncAltitudePen: () => void
      toggleDecAltitudePen: () => void
      toggleTerrainPen: (mode: PenMode) => void
      toggleStartZonePen: (playerID: string) => void
      penThickness: number
      togglePenThickness: () => void
      isShowStartZones: boolean
      toggleIsShowStartZones: () => void
    }
  | undefined
>(undefined)
export function MapContextProvider({ children, G }: MapContextProviderProps) {
  const [selectedMapHex, setSelectedMapHex] = React.useState('')
  // Pen Mode
  const [penMode, setPenMode] = React.useState(PenMode.grass)
  const [penThickness, setPenThickness] = React.useState(1)
  // Show Start Zone edge highlights
  // Lenses
  const [isShowStartZones, setIsShowStartZones] = React.useState(true)

  const togglePenThickness = () => {
    setPenThickness((s) => (s === 0 ? 1 : 0))
  }
  const toggleIsShowStartZones = () => {
    setIsShowStartZones((s) => !s)
  }
  const toggleEraserPen = () => {
    setPenMode(PenMode.eraser)
  }
  const toggleEraserStartZonePen = () => {
    setPenMode(PenMode.eraserStartZone)
  }
  const toggleIncAltitudePen = () => {
    setPenMode(PenMode.incAltitude)
  }
  const toggleDecAltitudePen = () => {
    setPenMode(PenMode.decAltitude)
  }
  const toggleTerrainPen = (mode: PenMode) => {
    setPenMode(mode)
  }
  const toggleStartZonePen = (playerID: string) => {
    switch (playerID) {
      case '0':
        setPenMode(PenMode.startZone0)
        break
      case '1':
        setPenMode(PenMode.startZone1)
        break
      case '2':
        setPenMode(PenMode.startZone2)
        break
      case '3':
        setPenMode(PenMode.startZone3)
        break
      case '4':
        setPenMode(PenMode.startZone4)
        break
      case '5':
        setPenMode(PenMode.startZone5)
        break
      default:
        break
    }
  }
  const selectMapHex = (hexID: string) => {
    setSelectedMapHex(hexID)
  }
  return (
    <MapContext.Provider
      value={{
        selectedMapHex,
        selectMapHex,
        penMode,
        isShowStartZones,
        toggleIsShowStartZones,
        toggleEraserPen,
        toggleEraserStartZonePen,
        toggleIncAltitudePen,
        toggleDecAltitudePen,
        toggleTerrainPen,
        toggleStartZonePen,
        penThickness,
        togglePenThickness,
        boardHexes: G.boardHexes,
        hexMap: G.hexMap,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
export function useMapContext() {
  const context = React.useContext(MapContext)
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapContextProvider')
  }
  return context
}
