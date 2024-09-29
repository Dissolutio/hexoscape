import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { MdOutlineFormatPaint, MdOutlineHive } from 'react-icons/md'

export default function BottomNav() {
  const [value, setValue] = React.useState(0)

  return (
    <Box sx={{ width: '100vw', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Paint" icon={<MdOutlineFormatPaint />} />
        <BottomNavigationAction label="Pieces" icon={<MdOutlineHive />} />
        <BottomNavigationAction label="Nearby" icon={<MdOutlineHive />} />
      </BottomNavigation>
    </Box>
  )
}
