import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { MapHex3D } from '../../shared/MapHex3D'
import { BoardHex, BoardHexes } from '../../game/types'
import { useBgioClientInfo, useBgioCtx, useBgioG } from '../../bgio-contexts'
import { usePlacementContext, usePlayContext } from '../contexts'
import { useSpecialAttackContext } from '../contexts/special-attack-context'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { GameUnit3D } from './GameUnit3D'
import { useZoomToMapCenterOnMapRender } from '../../hooks/useZoomToMapCenterOnMapRender'
import { useUIContext } from '../../hooks/ui-context'

export function HexopolisMapDisplay3D({
  cameraControlsRef,
  boardHexes,
}: {
  cameraControlsRef: React.MutableRefObject<CameraControls>
  boardHexes: BoardHexes
}) {
  useZoomToMapCenterOnMapRender({
    cameraControlsRef,
    boardHexes,
    mapID: 'hexopolis', // currently, hexopolis does not switch maps, thus mapID does not need to trigger re-zoom to middle
  })

  return (
    <>
      {Object.values(boardHexes).map((bh: any) => {
        return (
          <HexopolisHex3D
            cameraControlsRef={cameraControlsRef}
            key={`${bh.id}-${bh.altitude}`}
            boardHexID={bh.id}
          />
        )
      })}
    </>
  )
}

/**
 * React component that renders a single 3D hex in the Hexopolis game world.
 *
 * Given a `boardHexID` prop, renders a `MapHex3D` component with the
 * corresponding hex's 3D coordinates, and a `GameUnit3D` component if the hex
 * is occupied by a unit that is visible to the current player.
 *
 * The component also handles clicks on the hex, and is responsible for
 * selecting special attacks and units during various stages of the game.
 *
 * The component takes a `cameraControlsRef` prop, which is a mutable ref to a
 * `react-three-fiber` `CameraControls` component.
 *
 * Returns a fragment containing a `MapHex3D` component and a `GameUnit3D`
 * component if the hex is occupied by a visible unit.
 */
const HexopolisHex3D = ({
  boardHexID,
  cameraControlsRef,
}: {
  boardHexID: string
  cameraControlsRef: React.MutableRefObject<CameraControls>
}) => {
  const { playerID } = useBgioClientInfo()
  const { boardHexes, gameUnits, hexMap } = useBgioG()
  const boardHex = boardHexes[boardHexID]
  const { selectedUnitID } = useUIContext()
  const {
    isPlacementPhase,
    isTheDropStage,
    isRoundOfPlayPhase,
    isChompStage,
    isMindShackleStage,
    isFireLineSAStage,
    isExplosionSAStage,
    isGrenadeSAStage,
  } = useBgioCtx()
  const { onClickPlacementHex, editingBoardHexes } = usePlacementContext()
  const { onClickTurnHex, currentTurnGameCardID, selectedUnitMoveRange } =
    usePlayContext()
  const {
    selectSpecialAttack,
    fireLineTargetableHexIDs,
    explosionTargetableHexIDs,
    chompableHexIDs,
    mindShackleTargetableHexIDs,
  } = useSpecialAttackContext()

  /**
   * Handles clicks on a hex in the 3D map.
   *
   * Depending on the current game state, the click may:
   * - Select a unit for placement in the placement phase.
   * - Select a unit for movement in the round of play phase.
   * - Select a target for a special attack in the round of play phase.
   * - Deselect a previously selected unit or attack in the round of play phase.
   *
   * @param event The three.js event for the click.
   * @param sourceHex The hex that was clicked.
   */
  const onClick = (event: ThreeEvent<MouseEvent>, sourceHex: BoardHex) => {
    // if (isDraftPhase) {
    // TODO: Select Units: should be able to click around units on map as ppl draft them
    // onClickPlacementHex?.(event, sourceHex)
    // }
    if (isPlacementPhase) {
      onClickPlacementHex?.(event, sourceHex)
    }
    // ROP
    if (isTheDropStage) {
      onClickTurnHex?.(event, sourceHex)
    }

    if (isFireLineSAStage) {
      if (fireLineTargetableHexIDs.includes(sourceHex.id)) {
        selectSpecialAttack(sourceHex.id)
      }
    } else if (isMindShackleStage) {
      if (mindShackleTargetableHexIDs.includes(sourceHex.id)) {
        selectSpecialAttack(sourceHex.id)
      }
    } else if (isChompStage) {
      if (chompableHexIDs.includes(sourceHex.id)) {
        selectSpecialAttack(sourceHex.id)
      }
    } else if (isExplosionSAStage) {
      if (explosionTargetableHexIDs.includes(sourceHex.id)) {
        selectSpecialAttack(sourceHex.id)
      }
    } else if (isRoundOfPlayPhase) {
      if (
        // this is a weird splitting off to select a grenade hex, part of hacky GrenadeSA implementation
        isGrenadeSAStage &&
        explosionTargetableHexIDs.includes(sourceHex.id)
      ) {
        selectSpecialAttack(sourceHex.id)
      } else {
        // if we clicked a grenade unit, we need to deselect the attack (if any) of the previously selected grenade unit, but still let the onClick pass thru to select the new unit
        if (
          isGrenadeSAStage &&
          sourceHex.occupyingUnitID !== selectedUnitID &&
          gameUnits[sourceHex.occupyingUnitID]?.gameCardID ===
            currentTurnGameCardID
        ) {
          selectSpecialAttack('')
        }
        onClickTurnHex?.(event, sourceHex)
      }
    }
  }

  // computed
  const isUnitTail = isPlacementPhase
    ? editingBoardHexes?.[boardHex.id]?.isUnitTail
    : boardHex.isUnitTail
  const editingBoardHexUnitID = isUnitTail
    ? ''
    : (editingBoardHexes?.[boardHex.id]?.occupyingUnitID ?? '')
  const unitIdToShowOnHex =
    // order matters here
    isTheDropStage
      ? //The Drop: uses the same editing state as placement phase, and player needs to see their Dropped units
        boardHex.occupyingUnitID || editingBoardHexUnitID
      : isPlacementPhase
        ? // in placement phase, we only show each player their editing state
          editingBoardHexUnitID
        : isUnitTail
          ? ''
          : boardHex.occupyingUnitID
  const gameUnit = gameUnits?.[unitIdToShowOnHex]

  // we only show players their own units during placement phase
  const isShowableUnit = !isPlacementPhase || gameUnit?.playerID === playerID

  // computed
  // we only show players their own units during placement phase

  // const isUnitAHeroOrMultiLife =
  //   gameUnitCard?.type.includes('hero') || (gameUnitCard?.life ?? 0) > 1
  // const unitLifePosition: Point = { x: hexSize * -0.6, y: 0 }

  const {
    x: positionX,
    y: positionY,
    z: positionZ,
  } = getBoardHex3DCoords(boardHex)
  return (
    <>
      <MapHex3D
        isEditor={false}
        x={positionX}
        z={positionZ}
        boardHex={boardHex}
        playerID={playerID}
        onClick={onClick}
        glyphs={hexMap.glyphs}
        isPlacementPhase={isPlacementPhase}
        editingBoardHexes={editingBoardHexes}
        selectedUnitID={selectedUnitID}
        selectedUnitMoveRange={selectedUnitMoveRange}
      />
      {gameUnit && isShowableUnit && !isUnitTail ? (
        <GameUnit3D
          cameraControlsRef={cameraControlsRef}
          gameUnit={gameUnit}
          boardHex={boardHex}
          x={positionX}
          z={positionZ}
        />
      ) : (
        <></>
      )}
    </>
  )
}
