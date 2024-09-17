import * as React from 'react'
import { PenMode } from '../game/hexxaform/hexxaform-types'

type MapContextProviderProps = {
  children: React.ReactNode
  // mapSize: number
}

const MapContext = React.createContext<
  | {
      selectedMapHex: string
      selectMapHex: (hexID: string) => void
      penMode: PenMode
      toggleSelectHexMode: () => void
      showStartzones: boolean
      toggleShowStartzones: () => void
      toggleShowTerrain: () => void
      showTerrain: boolean
      toggleEraserPen: () => void
      toggleEraserStartZonePen: () => void
      toggleIncAltitudePen: () => void
      toggleDecAltitudePen: () => void
      toggleWaterPen: () => void
      toggleGrassPen: () => void
      toggleSandPen: () => void
      toggleRockPen: () => void
      toggleStartZonePen: (playerID: string) => void
      penThickness: number
      togglePenThickness: () => void
    }
  | undefined
>(undefined)
export function MapContextProvider({ children }: MapContextProviderProps) {
  const [selectedMapHex, setSelectedMapHex] = React.useState('')
  // Pen Mode
  const [penMode, setPenMode] = React.useState(PenMode.grass)
  const [penThickness, setPenThickness] = React.useState(1)
  // Lenses
  const [showStartzones, setShowStartzones] = React.useState(false)
  const [showTerrain, setShowTerrain] = React.useState(true)

  const togglePenThickness = () => {
    setPenThickness((s) => (s === 0 ? 1 : 0))
  }
  const toggleShowStartzones = () => {
    setShowStartzones((s) => !s)
  }
  const toggleShowTerrain = () => {
    setShowTerrain((s) => !s)
  }
  //! Select Hex Mode
  const toggleSelectHexMode = () => {
    setPenMode(PenMode.none)
  }
  //! Pen modes
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
  const toggleWaterPen = () => {
    setPenMode(PenMode.water)
  }
  const toggleGrassPen = () => {
    setPenMode(PenMode.grass)
  }
  const toggleSandPen = () => {
    setPenMode(PenMode.sand)
  }
  const toggleRockPen = () => {
    setPenMode(PenMode.rock)
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
        toggleSelectHexMode,
        showStartzones,
        toggleShowStartzones,
        showTerrain,
        toggleShowTerrain,
        toggleEraserPen,
        toggleEraserStartZonePen,
        toggleIncAltitudePen,
        toggleDecAltitudePen,
        toggleWaterPen,
        toggleGrassPen,
        toggleSandPen,
        toggleRockPen,
        toggleStartZonePen,
        penThickness,
        togglePenThickness,
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
