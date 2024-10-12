import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { MdFileOpen } from 'react-icons/md'

const ImportFileButton = ({ moves }: { moves: any }) => {
  const uploadElementID = 'upload'
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
  return (
    <>
      <Button
        startIcon={<MdFileOpen />}
        onClick={handleClickFileSelect}
        variant="contained"
      >
        Import Map File
      </Button>
      <ReadFile id={uploadElementID} readFile={readFile} />
    </>
  )
}
export default ImportFileButton

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
