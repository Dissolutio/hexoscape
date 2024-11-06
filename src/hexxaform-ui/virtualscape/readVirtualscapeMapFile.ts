const BYTES_PER_FLOAT = 8
const BYTES_PER_INT32 = 4
const BYTES_PER_UINT8 = 1

let bytePosition = 0
export default function readVirtualscapeMapFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
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

      virtualScapeMap.version = getDouble({ dataView })
      virtualScapeMap.name = readCString(dataView)
      virtualScapeMap.author = readCString(dataView)
      virtualScapeMap.playerNumber = readCString(dataView)
      const scenarioLength = getInt32({ dataView })
      let scenarioRichText_M = ''
      for (let i = 0; i < scenarioLength; i++) {
        scenarioRichText_M += String.fromCharCode(getUint8({ dataView }))
      }
      virtualScapeMap.scenario = rtfToText(scenarioRichText_M)
      virtualScapeMap.levelPerPage = getInt32({ dataView })
      virtualScapeMap.printingTransparency = getInt32({ dataView })
      virtualScapeMap.printingGrid = getInt32({ dataView }) !== 0
      virtualScapeMap.printTileNumber = getInt32({ dataView }) !== 0
      virtualScapeMap.printStartAreaAsLevel = getInt32({ dataView }) !== 0
      virtualScapeMap.tileCount = getInt32({ dataView })

      for (let i = 0; i < virtualScapeMap.tileCount; i++) {
        const tile = {
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

        tile.type = getInt32({ dataView })
        tile.version = getDouble({ dataView })
        tile.rotation = getInt32({ dataView })
        tile.posX = getInt32({ dataView })
        tile.posY = getInt32({ dataView })
        tile.posZ = getInt32({ dataView })
        tile.glyphLetter = String.fromCharCode(getUint8({ dataView }))

        tile.glyphName = readCString(dataView)

        tile.startName = readCString(dataView)
        tile.colorf = getInt32({ dataView })

        virtualScapeMap.tiles.push(tile)
      }

      // sort by posZ, so we can build from the bottom up (posZ is altitude in virtualscape)
      virtualScapeMap.tiles.sort((a, b) => {
        return a.posZ - b.posZ
      })
      resolve(virtualScapeMap)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsArrayBuffer(file)

    function getDouble({ dataView }: { dataView: DataView }): number {
      const val = dataView.getFloat64(bytePosition, true)
      bytePosition += BYTES_PER_FLOAT
      return val
    }
    function getInt32({ dataView }: { dataView: DataView }): number {
      const val = dataView.getInt32(bytePosition, true)
      bytePosition += BYTES_PER_INT32
      return val
    }
    function getUint8({ dataView }: { dataView: DataView }): number {
      const val = dataView.getUint8(bytePosition)
      bytePosition += BYTES_PER_UINT8
      return val
    }
    function readCString(dataView: DataView): string {
      const length = readCStringLength(dataView)
      let value = ''
      for (let i = 0; i < length; i++) {
        const newChar = String.fromCodePoint(
          dataView.getInt16(bytePosition, true)
        )
        value += newChar
        bytePosition += 2
      }
      return value
    }
    function readCStringLength(dataView: DataView): number {
      let length = 0
      const byte = dataView.getUint8(bytePosition)
      bytePosition += 1

      if (byte !== 0xff) {
        length = byte
      } else {
        const mysterious3BytesFor1Short = bytePosition - 1 // I have no idea why the short is read from the same spot as the first byte, but the offset must be incremented by 3 after the short or there's an error
        const short = dataView.getUint16(mysterious3BytesFor1Short, false)
        bytePosition += 2

        if (short === 0xfffe) {
          return readCStringLength(dataView)
        } else if (short === 0xffff) {
          length = dataView.getUint32(bytePosition, true)
          bytePosition += 4
        } else {
          length = short
        }
      }

      return length
    }
    function rtfToText(rtf: string) {
      // https://stackoverflow.com/questions/29922771/convert-rtf-to-and-from-plain-text
      rtf = rtf.replace(/\\par[d]?/g, '')
      return rtf
        .replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '')
        .trim()
    }
  })
}
