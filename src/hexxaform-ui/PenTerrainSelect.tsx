import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ListItemIcon } from '@mui/material'
import {
  GiArrowCursor,
  GiPeaks,
  GiGrass,
  GiIsland,
  GiWaterfall,
} from 'react-icons/gi'
import { useMapContext } from './useMapContext'
import { PenMode } from '../game/hexxaform/hexxaform-types'

export default function PenTerrainSelect() {
  const { penMode, toggleTerrainPen } = useMapContext()

  const handleChange = (event: SelectChangeEvent) => {
    toggleTerrainPen(event.target.value as PenMode)
  }
  return (
    <FormControl variant="filled">
      <InputLabel id="pen-terrain-select-label">Terrain</InputLabel>
      <Select
        autoWidth
        sx={{
          minWidth: 100,
        }}
        MenuProps={{
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        }}
        labelId="pen-terrain-select-label"
        id="pen-terrain-select"
        value={penMode}
        onChange={handleChange}
      >
        <MenuItem value={PenMode.none}>
          <ListItemIcon>
            <GiArrowCursor />
          </ListItemIcon>
          <span>Select</span>
        </MenuItem>

        <MenuItem value={PenMode.grass}>
          <ListItemIcon>
            <GiGrass />
          </ListItemIcon>
          <span>Grass</span>
        </MenuItem>

        <MenuItem value={PenMode.rock}>
          <ListItemIcon>
            <GiPeaks />
          </ListItemIcon>
          <span>Rock</span>
        </MenuItem>

        <MenuItem value={PenMode.sand}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Sand</span>
        </MenuItem>
        <MenuItem value={PenMode.water}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Water</span>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
