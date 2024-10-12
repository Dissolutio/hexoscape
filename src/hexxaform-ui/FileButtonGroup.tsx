import { LoadSaveMapButtons } from './LoadSaveMapButtons'
import ExportFileButton from './ExportFileButton'
import ImportFileButton from './ImportFileButton'
import { BgioProps } from '../game/hexxaform/hexxaform-types'
import { ButtonGroup } from '@mui/material'

const FileButtonGroup = ({ moves, boardHexes, hexMap }: BgioProps) => {
  return (
    <ButtonGroup
      sx={{ padding: '10px' }}
      variant="contained"
      orientation="vertical"
      size={'small'}
      aria-label="Save and load map"
    >
      <LoadSaveMapButtons
        moves={moves}
        hexMap={hexMap}
        boardHexes={boardHexes}
      />
      <ExportFileButton boardHexes={boardHexes} hexMap={hexMap} moves={moves} />
      <ImportFileButton moves={moves} />
    </ButtonGroup>
  )
}

export default FileButtonGroup
