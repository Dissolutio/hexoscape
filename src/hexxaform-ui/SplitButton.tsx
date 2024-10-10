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

type SaveLoadMapOption = {
  title: string
  onClick: () => void
  isDisabled: boolean
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
  const anchorRef = useRef<HTMLDivElement>(null)
  const options: SaveLoadMapOption[] = [
    {
      title: 'Save Map 1',
      onClick: handleSaveMap1,
      isDisabled: false,
    },
    {
      title: 'Save Map 2',
      onClick: handleSaveMap2,
      isDisabled: false,
    },
    {
      title: 'Save Map 3',
      onClick: handleSaveMap3,
      isDisabled: false,
    },
    {
      title: 'Load Map 1',
      onClick: handleLoadMap1,
      isDisabled: !isMap1,
    },
    {
      title: 'Load Map 2',
      onClick: handleLoadMap2,
      isDisabled: !isMap2,
    },
    {
      title: 'Load Map 3',
      onClick: handleLoadMap3,
      isDisabled: !isMap3,
    },
    ////
    {
      title: 'Load Giants Table Map',
      onClick: handleLoadGiantsTable,
      isDisabled: false,
    },
    {
      title: 'Load Forsaken Waters Map',
      onClick: handleLoadForsakenWaters,
      isDisabled: false,
    },
    {
      title: 'Load Cirdan Garden Map',
      onClick: handleLoadCirdanGarden,
      isDisabled: false,
    },
    {
      title: 'Load Hexagon Map',
      onClick: handleLoadHexagonMap,
      isDisabled: false,
    },
    {
      title: 'Load Rectangle Map',
      onClick: handleLoadRectangleMap,
      isDisabled: false,
    },
  ]
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
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="Load or save map"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          Load / Save Map <MdArrowDownward />
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
                  {options.map((option) => (
                    <MenuItem
                      key={option.title}
                      disabled={option.isDisabled}
                      onClick={option.onClick}
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
