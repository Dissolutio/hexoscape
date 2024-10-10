import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { useRef, useState } from 'react'
import { MdArrowDownward } from 'react-icons/md'
import { Divider } from '@mui/material'

type SaveLoadMapOption = {
  title: string
  onClick: () => void
}
type SplitButtonProps = {
  isMap1: boolean
  isMap2: boolean
  isMap3: boolean
  handleLoadMap1: () => void
  handleLoadMap2: () => void
  handleLoadMap3: () => void
  handleSaveMap1: () => void
  handleSaveMap2: () => void
  handleSaveMap3: () => void
  handleLoadGiantsTable: () => void
  handleLoadForsakenWaters: () => void
  handleLoadCirdanGarden: () => void
  handleLoadHexagonMap: () => void
  handleLoadRectangleMap: () => void
}
export default function SplitButton({
  isMap1,
  isMap2,
  isMap3,
  handleSaveMap1,
  handleSaveMap2,
  handleSaveMap3,
  handleLoadMap1,
  handleLoadMap2,
  handleLoadMap3,
  handleLoadGiantsTable,
  handleLoadForsakenWaters,
  handleLoadCirdanGarden,
  handleLoadHexagonMap,
  handleLoadRectangleMap,
}: SplitButtonProps) {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const anchorRef = useRef<HTMLDivElement>(null)
  const options: SaveLoadMapOption[] = [
    {
      title: 'Save Map 1',
      onClick: handleSaveMap1,
    },
    {
      title: 'Save Map 2',
      onClick: handleSaveMap2,
    },
    {
      title: 'Save Map 3',
      onClick: handleSaveMap3,
    },
    {
      title: 'Load Map 1',
      onClick: handleLoadMap1,
    },
    {
      title: 'Load Map 2',
      onClick: handleLoadMap2,
    },
    {
      title: 'Load Map 3',
      onClick: handleLoadMap3,
    },
    ////
    {
      title: 'Load Giants Table Map',
      onClick: handleLoadGiantsTable,
    },
    {
      title: 'Load Forsaken Waters Map',
      onClick: handleLoadForsakenWaters,
    },
    {
      title: 'Load Cirdan Garden Map',
      onClick: handleLoadCirdanGarden,
    },
    {
      title: 'Load Hexagon Map',
      onClick: handleLoadHexagonMap,
    },
    {
      title: 'Load Rectangle Map',
      onClick: handleLoadRectangleMap,
    },
  ]

  const handleClick = () => {
    options?.[selectedIndex]?.onClick?.()
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef?.current?.contains?.(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick}>{options?.[selectedIndex]?.title}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <MdArrowDownward />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="right-end"
        transition
        // disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.title}
                      disabled={
                        (index === 3 && !isMap1) ||
                        (index === 4 && !isMap2) ||
                        (index === 5 && !isMap3)
                      }
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
