import {
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from '@mui/material'
import { useMapContext } from './useMapContext'

const MapLensToggles = () => {
  const { isShowStartZones, toggleIsShowStartZones } = useMapContext()
  return (
    <Container>
      <FormControl component="fieldset">
        <FormLabel component="legend">Map Lenses</FormLabel>
        <FormGroup aria-label="map lens toggles" row>
          <FormControlLabel
            value={isShowStartZones}
            control={
              <Switch
                color="primary"
                checked={isShowStartZones}
                onChange={toggleIsShowStartZones}
              />
            }
            label="Show Start Zones"
            labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
    </Container>
  )
}

export default MapLensToggles
