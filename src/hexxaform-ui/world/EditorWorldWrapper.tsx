type Props = {
  children: React.ReactNode
}
export const EditorWorldWrapper = (props: Props) => {
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
    </div>
  )
}
