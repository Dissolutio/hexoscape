import { Container } from '@mui/material'
import { BgioProps } from '../game/hexxaform/hexxaform-types'
import PenTerrainSelect from './PenTerrainSelect'
import FileButtonGroup from './FileButtonGroup'
import TakePictureButtonGroup from './TakePictureButtonGroup'
import MapLensToggles from './MapLensToggles'
import PieceSizeSelect from './PieceSizeSelect'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'

export const HexxaformControls = ({ boardHexes, hexMap, moves }: BgioProps) => {
  return (
    <Container sx={{ padding: 1 }}>
      <PenTerrainSelect />
      <PieceSizeSelect />
      <MapLensToggles />
      <FileButtonGroup boardHexes={boardHexes} hexMap={hexMap} moves={moves} />
      <TakePictureButtonGroup />
      <DEVLogSomethingCoolButton boardHexes={boardHexes} hexMap={hexMap} />
    </Container>
  )
}
