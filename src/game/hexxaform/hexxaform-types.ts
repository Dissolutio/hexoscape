import { BoardHexes, HexMap } from "../types";

export type GType = {
  hexMap: HexMap;
  boardHexes: BoardHexes;
};

export enum PenMode {
  none = 'none',
  eraser = 'void',
  eraserStartZone = 'eraserStartZone',
  water = 'water',
  grass = 'grass',
  sand = 'sand',
  rock = 'rock',
  incAltitude = 'incAltitude',
  decAltitude = 'decAltitude',
  startZone0 = 'startZone0',
  startZone1 = 'startZone1',
  startZone2 = 'startZone2',
  startZone3 = 'startZone3',
  startZone4 = 'startZone4',
  startZone5 = 'startZone5',
}