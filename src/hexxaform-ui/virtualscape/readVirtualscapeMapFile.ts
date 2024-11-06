import { VirtualScapeTile } from '../../game/hexxaform/hexxaform-types'
import rtfToText from './rtfToText'

const BYTES_PER_FLOAT = 8
const BYTES_PER_INT = 4
const BYTES_PER_UINT8 = 1
const getDouble = ({
  offset,
  dataView,
}: {
  offset: number
  dataView: DataView
}): {
  value: number
  offset: number
} => {
  return {
    value: dataView.getFloat64(offset, true),
    offset: offset + BYTES_PER_FLOAT,
  }
}
const getInt = ({
  offset,
  dataView,
}: {
  offset: number
  dataView: DataView
}): {
  value: number
  offset: number
} => {
  return {
    value: dataView.getInt32(offset, true),
    offset: offset + BYTES_PER_INT,
  }
}
export default function readVirtualscapeMapFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const arrayBuffer = reader.result
      const dataView = new DataView(arrayBuffer as ArrayBuffer)
      let currentOffset = 0
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

      const version = getDouble({ offset: currentOffset, dataView })
      virtualScapeMap.version = version.value
      currentOffset = version.offset

      const mapName = readCString(dataView, currentOffset, 'NAME')
      virtualScapeMap.name = mapName.value
      currentOffset = mapName.offset

      const mapAuthor = readCString(dataView, currentOffset, 'AUTHOR')
      virtualScapeMap.author = mapAuthor.value
      currentOffset = mapAuthor.offset

      const playerNumber = readCString(dataView, currentOffset, 'PLAYER_NUMBER')
      virtualScapeMap.playerNumber = playerNumber.value
      currentOffset = playerNumber.offset

      const scenarioLength = getInt({ offset: currentOffset, dataView })
      currentOffset = scenarioLength.offset

      let scenarioRichText = ''
      for (let i = 0; i < scenarioLength.value; i++) {
        scenarioRichText += String.fromCharCode(
          dataView.getUint8(currentOffset + i)
        )
      }
      currentOffset += BYTES_PER_UINT8 * scenarioLength.value
      virtualScapeMap.scenario = rtfToText(scenarioRichText)

      const levelPerPage = getInt({ offset: currentOffset, dataView })
      virtualScapeMap.levelPerPage = levelPerPage.value
      currentOffset = levelPerPage.offset

      const printingTransparency = getInt({
        offset: currentOffset,
        dataView,
      })
      virtualScapeMap.printingTransparency = printingTransparency.value
      currentOffset = printingTransparency.offset

      const printingGrid = getInt({ offset: currentOffset, dataView })
      virtualScapeMap.printingGrid = printingGrid.value !== 0
      currentOffset = printingGrid.offset

      const printTileNumber = getInt({ offset: currentOffset, dataView })
      virtualScapeMap.printTileNumber = printTileNumber.value !== 0
      currentOffset = printTileNumber.offset

      const printStartAreaAsLevel = getInt({
        offset: currentOffset,
        dataView,
      })
      virtualScapeMap.printStartAreaAsLevel = printStartAreaAsLevel.value !== 0
      currentOffset = printStartAreaAsLevel.offset

      const tileCount = getInt({ offset: currentOffset, dataView })
      virtualScapeMap.tileCount = tileCount.value
      currentOffset = tileCount.offset
      const TILE_DATA_OFFSET = currentOffset

      // THIS IS WHERE THE TWO OFFSETS HANDOFF: We stop using currentOffset
      // and start using tileRollingOffset
      // LET'S TRY A MUTATED OFFSET ^^^^ first and see if it works
      console.log('🚀 ~ returnnewPromise ~ virtualScapeMap:', virtualScapeMap)

      let tileRollingOffset = 0
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
        const COUNT_OFFSET = tileRollingOffset + TILE_DATA_OFFSET
        let tileType = 0
        tileType = dataView.getInt32(COUNT_OFFSET, true)
        tile.type = tileType

        const TILE_VERSION_OFFSET = 4
        tile.version = dataView.getFloat64(
          COUNT_OFFSET + TILE_VERSION_OFFSET,
          true
        )
        const TILE_ROTATION_OFFSET = TILE_VERSION_OFFSET + 8
        tile.rotation = dataView.getInt32(
          COUNT_OFFSET + TILE_ROTATION_OFFSET,
          true
        )
        const TILE_POS_X_OFFSET = TILE_ROTATION_OFFSET + 4
        tile.posX = dataView.getInt32(COUNT_OFFSET + TILE_POS_X_OFFSET, true)
        const TILE_POS_Y_OFFSET = TILE_POS_X_OFFSET + 4
        tile.posY = dataView.getInt32(COUNT_OFFSET + TILE_POS_Y_OFFSET, true)
        const TILE_POS_Z_OFFSET = TILE_POS_Y_OFFSET + 4
        tile.posZ = dataView.getInt32(COUNT_OFFSET + TILE_POS_Z_OFFSET, true)
        const TILE_GLYPH_LETTER_OFFSET = TILE_POS_Z_OFFSET + 4
        const intForGlyphLetter = dataView.getUint8(
          COUNT_OFFSET + TILE_GLYPH_LETTER_OFFSET
        )
        // tile.glyphLetterCode = intForGlyphLetter
        const glyphLetter = String.fromCharCode(intForGlyphLetter)
        tile.glyphLetter = glyphLetter
        const TILE_GLYPH_NAME_OFFSET = TILE_GLYPH_LETTER_OFFSET + 1
        const { value: glyphName, offset: TILE_START_NAME_OFFSET } =
          readCString(
            dataView,
            // this is the last time we feed in count_offset because readCString returns newOffset
            COUNT_OFFSET + TILE_GLYPH_NAME_OFFSET,
            'TILE_GLYPH_NAME'
          )
        tile.glyphName = glyphName
        const { value: startName, offset: TILE_COLORF_OFFSET } = readCString(
          dataView,
          TILE_START_NAME_OFFSET,
          'TILE_START_NAME'
        )
        tile.startName = startName
        tile.colorf = dataView.getInt32(TILE_COLORF_OFFSET, true)

        tileRollingOffset = TILE_COLORF_OFFSET + 4 - TILE_DATA_OFFSET
        // const terrain = getTerrain(tile.type)
        virtualScapeMap.tiles.push(tile)
      }
      tileRollingOffset = 0
      virtualScapeMap.tiles.sort((a, b) => {
        return a.posZ - b.posZ
      })
      resolve(virtualScapeMap)
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    reader.readAsArrayBuffer(file)
  })
}

function readCString(
  dataView: DataView,
  offset: number,
  tag: string
): {
  value: string
  offset: number
  tag: string
} {
  const { length, offset: o, tag: t } = readCStringLength(dataView, offset, tag)
  const finalOffset = o + length * 2
  let value = ''
  for (let i = 0; i < length; i++) {
    const charOffset = o + i * 2
    const newChar = String.fromCodePoint(dataView.getInt16(charOffset, true))
    value += newChar
  }
  return { value, offset: finalOffset, tag: t }
}
function readCStringLength(
  dataView: DataView,
  offset: number,
  tag: string
): {
  offset: number
  length: number
  tag: string
} {
  let length = 0
  let newOffset = offset
  const byte = dataView.getUint8(offset)
  newOffset += 1

  if (byte !== 0xff) {
    length = byte
  } else {
    const short = dataView.getUint16(offset, false)
    newOffset += 2

    if (short === 0xfffe) {
      return readCStringLength(dataView, newOffset, tag)
    } else if (short === 0xffff) {
      length = dataView.getUint32(newOffset, true)
      // throw new Error(
      //   `DOES THIS EVER ACTUALLY HAPPEN? This branch exists in the HexScape code. This function worked fine, but the whole time I was developing it, this code block was incrementing offset instead of newOffset (offset += 4, should be newOffset += 4)`
      // )
      // offset += 4
      newOffset += 4
    } else {
      length = short
    }
  }

  return { length, offset: newOffset, tag }
}

///////
////////
///////
////////
///////
////////
///////
////////
///////
////////

function readCString2(
  dataView: DataView,
  offset: number,
  tag: string
): {
  value: string
  offset: number
  tag: string
} {
  const { length, offset: o, tag: t } = readCStringLength(dataView, offset, tag)
  const finalOffset = o + length * 2
  let value = ''
  for (let i = 0; i < length; i++) {
    const charOffset = o + i * 2
    const newChar = String.fromCodePoint(dataView.getInt16(charOffset, true))
    value += newChar
  }
  return { value, offset: finalOffset, tag: t }
}
function readCStringLength2(
  dataView: DataView,
  offset: number,
  tag: string
): {
  offset: number
  length: number
  tag: string
} {
  let length = 0
  let newOffset = offset
  const byte = dataView.getUint8(offset)
  newOffset += 1

  if (byte !== 0xff) {
    length = byte
  } else {
    const short = dataView.getUint16(offset, false)
    newOffset += 2

    if (short === 0xfffe) {
      return readCStringLength(dataView, newOffset, tag)
    } else if (short === 0xffff) {
      length = dataView.getUint32(newOffset, true)
      // throw new Error(
      //   `DOES THIS EVER ACTUALLY HAPPEN? This branch exists in the HexScape code. This function worked fine, but the whole time I was developing it, this code block was incrementing offset instead of newOffset (offset += 4, should be newOffset += 4)`
      // )
      // offset += 4
      newOffset += 4
    } else {
      length = short
    }
  }

  return { length, offset: newOffset, tag }
}
