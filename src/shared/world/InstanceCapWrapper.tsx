import { ThreeEvent } from "@react-three/fiber"
import { BoardHex } from "../../game/types"
import { JSXElementConstructor } from "react"
import { InstanceCapProps } from "./InstanceFluidHexCap"

type InstanceCapWrapperProps = {
  capHexesArray: BoardHex[]
  onClick: (e: ThreeEvent<MouseEvent>, hex: BoardHex) => void
  component: JSXElementConstructor<InstanceCapProps>
  hoverID: string
  setHoverID: React.Dispatch<React.SetStateAction<string>>
  glKey: string
}

export default function InstanceCapWrapper(props: InstanceCapWrapperProps) {
  const InstanceCap = props.component
  const numInstances = props.capHexesArray.length
  if (numInstances < 1) return null
  const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return (
    <InstanceCap
      key={key}
      capHexesArray={props.capHexesArray}
      onClick={props.onClick}
      hoverID={props.hoverID}
      setHoverID={props.setHoverID}
    />
  )
}
