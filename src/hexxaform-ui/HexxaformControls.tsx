import styled from 'styled-components'
import Button from '@mui/material/Button'

import { ChangeEvent } from 'react'
import { giantsTable } from '../game/setup/maps/giantsTable'
import { forsakenWaters } from '../game/setup/maps/forsakenWaters'
import { BoardHexes, HexMap } from '../game/types'
import {
  hexagonScenario,
  rectangleScenario,
} from '../game/hexxaform/hexxaform-setup'
import { cirdanGardenMap } from '../game/setup/maps/cirdanGarden'
import { useLocalMapMemory } from './useLocalMapMemory'
import { translateHexagonBoardHexesToNormal } from '../game/setup/hex-gen'

type BgioProps = {
  boardHexes: BoardHexes
  hexMap: HexMap
  moves: any
}

export const HexxaformControls = ({ boardHexes, hexMap, moves }: BgioProps) => {
  const handleClickExportJson = () => {
    const filename = `MyHexMap.json`
    const data = {
      boardHexes,
      hexMap,
    }

    const element = document.createElement('a')
    element.setAttribute(
      'href',
      `data:application/x-ndjson;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
      )}`
    )
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.append(element)
    element.click()
    element.remove()
  }

  const readFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event?.target?.files?.[0]
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onloadend = (): void => {
      if (typeof fileReader.result === 'string') {
        let data
        if (file.name.endsWith('.json')) {
          try {
            data = JSON.parse(fileReader.result)
            const loadableMap = {
              boardHexes: { ...data.boardHexes },
              hexMap: { ...data.hexMap },
            }
            moves.loadMap(loadableMap)
          } catch (error) {
            console.error(error)
          }
        } else {
          throw new Error('Unknown File type to import')
        }
      }
    }
    try {
      fileReader.readAsText(file)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledGrid>
      {/* <StyledSection>
        <h4>Undo/Redo:</h4>
        <UndoRedo />
      </StyledSection> */}

      {/* <StyledSection>
        <h4>Toggle pen thickness:</h4>
        <button onClick={togglePenThickness}>
          Toggle Pen Thickness (current {penThickness})
        </button>
      </StyledSection> */}

      {/* <StyledSection>
        <h4>Set Pen Mode:</h4>
        <StyledButton
          aria-label="Select Mode"
          title="Select Mode"
          onClick={toggleSelectHexMode}
          style={activeStyle(PenMode.none)}
        >
          <GiArrowCursor />
          <span>Select</span>
        </StyledButton>
        <StyledButton
          aria-label="Increase Altitude"
          title="Increase Altitude"
          onClick={toggleIncAltitudePen}
          style={activeStyle(PenMode.incAltitude)}
        >
          <GiUpCard />
          <span>Raise</span>
        </StyledButton>
        <StyledButton
          aria-label="Decrease Altitude"
          title="Decrease Altitude"
          onClick={toggleDecAltitudePen}
          style={activeStyle(PenMode.decAltitude)}
        >
          <GiUpCard style={flipOverStyle} />
          <span>Lower</span>
        </StyledButton>
        <StyledButton
          aria-label="Eraser"
          title="Eraser"
          style={activeStyle(PenMode.eraser)}
          onClick={toggleEraserPen}
        >
          <FaEraser />
          <span>Eraser</span>
        </StyledButton>
        <StyledButton
          aria-label="Water"
          title="Water"
          style={activeStyle(PenMode.water)}
          onClick={toggleWaterPen}
        >
          <GiWaterSplash />
          <span>Water</span>
        </StyledButton>
        <StyledButton
          aria-label="Grass"
          title="Grass"
          style={activeStyle(PenMode.grass)}
          onClick={toggleGrassPen}
        >
          <GiGrass />
          <span>Grass</span>
        </StyledButton>
        <StyledButton
          aria-label="Sand"
          title="Sand"
          style={activeStyle(PenMode.sand)}
          onClick={toggleSandPen}
        >
          <GiIsland />
          <span>Sand</span>
        </StyledButton>
        <StyledButton
          aria-label="Rock"
          title="Rock"
          style={activeStyle(PenMode.rock)}
          onClick={toggleRockPen}
        >
          <GiFallingRocks />
          <span>Rock</span>
        </StyledButton>
      </StyledSection> */}

      {/* <StyledSection>
        <h4>Set Pen Mode to Player StartZone:</h4>
        <StyledButton
          aria-label="Start Zone 0"
          onClick={() => toggleStartZonePen('0')}
          style={activeStyle(PenMode.startZone0)}
        >
          0
        </StyledButton>
        <StyledButton
          aria-label="Start Zone 1"
          onClick={() => toggleStartZonePen('1')}
          style={activeStyle(PenMode.startZone1)}
        >
          1
        </StyledButton>
        <StyledButton
          aria-label="Start Zone 2"
          onClick={() => toggleStartZonePen('2')}
          style={activeStyle(PenMode.startZone2)}
        >
          2
        </StyledButton>
        <StyledButton
          aria-label="Start Zone 3"
          onClick={() => toggleStartZonePen('3')}
          style={activeStyle(PenMode.startZone3)}
        >
          3
        </StyledButton>
        <StyledButton
          aria-label="Start Zone 4"
          onClick={() => toggleStartZonePen('4')}
          style={activeStyle(PenMode.startZone4)}
        >
          4
        </StyledButton>
        <StyledButton
          aria-label="Start Zone"
          onClick={() => toggleEraserStartZonePen()}
          style={activeStyle(PenMode.eraserStartZone)}
        >
          Erase Start Zones
        </StyledButton>
      </StyledSection> */}

      {/* <StyledSection>
        <h4>Toggle Lenses:</h4>
        <StyledButton
          style={greenOnRedOff(showStartzones)}
          onClick={toggleShowStartzones}
        >
          STARTZONES
        </StyledButton>
        <StyledButton
          style={greenOnRedOff(showTerrain)}
          onClick={toggleShowTerrain}
        >
          TERRAIN
        </StyledButton>
      </StyledSection> */}

      <StyledSection>
        <h4>Load/Save Maps:</h4>
        <LoadSaveMapButtons
          moves={moves}
          hexMap={hexMap}
          boardHexes={boardHexes}
        />
      </StyledSection>
      <StyledSection>
        <h4>Example Maps:</h4>
        <button onClick={() => moves.loadMap(hexagonScenario)}>
          Load Hexagon
        </button>
        <button onClick={() => moves.loadMap(rectangleScenario)}>
          Load Rectangle
        </button>
        <button
          onClick={() =>
            moves.loadMap({
              boardHexes: giantsTable.boardHexes,
              hexMap: giantsTable.hexMap,
            })
          }
        >
          Load Giants Table Map
        </button>
        <button
          onClick={() =>
            moves.loadMap({
              boardHexes: forsakenWaters.boardHexes,
              hexMap: forsakenWaters.hexMap,
            })
          }
        >
          Load The Forsaken Waters Map
        </button>
        <button
          onClick={() => {
            const translatedBoardHexes = translateHexagonBoardHexesToNormal(
              cirdanGardenMap.boardHexes,
              cirdanGardenMap.hexMap.mapSize
            )
            moves.loadMap({
              boardHexes: translatedBoardHexes,
              // boardHexes: cirdanGardenMap.boardHexes,
              hexMap: cirdanGardenMap.hexMap,
            })
          }}
        >
          Load Cirdan Gardens Map
        </button>
      </StyledSection>

      <StyledSection>
        <h4>Export JSON File:</h4>
        <button onClick={handleClickExportJson}>Export Map JSON</button>
      </StyledSection>

      <StyledSection>
        <h4>Import JSON File:</h4>
        <input
          id="upload"
          type="file"
          accept="application/json"
          onChange={readFile}
        />
      </StyledSection>
    </StyledGrid>
  )
}
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
  padding: 1rem;
`
export const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em 0;
  h4 {
    padding: 5px;
    margin: 0;
    font-size: 1rem;
  }
`

export const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadSaveMapButtons = ({ boardHexes, hexMap, moves }: BgioProps) => {
  const currentSaveableMap = { boardHexes, hexMap }
  const { map1, setMap1, map2, setMap2, map3, setMap3 } = useLocalMapMemory()
  const isMap1 = Object.keys(map1?.boardHexes ?? {})?.length > 0 && map1?.hexMap
  const isMap2 = Object.keys(map2?.boardHexes ?? {})?.length > 0 && map2?.hexMap
  const isMap3 = Object.keys(map3?.boardHexes ?? {})?.length > 0 && map3?.hexMap
  const handleLoadMap1 = () => {
    if (isMap1) {
      moves.loadMap({ boardHexes: map1.boardHexes, hexMap: map1.hexMap })
    }
  }
  const handleLoadMap2 = () => {
    if (isMap2) {
      moves.loadMap({ boardHexes: map2.boardHexes, hexMap: map2.hexMap })
    }
  }
  const handleLoadMap3 = () => {
    if (isMap3) {
      moves.loadMap({ boardHexes: map3.boardHexes, hexMap: map3.hexMap })
    }
  }
  const handleSaveMap1 = () => setMap1(currentSaveableMap)
  const handleSaveMap2 = () => setMap2(currentSaveableMap)
  const handleSaveMap3 = () => setMap3(currentSaveableMap)
  return (
    <>
      <Button onClick={handleLoadMap1} variant="contained" disabled={!isMap1}>
        Load Map 1
      </Button>
      <Button onClick={handleSaveMap1} variant="contained">
        Save Map 1
      </Button>
      <Button onClick={handleLoadMap2} variant="contained" disabled={!isMap2}>
        Load Map 2
      </Button>
      <Button onClick={handleSaveMap2} variant="contained">
        Save Map 2
      </Button>
      <Button onClick={handleLoadMap3} variant="contained" disabled={!isMap3}>
        Load Map 3
      </Button>
      <Button onClick={handleSaveMap3} variant="contained">
        Save Map 3
      </Button>
    </>
  )
}
