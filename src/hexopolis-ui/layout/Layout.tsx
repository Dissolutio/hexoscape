import { modalStates, useUIContext } from '../../hexopolis-ui/contexts'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { ModalDisplay } from './ModalDisplay'
import { playerColors } from '../theme'
import useMuiSize from './useMuiSize'
import { Drawer } from '@mui/material'
import { DrawerList } from './DrawerList'
import { navHeights } from './mui-appbar-heights'

export const Layout = ({
  children,
  playerID,
}: {
  children: ReactNode[]
  playerID: string
}) => {
  const { modalState } = useUIContext()
  const playerColor = playerColors[playerID]
  const size = useMuiSize()
  if (size === 'xs' || size === 'sm') {
    // in general, xs and sm should be treated as 'mobile'
  }
  return (
    <>
      {modalState !== modalStates.off && <ModalDisplay />}
      <LayoutContainer
        id={`player${playerID}`} // for linking to this player view (useful in local dev, implemented in HeaderNav logo link)
        $playerColor={playerColor}
        $size={size}
      >
        <SideNavDrawer playerID={playerID} />
        <div>{children[0]}</div>
        <LayoutMiddle>{children[1]}</LayoutMiddle>
        {children?.[2] && <LayoutBottom>{children[2]}</LayoutBottom>}
      </LayoutContainer>
    </>
  )
}
const SideNavDrawer = ({ playerID }: { playerID: string }) => {
  const { isNavOpen, toggleIsNavOpen } = useUIContext()
  const verticalOffset = parseInt(playerID)
  return (
    <Drawer
      keepMounted={true}
      open={isNavOpen}
      onClose={() => toggleIsNavOpen(false)}
      sx={{
        '.MuiDrawer-paper': {
          color: 'var(--white)',
          backgroundColor: 'var(--black)',
          transform: `translateY(${verticalOffset * 100}vh)`,
        },
      }}
    >
      <DrawerList />
    </Drawer>
  )
}

const LayoutContainer = styled.div<{ $playerColor: string; $size: string }>`
  --player-color: ${(props) => props?.$playerColor ?? `var(--player-color)`};
  width: 100%;
  height: 100vh;
  --top-size: ${(props) => navHeights[props.$size]}px;
  --middle-size: ${(props) =>
    props.$size === 'xl' || props.$size === 'lg' ? '70vh' : '65vh'};
  --bottom-size: calc(100vh - var(--top-size) - var(--middle-size));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  background-color: var(--outer-space);
  color: var(--player-color);
`
const LayoutMiddle = styled.div`
  width: 100%;
  height: var(--middle-size);
  flex: 1;
`
const LayoutBottom = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: var(--bottom-size);
  background: var(--black);
  overflow: auto;
`
