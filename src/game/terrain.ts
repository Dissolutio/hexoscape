import { Dictionary } from "lodash"

type Terrain = {
  flatPieceSizes: number[]
}

export const terrain: Dictionary<Terrain> = {
  grass: {flatPieceSizes: [1, 2, 3, 7, 24]},
  rock: {flatPieceSizes: [1, 2, 3, 7, 24]},
  sand: {flatPieceSizes: [1, 2, 3, 7, 24]},
  dungeon: {flatPieceSizes: [1, 2, 3, 7, 24]},
  swamp: {flatPieceSizes: [1, 2, 3, 7, 24]},
  lavaField: {flatPieceSizes: [1, 2, 7]},
  concrete: {flatPieceSizes: [1, 2, 7]},
  asphalt: {flatPieceSizes: [1, 2, 7]},
  snow: {flatPieceSizes: [1, 2]},
  road: {flatPieceSizes: [1, 2]},
  swampWater: {flatPieceSizes: [1]},
  lava: {flatPieceSizes: [1]},
  ice: {flatPieceSizes: [1]},
  shadow: {flatPieceSizes: [1]},
  /* 
  Ruin 2
  Ruin 3
  
  Forest Tree Style-1,2,3
  Forest Tree 4-hex
  
  Jungle Brush 1
  Jungle Palm Style-1,2,3

  Glacier 1,3,4,6
  Dungeon Outcrop 1,3
  
  Marvel Ruin 6
  Marvel Wall 6
  
  Marro Hive 6

  HEX ADDONS::
  Road Wall 4
  Flag
  Battlements
  Ladder

  OVERHANGS::
  Ground Castle 7,9
  Castle Archway 3
  Ladders
  Road/Bridge 5

  */
}
