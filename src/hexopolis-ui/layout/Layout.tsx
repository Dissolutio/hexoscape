import { modalStates, useUIContext } from '../../hexopolis-ui/contexts'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { ModalDisplay } from './ModalDisplay'
import { playerColors } from '../theme'
import useMuiSize from './useMuiSize'
import { Drawer } from '@mui/material'
import { DrawerList } from './DrawerList'

export const Layout = ({
  children,
  playerID,
}: {
  children: ReactNode[]
  playerID: string
}) => {
  const { modalState, isNavOpen, toggleIsNavOpen } = useUIContext()
  const playerColor = playerColors[playerID]
  const size = useMuiSize()
  const drawerWidth = 240
  return (
    <>
      {modalState !== modalStates.off && <ModalDisplay />}
      <Drawer
        keepMounted={true}
        open={isNavOpen}
        onClose={() => toggleIsNavOpen(false)}
      >
        <DrawerList />
      </Drawer>
      <LayoutContainer
        id={`player${playerID}`} // for linking to this player view (useful in local dev, implemented in HeaderNav logo link)
        $playerColor={playerColor}
        $size={size}
      >
        <div>{children[0]}</div>
        <LayoutMiddle>{children[1]}</LayoutMiddle>
        <LayoutBottom>{children[2]}</LayoutBottom>
      </LayoutContainer>
    </>
  )
}
const navHeights = {
  xs: 48,
  sm: 56,
  md: 64,
  lg: 72,
  xl: 80,
}
const LayoutContainer = styled.div<{ $playerColor: string; $size: string }>`
  --player-color: ${(props) => props?.$playerColor ?? `var(--player-color)`};
  --top-size: ${(props) => navHeights[props.$size]}px;
  --middle-size: ${(props) =>
    props.$size === 'xl' || props.$size === 'lg' ? '70vh' : '65vh'};
  --bottom-size: calc(100vh - var(--top-size) - var(--middle-size));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
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
  /* padding: 4px 16px; */
  /* margin: 0; */
  background: var(--black);
  overflow: auto;
`
