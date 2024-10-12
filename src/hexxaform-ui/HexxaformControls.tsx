import { Button, ButtonGroup } from '@mui/material'
import { GiArrowCursor } from 'react-icons/gi'
import { useMapContext } from './useMapContext'
import { BgioProps } from '../game/hexxaform/hexxaform-types'
import { LoadSaveMapButtons } from './LoadSaveMapButtons'
import ExportFileButton from './ExportFileButton'
import ImportFileButton from './ImportFileButton'

export const HexxaformControls = ({ boardHexes, hexMap, moves }: BgioProps) => {
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

      <ButtonGroup
        sx={{ padding: '10px' }}
        variant="contained"
        aria-label="Save and load map"
      >
        <LoadSaveMapButtons
          moves={moves}
          hexMap={hexMap}
          boardHexes={boardHexes}
        />
        <ExportFileButton
          boardHexes={boardHexes}
          hexMap={hexMap}
          moves={moves}
        />
        <ImportFileButton moves={moves} />
      </ButtonGroup>
    </>
  )
}
