import { useBgioClientInfo } from '../../bgio-contexts'
import { modalStates, useUIContext } from '../../hexopolis-ui/contexts'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { ModalDisplay } from './ModalDisplay'

export const Layout = ({ children }: { children: ReactNode[] }) => {
  const { playerID } = useBgioClientInfo()
  const { modalState } = useUIContext()
  return (
    <>
      {modalState !== modalStates.off && <ModalDisplay />}
      <LayoutContainer
        id={`player${playerID}`} // for linking to this player view (useful in local dev, implemented in HeaderNav logo link)
      >
        <LayoutTop>{children[0]}</LayoutTop>
        <LayoutMiddle>{children[1]}</LayoutMiddle>
        <LayoutBottom>{children[2]}</LayoutBottom>
      </LayoutContainer>
    </>
  )
}
const LayoutContainer = styled.div`
  // SET CSS VARS
  --player-color: ${(props) => props.theme.playerColor};
  --navbar-height: 30px;
  --middle-size: 70vh;
  @media screen and (max-width: 1100px) {
    --middle-size: 60vh;
  }
  --muted-text: ${(props) => props.theme.colors.gray};
  /* position: relative; */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  color: var(--player-color);
`
const LayoutTop = styled.div`
  width: 100%;
  height: var(--navbar-height);
  background: var(--black);
`
const LayoutMiddle = styled.div`
  width: 100%;
  height: var(--middle-size);
  /* position: relative; */
  /* overflow: auto; */
`
const LayoutBottom = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: calc(100vh - var(--middle-size) - var(--navbar-height));
  padding: 4px 16px;
  margin: 0;
  box-sizing: border-box;
  background: var(--black);
  overflow: auto;
`
