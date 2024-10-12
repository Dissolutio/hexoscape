import { Button } from '@mui/material'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import { BgioProps } from '../game/hexxaform/hexxaform-types'

const ExportFileButton = ({ boardHexes, hexMap, moves }: BgioProps) => {
  const handleClickExportJson = () => {
    const filename = `MyHexMap.json`
    const data = {
      boardHexes,
      hexMap,
    }
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      `data:application/x-ndjson;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
      )}`
    )
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.append(element)
    element.click()
    element.remove()
  }
  return (
    <Button
      startIcon={<MdOutlineDownloadForOffline />}
      onClick={handleClickExportJson}
      variant="contained"
    >
      Download Map
    </Button>
  )
}
export default ExportFileButton
