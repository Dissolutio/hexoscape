import { generateHexID } from "../../game/constants"
import { hexUtilsOddRToCube } from "../../game/hex-utils"
import { VirtualScapeMap, VirtualScapeTile } from "../../game/hexxaform/hexxaform-types"

/* 
This function reads a specific binary file format used by VirtualScape.
VirtualScape map editor: https://github.com/didiers/virtualscape
*/
const isLittleEndian = true
let offset = 0
export default function readVirtualscapeMapFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const arrayBuffer = reader.result
      const dataView = new DataView(arrayBuffer as ArrayBuffer)
      offset = 0
      const virtualScapeMap: VirtualScapeMap = {
        version: 0,
        name: '',
        author: '',
        playerNumber: '',
        scenario: '',
        levelPerPage: 0,
        printingTransparency: 0,
        printingGrid: false,
        printTileNumber: false,
        printStartAreaAsLevel: true,
        tileCount: 0,
        tiles: [],
      }

      virtualScapeMap.version = getFloat64(dataView)
      virtualScapeMap.name = readCString(dataView)
      virtualScapeMap.author = readCString(dataView)
      virtualScapeMap.playerNumber = readCString(dataView)
      const scenarioLength = getInt32(dataView)
      let scenarioRichText = ''
      for (let i = 0; i < scenarioLength; i++) {
        scenarioRichText += String.fromCharCode(getUint8(dataView))
      }
      virtualScapeMap.scenario = rtfToText(scenarioRichText)
      virtualScapeMap.levelPerPage = getInt32(dataView)
      virtualScapeMap.printingTransparency = getInt32(dataView)
      virtualScapeMap.printingGrid = getInt32(dataView) !== 0
      virtualScapeMap.printTileNumber = getInt32(dataView) !== 0
      virtualScapeMap.printStartAreaAsLevel = getInt32(dataView) !== 0
      virtualScapeMap.tileCount = getInt32(dataView)

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
          isFigureTile: false,
          figure: {
            name: '',
            name2: '',
          },
          isPersonalTile: false,
          personal: {
            pieceSize: 0,
            textureTop: '',
            textureSide: '',
            letter: '',
            name: '',
          },
        }
        const tileType = getInt32(dataView)
        tile.type = tileType
        tile.version = getFloat64(dataView)
        tile.rotation = getInt32(dataView)
        tile.posX = getInt32(dataView)
        tile.posY = getInt32(dataView)
        tile.posZ = getInt32(dataView)
        const glyphCode = getUint8(dataView)
        tile.glyphLetter = String.fromCharCode(glyphCode)
        tile.glyphName = readCString(dataView)
        console.log("🚀 ~ returnnewPromise ~ glyphCode:", { glyphCode, glyphLetter: tile.glyphLetter, glyphName: tile.glyphName, type: tile.type })
        tile.startName = readCString(dataView)
        tile.colorf = getInt32(dataView)

        if (Math.floor(tileType / 1000) === 17) {
          // Personal tiles
          tile.isPersonalTile = true
          tile.personal.pieceSize = getInt32(dataView)
          tile.personal.textureTop = readCString(dataView)
          tile.personal.textureSide = readCString(dataView)
          tile.personal.letter = readCString(dataView)
          tile.personal.name = readCString(dataView)
        }
        if (Math.floor(tileType / 1000) === 18) {
          // Figure tiles
          tile.isFigureTile = true
          tile.figure.name = readCString(dataView)
          tile.figure.name2 = readCString(dataView)
        }
        virtualScapeMap.tiles.push(tile)
      }

      // sort by posZ, so we can build from the bottom up (posZ is altitude in virtualscape)
      virtualScapeMap.tiles.sort((a, b) => {
        return a.posZ - b.posZ
      })
      const newTiles = virtualScapeMap.tiles.map(t => {
        const cubeCoords = hexUtilsOddRToCube(t.posX, t.posY)
        const id = generateHexID(cubeCoords)
        return { ...t, cubeCoords }
      })
      resolve(virtualScapeMap)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsArrayBuffer(file)
  })
}

function getFloat64(dataView: DataView): number {
  const val = dataView.getFloat64(offset, isLittleEndian)
  const BYTES_PER_FLOAT = 8
  offset += BYTES_PER_FLOAT
  return val
}
function getInt32(dataView: DataView): number {
  const val = dataView.getInt32(offset, isLittleEndian)
  const BYTES_PER_INT32 = 4
  offset += BYTES_PER_INT32
  return val
}
function getUint8(dataView: DataView): number {
  const val = dataView.getUint8(offset)
  const BYTES_PER_UINT8 = 1
  offset += BYTES_PER_UINT8
  return val
}
function readCString(dataView: DataView): string {
  const length = readCStringLength(dataView)
  let value = ''
  for (let i = 0; i < length; i++) {
    const newChar = String.fromCodePoint(
      dataView.getInt16(offset, isLittleEndian)
    )
    value += newChar
    offset += 2
  }
  return value
}
function readCStringLength(dataView: DataView): number {
  let length = 0
  const byte = dataView.getUint8(offset)
  offset += 1

  if (byte !== 0xff) {
    length = byte
  } else {
    const short = dataView.getUint16(offset, isLittleEndian)
    offset += 2

    if (short === 0xfffe) {
      return readCStringLength(dataView)
    } else if (short === 0xffff) {
      length = dataView.getUint32(offset, true)
      offset += 4
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