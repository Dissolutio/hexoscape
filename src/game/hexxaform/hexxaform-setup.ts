import { BoardHexes } from "../types";
import { generateHexagon, generateRectangle } from "../setup/hex-gen";
import { GType } from "./hexxaform-types";
// import { BoardHexes, GType, MapShapes } from "./types";
type RectangleScenarioOptions = {
  mapWidth?: number;
  mapLength?: number;
};
export const rectangleScenario = makeRectangleScenario({
  mapLength: 3,
  mapWidth: 3,
});
export function makeRectangleScenario(
  options?: RectangleScenarioOptions
): GType {
  const mapHeight = options?.mapLength ?? 1;
  const mapWidth = options?.mapWidth ?? 1;
  const hexMap = {
    mapId: new Date().getTime().toString(),
    mapName: 'default rectangle map',
    mapShape: 'rectangle',
    mapSize: Math.max(mapHeight, mapWidth),
    glyphs: {},
  };
  
  const boardHexes: BoardHexes = generateRectangle(mapHeight, mapWidth);
  return {
    boardHexes,
    hexMap,
  };
}
type HexagonScenarioOptions = {
  mapSize?: number;
};
export const hexagonScenario = makeHexagonScenario({
  mapSize: 9,
});
export function makeHexagonScenario(
  options?: HexagonScenarioOptions
): GType {
  const mapSize = options?.mapSize ?? 3;
  const hexMap = {
    mapId: new Date().getTime().toString(),
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
