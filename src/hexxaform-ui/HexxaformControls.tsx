import { Container } from '@mui/material'
import { BgioProps } from '../game/hexxaform/hexxaform-types'
import PenTerrainSelect from './PenTerrainSelect'
import FileButtonGroup from './FileButtonGroup'
import TakePictureButtonGroup from './TakePictureButtonGroup'

export const HexxaformControls = ({ boardHexes, hexMap, moves }: BgioProps) => {
  return (
    <Container sx={{ padding: 1 }}>
      <PenTerrainSelect />
      <FileButtonGroup boardHexes={boardHexes} hexMap={hexMap} moves={moves} />
      <TakePictureButtonGroup />
    </Container>
  )
}
