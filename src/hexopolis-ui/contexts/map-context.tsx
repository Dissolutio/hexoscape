import * as React from 'react'

type MapContextProviderProps = {
  children: React.ReactNode
}

const MapContext = React.createContext<
  | {
      selectedMapHex: string
      selectMapHex: (hexID: string) => void
      // altitudeViewer: number
      // goUpAltitudeViewer: () => void
      // goDownAltitudeViewer: () => void
    }
  | undefined
>(undefined)

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [selectedMapHex, setSelectedMapHex] = React.useState('')
  // Altitude viewer
  // const [altitudeViewer, setAltitudeViewer] = React.useState(0)
  // const goUpAltitudeViewer = () => {
  //   setAltitudeViewer((s) => s + 1)
  // }
  // const goDownAltitudeViewer = () => {
  //   if (altitudeViewer > 0) {
  //     setAltitudeViewer((s) => s - 1)
  //   }
  // }

  const selectMapHex = (hexID: string) => {
    setSelectedMapHex(hexID)
  }
  return (
    <MapContext.Provider
      value={{
        selectedMapHex,
        selectMapHex,
        // altitudeViewer,
        // goUpAltitudeViewer,
        // goDownAltitudeViewer,
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
