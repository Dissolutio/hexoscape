import { BgioProps } from '../game/hexxaform/hexxaform-types'
import { Button } from '@mui/material'
import { HexTerrain } from '../game/types'
import { hexUtilsAdd } from '../game/hex-utils'

const DEVLogSomethingCoolButton = ({
  boardHexes,
  //   hexMap,
}: BgioProps) => {
  const onClick = () => {
    const myArr = Object.values(boardHexes)
    const myHexCoords = myArr
      .filter((item) => Boolean(item.terrain !== HexTerrain.void))
      .map((item) => {
        const copy = {
          q: item.q,
          r: item.r,
          s: item.s,
        }
        return hexUtilsAdd(copy, { q: -1, r: -1, s: 2 })
        // return item.id
      })
    console.log('🚀 ~ boardHexes:', myHexCoords)
  }
  return (
    <Button variant="contained" onClick={onClick}>
      Log My THANG
    </Button>
  )
}

export default DEVLogSomethingCoolButton
