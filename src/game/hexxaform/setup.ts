import { nanoid } from "nanoid";
import { BoardHexes, MapShapes } from "../types";
import { generateRectangleHexas } from "../hex-utils";
import { generateRectangle } from "../setup/hex-gen";
import { GType } from "./types";
// import { BoardHexes, GType, MapShapes } from "./types";
type RectangleScenarioOptions = {
  mapWidth?: number;
  mapLength?: number;
  flat?: boolean;
};
export const rectangleScenario = makeRectangleScenario({
  mapLength: 26,
  mapWidth: 15,
});
export function makeRectangleScenario(
  options?: RectangleScenarioOptions
): GType {
  const mapLength = options?.mapLength ?? 1;
  const mapWidth = options?.mapWidth ?? 1;
  const hexMap = {
    mapId: nanoid(),
    mapShape: MapShapes.rectangle,
    mapSize: Math.max(mapLength, mapWidth),
    mapLength,
    mapWidth,
  };
  
  const boardHexes: BoardHexes = generateRectangle(mapLength, mapWidth);
  return {
    boardHexes,
    hexMap,
  };
}
