import { BoardHexes } from "../types";
import { generateHexagon, generateRectangle } from "../setup/hex-gen";
import { GType } from "./hexxaform-types";
import { generateTimestampID } from "../constants";

/* 
MAX_DIMENSION this will limit hexes to 576 board hexes, a good limit for now on desktop
*/
const MAX_RECTANGLE_DIMENSION = 24
const MAX_HEXAGON_DIMENSION = 12
type RectangleScenarioOptions = {
  mapWidth?: number;
  mapLength?: number;
};

export const rectangleScenario = makeRectangleScenario({
  mapLength: 12,
  mapWidth: 12,
});
 function makeRectangleScenario(
  options?: RectangleScenarioOptions
): GType {
  const mapHeight = Math.min(options?.mapLength ?? 12, MAX_RECTANGLE_DIMENSION);
  const mapWidth = Math.min(options?.mapWidth ?? 12, MAX_RECTANGLE_DIMENSION);
  const hexMap = {
    mapId: generateTimestampID(),
    mapName: 'default rectangle map',
    mapShape: 'rectangle',
    mapSize: Math.max(mapHeight, mapWidth),
    glyphs: {},
  };
  
  const boardHexes: BoardHexes = generateRectangle(mapHeight, mapWidth);
  // console.log("🚀 ~ boardHexes:", Object.keys(boardHexes).length)
  return {
    boardHexes,
    hexMap,
  };
}
type HexagonScenarioOptions = {
  mapSize?: number;
};
export const hexagonScenario = makeHexagonScenario({
  mapSize: 6,
});
 function makeHexagonScenario(
  options?: HexagonScenarioOptions
): GType {
  const mapSize = Math.min(options?.mapSize ?? 6, MAX_HEXAGON_DIMENSION);
  const hexMap = {
    mapId: generateTimestampID(),
    mapName: 'default hexagon map',
    mapShape: 'hexagon',
    mapSize,
    glyphs: {},
  };
  
  const boardHexes: BoardHexes = generateHexagon(mapSize);
  return {
    boardHexes,
    hexMap,
  };
}
