import { ButtonGroup, Container } from '@mui/material'
import { BgioProps } from '../game/hexxaform/hexxaform-types'
import { LoadSaveMapButtons } from './LoadSaveMapButtons'
import ExportFileButton from './ExportFileButton'
import ImportFileButton from './ImportFileButton'
import PenTerrainSelect from './PenTerrainSelect'

export const HexxaformControls = ({ boardHexes, hexMap, moves }: BgioProps) => {
  return (
    <Container sx={{ padding: 1 }}>
      <PenTerrainSelect />

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
    </Container>
  )
}
