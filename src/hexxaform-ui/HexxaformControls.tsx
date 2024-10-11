import styled from 'styled-components'
import { ChangeEvent } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import { GiArrowCursor } from 'react-icons/gi'
import { MdOutlineDownloadForOffline, MdFileOpen } from 'react-icons/md'

import { useMapContext } from './useMapContext'
import { BgioProps } from '../game/hexxaform/hexxaform-types'
import { LoadSaveMapButtons } from './LoadSaveMapButtons'

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
      <ButtonGroup
        sx={{ padding: '10px' }}
        variant="contained"
        aria-label="Set pen mode"
      >
        <Button
          variant="outlined"
          onClick={toggleSelectHexMode}
          startIcon={<GiArrowCursor />}
        >
          Select
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <LoadSaveMapButtons
          moves={moves}
          hexMap={hexMap}
          boardHexes={boardHexes}
        />
        <Button
          startIcon={<MdOutlineDownloadForOffline />}
          onClick={handleClickExportJson}
          variant="contained"
        >
          Download Map
        </Button>
        <Button
          startIcon={<MdFileOpen />}
          onClick={handleClickFileSelect}
          variant="contained"
        >
          Import JSON File
        </Button>
        <ReadFile id={uploadElementID} readFile={readFile} />
      </ButtonGroup>
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
