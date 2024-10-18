import { Container } from '@mui/material'
import { BgioProps } from '../game/hexxaform/hexxaform-types'
import PenTerrainSelect from './PenTerrainSelect'
import FileButtonGroup from './FileButtonGroup'
import TakePictureButtonGroup from './TakePictureButtonGroup'
import MapLensToggles from './MapLensToggles'

export const HexxaformControls = ({ boardHexes, hexMap, moves }: BgioProps) => {
  return (
    <Container sx={{ padding: 1 }}>
      <PenTerrainSelect />
      <MapLensToggles />
      <FileButtonGroup boardHexes={boardHexes} hexMap={hexMap} moves={moves} />
      <TakePictureButtonGroup />
    </Container>
  )
}
