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
import { Box, ButtonGroup, Container } from '@mui/material'
import { useMapContext } from './useMapContext'
import { GiArrowCursor } from 'react-icons/gi'
import SplitButton from './SplitButton'
import { MdFileUpload } from 'react-icons/md'

type BgioProps = {
  boardHexes: BoardHexes
  hexMap: HexMap
  moves: any
}

export const HexxaformControls = ({ boardHexes, hexMap, moves }: BgioProps) => {
  const uploadElementID = 'upload'
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
  const handleClickFileSelect = () => {
    const element = document.getElementById(uploadElementID)
    if (element) {
      element.click()
    }
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
  const { toggleSelectHexMode } = useMapContext()
  return (
    <>
      <StyledSection>
        <ButtonGroup variant="contained" aria-label="Set pen mode">
          <Button
            variant="outlined"
            onClick={toggleSelectHexMode}
            startIcon={<GiArrowCursor />}
          >
            Select
          </Button>
        </ButtonGroup>
      </StyledSection>

      <Box>
        <LoadSaveMapButtons
          moves={moves}
          hexMap={hexMap}
          boardHexes={boardHexes}
        />
      </Box>

      <StyledSection>
        <h4>Export JSON File:</h4>
        <button onClick={handleClickExportJson}>Export Map JSON</button>
      </StyledSection>

      <StyledSection>
        <Button
          startIcon={<MdFileUpload />}
          onClick={handleClickFileSelect}
          variant="contained"
        >
          Import JSON File
        </Button>
        <ReadFile id={uploadElementID} readFile={readFile} />
      </StyledSection>
    </>
  )
}

type ReadFileProps = {
  id: string
  readFile: (event: ChangeEvent<HTMLInputElement>) => void
}
const ReadFile = ({ id, readFile }: ReadFileProps) => {
  return (
    <StyledVisuallyHiddenFileInput
      id={id}
      type="file"
      accept="application/json"
      onChange={readFile}
    />
  )
}
const StyledVisuallyHiddenFileInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1;
`
const LoadSaveMapButtons = ({ boardHexes, hexMap, moves }: BgioProps) => {
  const currentSaveableMap = { boardHexes, hexMap }
  const { map1, setMap1, map2, setMap2, map3, setMap3 } = useLocalMapMemory()
  const isMap1 =
    Object.keys(map1?.boardHexes ?? {})?.length > 0 && Boolean(map1?.hexMap)
  const isMap2 =
    Object.keys(map2?.boardHexes ?? {})?.length > 0 && Boolean(map2?.hexMap)
  const isMap3 =
    Object.keys(map3?.boardHexes ?? {})?.length > 0 && Boolean(map3?.hexMap)
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
  const handleLoadHexagonMap = () => {
    moves.loadMap(hexagonScenario)
  }
  const handleLoadRectangleMap = () => {
    moves.loadMap(rectangleScenario)
  }
  const handleLoadGiantsTable = () => {
    moves.loadMap({
      boardHexes: giantsTable.boardHexes,
      hexMap: giantsTable.hexMap,
    })
  }
  const handleLoadForsakenWaters = () => {
    moves.loadMap({
      boardHexes: forsakenWaters.boardHexes,
      hexMap: forsakenWaters.hexMap,
    })
  }
  const handleLoadCirdanGarden = () => {
    const translatedBoardHexes = translateHexagonBoardHexesToNormal(
      cirdanGardenMap.boardHexes,
      cirdanGardenMap.hexMap.mapSize
    )
    moves.loadMap({
      boardHexes: translatedBoardHexes,
      // boardHexes: cirdanGardenMap.boardHexes,
      hexMap: cirdanGardenMap.hexMap,
    })
  }
  const handleSaveMap1 = () => setMap1(currentSaveableMap)
  const handleSaveMap2 = () => setMap2(currentSaveableMap)
  const handleSaveMap3 = () => setMap3(currentSaveableMap)
  return (
    <>
      <SplitButton
        isMap1={isMap1}
        isMap2={isMap2}
        isMap3={isMap3}
        handleLoadMap1={handleLoadMap1}
        handleLoadMap2={handleLoadMap2}
        handleLoadMap3={handleLoadMap3}
        handleSaveMap1={handleSaveMap1}
        handleSaveMap2={handleSaveMap2}
        handleSaveMap3={handleSaveMap3}
        handleLoadGiantsTable={handleLoadGiantsTable}
        handleLoadForsakenWaters={handleLoadForsakenWaters}
        handleLoadCirdanGarden={handleLoadCirdanGarden}
        handleLoadHexagonMap={handleLoadHexagonMap}
        handleLoadRectangleMap={handleLoadRectangleMap}
      />
    </>
  )
}

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
