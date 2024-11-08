import { Dictionary } from 'lodash'
export default function getTileColor(terrain: string): string {
  return virtualscapeTileColors?.[terrain] ?? ''
}
const virtualscapeTileColors: Dictionary<string> = {
  glyph: 'rgb(64,0,0)',
  water: 'rgb(55, 148, 253)',
  grass: 'rgb(0,160,0)',
  rock: 'rgb(170, 170, 170)',
  sand: 'rgb(206,172,40)',
  ruin: 'rgb(160, 0, 0)',
  road: 'rgb(160, 160, 160)',
  lava: 'rgb(255,64,64)',
  lavaField: 'rgb(160,32,32)',
  asphalt: 'rgb(120, 120, 120)',
  roadWall: 'rgb(120, 120, 120)',
  concrete: 'rgb(220, 220, 220)',
  marvelWall: 'rgb(220, 220, 220)',
  dungeon: 'rgb(220, 220, 220)',
  shadow: 'rgb(0, 0, 0)',
  outcrop: 'rgb(180,180,180)',
  castleGround: 'rgb(190,190,190)',
  castle: 'rgb(220, 220, 220)',
  castleSecondary: 'rgb(50, 50, 50)', // Castle tiles in virtualscape have a second color for some reason
  battlement: 'rgb(80, 80, 80)',
  flag: 'rgb(0,100,0)',
  palm: 'rgb(120,255,120)',
  brush: 'rgb(255,255,0)',
  tree: 'rgb(0,85,0)',
  ladder: 'rgb(255,20,00)',
  snow: 'rgb(255, 255, 255)',
  glacier: 'rgb(180,180,255)',
  ice: 'rgb(180,180,255)',
  swamp: 'rgb(111,105,21)',
  swampWater: 'rgb(222,210,42)',
  hive: 'rgb(193,121,65)',
  figure: 'rgb(255, 255, 255)',
  personal: 'rgb(160, 160, 160)',
}
