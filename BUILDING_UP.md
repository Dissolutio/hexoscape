# BUILDING FROM THE GROUND UP

First, some terms:

- **BoardCoordinate**: refers to a spot on the map defined by a cubic coordinate {q,r,s} as well as an altitude.
  - All BoardCoordinates can only be occupied by one BoardPiece.
- **BoardPiece**: is a physical component that can be added to the map.
  - BoardPieces may occupy zero (i.e. ruins), one, or many BoardCoordinates.
  - Can be several types:
    1. Terrain: Solid
    2. Terrain: Fluid
    3. Hex Obstacle: Trees, Jungle, Glacier, Outcrop, Hive, CastleWall, RoadWall, Battlement, Ruins
- **BoardHex**: refers to the actual space that a figure can land on.
  - The official game rules call these "Spaces"
  - Under development, now that the Map Editor is a greater priority than the game itself.

Solid terrain will "stack". Such that from its bottom to its cap, it will display on instance mesh subterrain.

## Steps for adding a BoardPiece

1. VALIDATE: No tiles will be placed in midair, they must have at least one supporting hex.
2. STACK: Solid terrain placed over solid terrain simply raise the altitude of the BoardHex.
3. OVERHANG: Solid terrain placed over air or fluid terrain, creates a new BoardHex, an overhang.
4. Fluid terrain must be placed on Solid Terrain or ground.

## VIRTUALSCAPE Validation:

Virtualscape verifies a map by:

1. Checking that every tile has something under it. Not a hex, just SOMETHING. A ladder can go on a battlement on the ground.
2. Checking that two tiles do not occupy the same exact GlobalCoordinate.

- Permits fluid tiles on top of fluid tiles.
- No checking to see if ladders, battlements, flags, are being put on anything, or placed legally.
- No checking jungle to see if it's attached to at least 2 other hexes
- No height clearance for anything. Can put a water tile one level over the base of a tree, all good.
- Can put castle walls onto ground without a wall
