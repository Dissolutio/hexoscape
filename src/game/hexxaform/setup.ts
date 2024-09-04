import { nanoid } from "nanoid";
import { BoardHexes } from "../types";
import { generateHexagon, generateRectangle } from "../setup/hex-gen";
import { GType } from "./types";
// import { BoardHexes, GType, MapShapes } from "./types";
type RectangleScenarioOptions = {
  mapWidth?: number;
  mapLength?: number;
};
export const rectangleScenario = makeRectangleScenario({
  mapLength: 26,
  mapWidth: 15,
});
export function makeRectangleScenario(
  options?: RectangleScenarioOptions
): GType {
  const mapHeight = options?.mapLength ?? 1;
  const mapWidth = options?.mapWidth ?? 1;
  const hexMap = {
    mapId: nanoid(),
    mapName: '',
    mapShape: 'rectangle',
    flat: false,
    mapSize: Math.max(mapHeight, mapWidth),
    mapHeight,
    mapWidth,
    hexSize: 10,
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
  mapSize: 5,
});
export function makeHexagonScenario(
  options?: HexagonScenarioOptions
): GType {
  const mapSize = options?.mapSize ?? 3;
  const hexMap = {
    mapId: nanoid(),
    mapName: '',
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
