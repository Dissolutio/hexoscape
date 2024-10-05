import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { MdHome } from 'react-icons/md'
import { useUIContext } from '../contexts'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../app/routes'

export const DrawerList = () => {
  const { toggleIsNavOpen } = useUIContext()
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleIsNavOpen(false)}
    >
      <List>
        {['Home'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={ROUTES.home}>
              <ListItemIcon
                sx={{
                  color: 'inherit',
                }}
              >
                {index % 2 === 0 ? <MdHome /> : <MdHome />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
