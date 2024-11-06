import { VirtualScapeTile } from '../../game/hexxaform/hexxaform-types'
import rtfToText from './rtfToText'

const BYTES_PER_FLOAT = 8
const BYTES_PER_INT32 = 4
const BYTES_PER_UINT8 = 1

export default function readVirtualscapeMapFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let mutant = 0
    reader.onloadend = () => {
      const arrayBuffer = reader.result
      const dataView = new DataView(arrayBuffer as ArrayBuffer)
      const virtualScapeMap = {
        version: 0,
        name: '',
        author: '',
        playerNumber: '',
        scenario: '',
        levelPerPage: 0,
        printingTransparency: 0,
        printingGrid: false,
        printTileNumber: false,
        printStartAreaAsLevel: false,
        tileCount: 0,
        tiles: [],
      }

      virtualScapeMap.version = getDouble_M({ dataView })
      virtualScapeMap.name = readCString_M(dataView, 'NAME').value
      virtualScapeMap.author = readCString_M(dataView, 'AUTHOR').value
      virtualScapeMap.playerNumber = readCString_M(
        dataView,
        'PLAYER_NUMBER'
      ).value
      const scenarioLength = getInt32_M({ dataView })
      let scenarioRichText_M = ''
      for (let i = 0; i < scenarioLength; i++) {
        scenarioRichText_M += String.fromCharCode(getUint8_M({ dataView }))
      }
      virtualScapeMap.scenario = rtfToText(scenarioRichText_M)
      virtualScapeMap.levelPerPage = getInt32_M({ dataView })
      virtualScapeMap.printingTransparency = getInt32_M({ dataView })
      virtualScapeMap.printingGrid = getInt32_M({ dataView }) !== 0
      virtualScapeMap.printTileNumber = getInt32_M({ dataView }) !== 0
      virtualScapeMap.printStartAreaAsLevel = getInt32_M({ dataView }) !== 0
      virtualScapeMap.tileCount = getInt32_M({ dataView })

      for (let i = 0; i < virtualScapeMap.tileCount; i++) {
        const tile: VirtualScapeTile = {
          type: 0,
          version: 0,
          rotation: 0,
          posX: 0,
          posY: 0,
          posZ: 0,
          glyphLetter: '',
          glyphName: '',
          startName: '',
          colorf: 0,
        }

        tile.type = getInt32_M({ dataView })
        tile.version = getDouble_M({ dataView })
        tile.rotation = getInt32_M({ dataView })
        tile.posX = getInt32_M({ dataView })
        tile.posY = getInt32_M({ dataView })
        tile.posZ = getInt32_M({ dataView })
        tile.glyphLetter = String.fromCharCode(getUint8_M({ dataView }))

        tile.glyphName = readCString_M(dataView, 'TILE_GLYPH_NAME').value

        tile.startName = readCString_M(dataView, 'TILE_START_NAME').value
        tile.colorf = getInt32_M({ dataView })

        virtualScapeMap.tiles.push(tile)
      }

      // sort by posZ, so we can build from the bottom up
      virtualScapeMap.tiles.sort((a, b) => {
        return a.posZ - b.posZ
      })
      resolve(virtualScapeMap)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsArrayBuffer(file)

    function getDouble_M({ dataView }: { dataView: DataView }): number {
      const val = dataView.getFloat64(mutant, true)
      mutant += BYTES_PER_FLOAT
      return val
    }
    function getInt32_M({ dataView }: { dataView: DataView }): number {
      const val = dataView.getInt32(mutant, true)
      mutant += BYTES_PER_INT32
      return val
    }
    function getUint8_M({ dataView }: { dataView: DataView }): number {
      const val = dataView.getUint8(mutant)
      mutant += BYTES_PER_UINT8
      return val
    }
    function readCString_M(
      dataView: DataView,
      tag: string
    ): {
      value: string
      tag: string
    } {
      const { length, tag: t } = readCStringLength_M(dataView, tag)
      let value = ''
      for (let i = 0; i < length; i++) {
        const newChar = String.fromCodePoint(dataView.getInt16(mutant, true))
        value += newChar
        mutant += 2
      }
      return { value, tag: t }
    }
    function readCStringLength_M(
      dataView: DataView,
      tag: string
    ): {
      length: number
      tag: string
    } {
      let length = 0
      let lengthByteLength = 0
      const byte = dataView.getUint8(mutant)
      mutant += 1

      if (byte !== 0xff) {
        lengthByteLength = 1
        length = byte
      } else {
        const mysterious3BytesFor1Short = mutant - 1 // I have no idea why the short is read from the same spot as the first byte, but the offset must be incremented by 3 after the short or there's an error
        lengthByteLength = 3
        const short = dataView.getUint16(mysterious3BytesFor1Short, false)
        mutant += 2

        if (short === 0xfffe) {
          return readCStringLength_M(dataView, tag)
        } else if (short === 0xffff) {
          /* 
           So far, this branch of code seems to be unused.
           IF it's actually used, it remains to be seen if it will follow the pattern above, or some other pattern.
          */
          length = dataView.getUint32(mutant, true)
          mutant += 4
        } else {
          length = short
        }
      }

      return { length, tag }
    }
  })
}
