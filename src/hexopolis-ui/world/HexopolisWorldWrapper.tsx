import { Notifications } from '../../hexopolis-ui/notifications/Notifications'
import { RoundCounter } from '../../hexopolis-ui/hexmap/RoundCounter'
import { DraftCounter } from '../../hexopolis-ui/hexmap/DraftCounter'
import { useBgioCtx } from '../../bgio-contexts'
type Props = {
  children: React.ReactNode
}
export const HexopolisWorldWrapper = (props: Props) => {
  const { isDraftPhase } = useBgioCtx()
  return (
    <div
      id="canvas-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {props.children}
      <Notifications />
      <RoundCounter />
      {isDraftPhase && <DraftCounter />}
    </div>
  )
}
