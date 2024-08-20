import { HEXGRID_SPACING } from '../../app/constants'
import { useBgioClientInfo, useBgioCtx, useBgioG } from '../../bgio-contexts'
import { useMapContext } from '../../hexopolis-ui/contexts'
import { Notifications } from '../../hexopolis-ui/notifications/Notifications'
import React, { useEffect } from 'react'
import { DraftCounter } from './DraftCounter'
import { HexgridLayout } from './HexgridLayout'
import { MapHex } from './MapHex'
import { MapHexStyles } from './MapHexStyles'
import { RoundCounter } from './RoundCounter'
import { ZoomControls } from './ZoomControls'

type Props = {
  mapWrapperRef: React.RefObject<HTMLDivElement>
}

export const MapDisplay = ({ mapWrapperRef }: Props) => {
  const {
    boardHexes,
    hexMap: { hexSize, flat, mapId, mapSize },
  } = useBgioG()
  const { playerID } = useBgioClientInfo()
  const { isDraftPhase } = useBgioCtx()
  const { viewBox } = useMapContext()
  //! MAP SETUP/LAYOUT CONFIG
  const initialMapState = {
    width: 100,
    height: 100,
  }
  const [mapState, setMapState] = React.useState(() => initialMapState)
  const recalculateMapState = () => setMapState(initialMapState)
  useEffect(() => {
    recalculateMapState()
    // when the map changes, we recalculate, no other times
  }, [mapId])

  //! ZOOM FEATURE
  const zoomSeed = 5
  const zoomInterval = mapSize * zoomSeed
  const handleClickZoomIn = () => {
    // increases width and height by zoom interval, attempts scroll correction afterwards
    const el = mapWrapperRef.current
    const currentScrollTop = el?.scrollTop ?? mapState.height + zoomInterval / 2
    const currentScrollLeft =
      el?.scrollLeft ?? mapState.width + zoomInterval / 2
    setMapState((mapState) => ({
      ...mapState,
      width: mapState.width + zoomInterval,
      height: mapState.height + zoomInterval,
    }))
    el &&
      el.scrollTo({
        left: currentScrollLeft + zoomInterval,
        top: currentScrollTop + zoomInterval,
      })
  }
  const handleClickZoomOut = () => {
    // Early return if already all the way zoomed out
    // decreases width and height by zoom interval, attempts scroll correction afterwards
    const el = mapWrapperRef.current
    const currentScrollTop = el?.scrollTop ?? mapState.height - zoomInterval / 2
    const currentScrollLeft =
      el?.scrollLeft ?? mapState.width - zoomInterval / 2
    setMapState((s) => ({
      ...s,
      width: s.width - zoomInterval,
      height: s.height - zoomInterval,
    }))
    el &&
      el.scrollTo({
        left: currentScrollLeft - zoomInterval,
        top: currentScrollTop - zoomInterval,
      })
  }
  return (
    <MapHexStyles hexSize={hexSize} playerID={playerID}>
      <ZoomControls
        handleClickZoomIn={handleClickZoomIn}
        handleClickZoomOut={handleClickZoomOut}
      />
      <Notifications />
      <RoundCounter />
      {isDraftPhase && <DraftCounter />}
      <HexgridLayout
        size={{ x: hexSize, y: hexSize }}
        flat={flat}
        spacing={HEXGRID_SPACING}
      >
        <svg
          width={`${mapState.width}%`}
          height={`${mapState.height}%`}
          viewBox={viewBox}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="hexgrid-layout">
            {/* This displays the base hexagons and the hex-text (unit name, altitude, hex.id) */}
            {Object.values(boardHexes).map((hex) => (
              <MapHex key={hex.id} hex={hex} />
            ))}
          </g>
        </svg>
      </HexgridLayout>
    </MapHexStyles>
  )
}
