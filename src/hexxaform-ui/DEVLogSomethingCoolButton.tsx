import { BgioProps } from '../game/hexxaform/hexxaform-types'
import { Button } from '@mui/material'
import { HexTerrain } from '../game/types'

const DEVLogSomethingCoolButton = ({
  boardHexes,
  hexMap,
}: BgioProps) => {
  const onClick = () => {
    console.log("🚀 ~ hexMap:", hexMap)
    // const myArr = Object.values(boardHexes)
    // console.log('🚀 ~ boardHexes:', boardHexes)
  }
  return (
    <Button variant="contained" onClick={onClick}>
      Log My THANG
    </Button>
  )
}

export default DEVLogSomethingCoolButton
