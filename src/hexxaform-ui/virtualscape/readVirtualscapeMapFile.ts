import rtfToText from './rtfToText'

const BYTES_PER_FLOAT = 8
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
export default function readVirtualscapeMapFile(file) {
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

      const { value: mapAuthor, offset: PLAYER_NUMBER_OFFSET } = readCString(
        dataView,
        currentOffset,
        'AUTHOR'
      )
      virtualScapeMap.author = mapAuthor
      const { value: playerNumber, offset: SCENARIO_LENGTH_OFFSET } =
        readCString(dataView, PLAYER_NUMBER_OFFSET, 'PLAYER_NUMBER')
      virtualScapeMap.playerNumber = playerNumber
      const scenarioLength = dataView.getInt32(SCENARIO_LENGTH_OFFSET, true)
      const SCENARIO_DATA_OFFSET = SCENARIO_LENGTH_OFFSET + 4
      let scenarioRichText = ''
      for (let i = 0; i < scenarioLength; i++) {
        scenarioRichText += String.fromCharCode(
          dataView.getUint8(SCENARIO_DATA_OFFSET + i)
        )
      }
      virtualScapeMap.scenario = rtfToText(scenarioRichText)
      const LEVEL_PER_PAGE_OFFSET = SCENARIO_DATA_OFFSET + scenarioLength
      const levelPerPage = dataView.getInt32(LEVEL_PER_PAGE_OFFSET, true)
      virtualScapeMap.levelPerPage = levelPerPage
      const PRINTING_TRANSPARENCY_OFFSET = LEVEL_PER_PAGE_OFFSET + 4
      virtualScapeMap.printingTransparency = dataView.getInt32(
        PRINTING_TRANSPARENCY_OFFSET,
        true
      )
      const PRINTING_GRID_OFFSET = PRINTING_TRANSPARENCY_OFFSET + 4
      virtualScapeMap.printingGrid =
        dataView.getInt32(PRINTING_GRID_OFFSET, true) !== 0
      const PRINT_TILE_NUMBER_OFFSET = PRINTING_GRID_OFFSET + 4
      virtualScapeMap.printTileNumber =
        dataView.getInt32(PRINT_TILE_NUMBER_OFFSET, true) !== 0
      const PRINT_START_AREA_AS_LEVEL_OFFSET = PRINT_TILE_NUMBER_OFFSET + 4
      virtualScapeMap.printStartAreaAsLevel =
        dataView.getInt32(PRINT_START_AREA_AS_LEVEL_OFFSET, true) !== 0
      const TILE_NUMBER_OFFSET = PRINT_START_AREA_AS_LEVEL_OFFSET + 4
      virtualScapeMap.tileCount = dataView.getInt32(TILE_NUMBER_OFFSET, true)
      const TILE_DATA_OFFSET = TILE_NUMBER_OFFSET + 4

      virtualScapeMap.tiles = []
      let tileRollingOffset = 0
      for (let i = 0; i < virtualScapeMap.tileCount; i++) {
        const tile = {
          type: 0,
          version: 0,
          rotation: 0,
          posX: 0,
          posY: 0,
          posZ: 0,
          glyphLetterCode: 0,
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
        tile.glyphLetterCode = intForGlyphLetter
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
        // virtualscape start zones: red:255, green:65280, blue:16711680, yellow:65535, violet: 16711935, cyan:16776960, orange:33023, purple:16711808
        // virtualscape glyphs: unknown:14063,
        tileRollingOffset = TILE_COLORF_OFFSET + 4 - TILE_DATA_OFFSET
        virtualScapeMap.tiles.push(tile)
      }
      tileRollingOffset = 0
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
