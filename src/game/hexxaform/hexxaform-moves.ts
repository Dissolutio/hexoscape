import { BoardHexes, HexMap, HexTerrain } from "../types";
import { generateTimestampID } from "../constants";

const voidHex = ({ G, ctx }, { hexID }: { hexID: string }) => {
  G.boardHexes[hexID].terrain = HexTerrain.void;
  G.boardHexes[hexID].startzonePlayerIDs = [];
  G.boardHexes[hexID].altitude = 0;
};
const unVoidHex = ({ G, ctx }, { hexID }: { hexID: string }) => {
  G.boardHexes[hexID].terrain = HexTerrain.grass;
  G.boardHexes[hexID].altitude = 1;
};
const paintStartZone = (
  { G, ctx },
  { hexID, playerID }: { hexID: string; playerID: string }
) => {
  const currentStartZonePlayerIDs = G.boardHexes[hexID].startzonePlayerIDs;
  if (!currentStartZonePlayerIDs.includes(playerID) && Boolean(playerID)) {
    G.boardHexes[hexID].startzonePlayerIDs.push(playerID);
  }
};
const voidStartZone = ({ G }, { hexID }: { hexID: string }) => {
  G.boardHexes[hexID].startzonePlayerIDs = [];
};
const incAltitudeOfHex = ({ G }, { hexID }: { hexID: string }) => {
  G.boardHexes[hexID].altitude += 1;
};
const decAltitudeOfHex = ({ G }, { hexID }: { hexID: string }) => {
  G.boardHexes[hexID].altitude -= 1;
};
const paintWaterHex = (
  { G },
  { hexID }: { hexID: string }
) => {
  // before re-assigning terrain, assign the old terrain as the sub-terrain
  G.boardHexes[hexID].subTerrain = G.boardHexes[hexID].terrain;
  G.boardHexes[hexID].terrain = HexTerrain.water;
};
const paintGrassHex = (
  { G },
  { hexID, thickness }: { hexID: string; thickness: number }
) => {
  G.boardHexes[hexID].terrain = HexTerrain.grass;
  G.boardHexes[hexID].altitude += thickness;
};
const paintSandHex = (
  { G },
  { hexID, thickness }: { hexID: string; thickness: number }
) => {
  G.boardHexes[hexID].terrain = HexTerrain.sand;
  G.boardHexes[hexID].altitude += thickness;
};
const paintRockHex = (
  { G },
  { hexID, thickness }: { hexID: string; thickness: number }
) => {
  G.boardHexes[hexID].terrain = HexTerrain.rock;
  G.boardHexes[hexID].altitude += thickness;
};
const loadMap = (
  { G },
  {
    boardHexes,
    hexMap,
  }: {
    boardHexes: BoardHexes;
    hexMap: HexMap;
  }
) => {
  if (!hexMap.mapId) {
    hexMap.mapId = generateTimestampID();
  }
  G.boardHexes = boardHexes;
  G.hexMap = hexMap;
};

export const moves = {
  voidHex,
  unVoidHex,
  paintStartZone,
  voidStartZone,
  incAltitudeOfHex,
  decAltitudeOfHex,
  paintWaterHex,
  paintGrassHex,
  paintSandHex,
  paintRockHex,
  loadMap,
};
