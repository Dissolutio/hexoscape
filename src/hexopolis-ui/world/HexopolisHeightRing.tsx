import { Vector3, BufferGeometry, Color } from 'three'
import { usePlacementContext, usePlayContext, useUIContext } from '../contexts'
import { useBgioCtx, useBgioG } from '../../bgio-contexts'
import { useSpecialAttackContext } from '../contexts/special-attack-context'
import { playerColors } from '../theme'
import { selectAttackerHasAttacksAllowed } from '../../game/selectors'

export const HexopolisHeightRing = ({
  points,
  height,
  top,
  position,
  boardHexID,
  playerID,
  isHighlighted,
  isInSafeMoveRange,
  isInEngageMoveRange,
  isInDisengageMoveRange,
}: {
  points: Vector3[]
  height: number
  top: number
  position: Vector3
  boardHexID: string
  playerID: string
  isHighlighted: boolean
  isInSafeMoveRange: boolean
  isInEngageMoveRange: boolean
  isInDisengageMoveRange: boolean
}) => {
  const {
    boardHexes,
    gameArmyCards,
    startZones,
    gameUnits,
    unitsMoved,
    unitsAttacked,
  } = useBgioG()
  const {
    isMyTurn,
    isDraftPhase,
    isPlacementPhase,
    isTheDropStage,
    isIdleTheDropStage,
    isRoundOfPlayPhase,
    isMovementStage,
    isWaterCloneStage,
    isMindShackleStage,
    isChompStage,
    isAttackingStage,
    isFireLineSAStage,
    isGrenadeSAStage,
    isExplosionSAStage,
  } = useBgioCtx()
  const lineGeometry = new BufferGeometry().setFromPoints(points)

  const { selectedUnitID } = useUIContext()
  const {
    theDropPlaceableHexIDs,
    revealedGameCardUnits,
    revealedGameCardUnitIDs,
    selectedUnitAttackRange,
    clonerHexIDs,
    clonePlaceableHexIDs,
  } = usePlayContext()
  const {
    editingBoardHexes,
    startZoneForMy2HexUnits,
    activeTailPlacementUnitID,
    tailPlaceables,
  } = usePlacementContext()
  const {
    fireLineTargetableHexIDs,
    fireLineAffectedHexIDs,
    fireLineSelectedHexIDs,
    explosionTargetableHexIDs,
    explosionAffectedUnitIDs,
    explosionSelectedUnitIDs,
    chompableHexIDs,
    chompSelectedHexIDs,
    mindShackleTargetableHexIDs,
    mindShackleSelectedHexIDs,
  } = useSpecialAttackContext()
  const selectedUnit = gameUnits[selectedUnitID]

  const isMyStartZoneHex = Boolean(startZones?.[playerID]?.includes(boardHexID))
  const unitID = boardHexes?.[boardHexID]?.occupyingUnitID ?? ''
  const unitOnHex = gameUnits[unitID]
  const occupyingPlacementUnitId =
    editingBoardHexes?.[boardHexID]?.occupyingUnitID ?? ''
  const isTailPlaceable = tailPlaceables?.includes(boardHexID)
  const activeEnemyUnitIDs = (revealedGameCardUnits ?? []).map((u) => {
    return u.unitID
  })
  const isActiveUnitHex = revealedGameCardUnitIDs.includes(unitID)
  const isOpponentsActiveUnitHex = activeEnemyUnitIDs?.includes(unitID)
  const { isUnitHasNoAttacksLeft, attacksUsedByThisFigure } = unitOnHex?.unitID
    ? selectAttackerHasAttacksAllowed({
        attackingUnit: unitOnHex,
        gameArmyCards,
        unitsAttacked,
        unitsMoved,
      })
    : { isUnitHasNoAttacksLeft: true, attacksUsedByThisFigure: 0 }
  const unitHasAttacksAndMoved =
    !isUnitHasNoAttacksLeft && unitsMoved.includes(unitID)
  const unitHasAttacksAndDidNotMove =
    !isUnitHasNoAttacksLeft && !unitsMoved.includes(unitID)
  const unitHasUsedAllAttacks =
    isUnitHasNoAttacksLeft && attacksUsedByThisFigure > 0
  // FOR LINE STYLES BELOW
  const isNonTopRing = height !== top
  const isPlaceTail = isPlacementPhase && Boolean(activeTailPlacementUnitID)
  const isShowStartZonePlayerColor =
    (isPlacementPhase && !selectedUnitID && !activeTailPlacementUnitID) ||
    isDraftPhase
  const isShowValidPlacements =
    isPlacementPhase && Boolean(selectedUnitID) && !activeTailPlacementUnitID
  const isTheDrop = isTheDropStage || isIdleTheDropStage
  const isFullMoveUnit =
    isRoundOfPlayPhase &&
    isMovementStage &&
    // isNoActiveUnitSelected &&
    isActiveUnitHex &&
    !unitsMoved.includes(unitID)
  const isDepletedMoveUnit =
    isRoundOfPlayPhase &&
    isMovementStage &&
    // isNoActiveUnitSelected &&
    isActiveUnitHex &&
    unitsMoved.includes(unitID)
  const isMoveRangeHex =
    isRoundOfPlayPhase && isMovementStage && isMyTurn && Boolean(selectedUnitID)
  const isHighlightEnemyTurnUnits =
    isRoundOfPlayPhase && !isMyTurn && isOpponentsActiveUnitHex
  const isAttackTargetableUnit =
    isRoundOfPlayPhase &&
    isMyTurn &&
    isAttackingStage &&
    selectedUnitAttackRange?.includes(boardHexID)
  const isUsableAttackMovedUnit =
    isRoundOfPlayPhase &&
    isAttackingStage &&
    isActiveUnitHex &&
    unitHasAttacksAndMoved

  const isUsableAttackUnmovedUnit =
    isRoundOfPlayPhase &&
    isAttackingStage &&
    // isNoActiveUnitSelected &&
    isActiveUnitHex &&
    unitHasAttacksAndDidNotMove
  const isDepletedAttack =
    isRoundOfPlayPhase &&
    isAttackingStage &&
    isActiveUnitHex &&
    unitHasUsedAllAttacks
  const isGrenadeOrExplosionSAStage = isGrenadeSAStage || isExplosionSAStage

  const getUnitStyle = (playerID: string) => ({
    color: new Color(playerColors[playerID]),
    opacity: 0.1,
    lineWidth: 1,
  })
  const whiteStyle = { color: new Color('white'), opacity: 1, lineWidth: 5 }
  const grayStyle = { color: new Color('gray'), opacity: 1, lineWidth: 5 }
  const greenStyle = { color: new Color('#bad954'), opacity: 1, lineWidth: 5 }
  // const yellowStyle = { color: new Color('#eac334'), opacity: 1, lineWidth: 5 }
  const orangeStyle = { color: new Color('#e09628'), opacity: 1, lineWidth: 5 }
  const redStyle = { color: new Color('#e25328'), opacity: 1, lineWidth: 5 }
  const highlightWhiteStyle = { color: 'white', opacity: 1, lineWidth: 2 }
  const nonTopRingGrayStyle = {
    color: new Color('#686868'),
    opacity: 1,
    lineWidth: 1,
  }
  const basicGrayTopRingStyle = {
    color: new Color('#b4b4b4'),
    opacity: 1,
    lineWidth: 1,
  }
  const getLineStyle = () => {
    // all non-top rings are as below:
    if (isNonTopRing) {
      return nonTopRingGrayStyle
    }
    // top ring styles below:
    if (isHighlighted) {
      return highlightWhiteStyle
    }
    // if we've placed a 2-hex unit and now need to place its tail
    if (isPlaceTail) {
      // highlight head hex of currently placing tail
      // if (occupyingPlacementUnitId === activeTailPlacementUnitID) {}
      // highlight empty, placeable hexes
      if (isMyStartZoneHex && !occupyingPlacementUnitId && isTailPlaceable) {
        return greenStyle
      }
    }
    // outline start zones all thru the draft phase, during placement phase only when unit/tail not selected
    if (isShowStartZonePlayerColor) {
      if ((startZones?.['0'] ?? []).includes(boardHexID)) {
        return {
          color: new Color(playerColors['0']),
          opacity: 1,
          lineWidth: 5,
        }
      }
      if ((startZones?.['1'] ?? []).includes(boardHexID)) {
        return {
          color: new Color(playerColors['1']),
          opacity: 1,
          lineWidth: 3,
        }
      }
      if ((startZones?.['2'] ?? []).includes(boardHexID)) {
        return {
          color: new Color(playerColors['2']),
          opacity: 1,
          lineWidth: 3,
        }
      }
      if ((startZones?.['3'] ?? []).includes(boardHexID)) {
        return {
          color: new Color(playerColors['3']),
          opacity: 1,
          lineWidth: 3,
        }
      }
      if ((startZones?.['4'] ?? []).includes(boardHexID)) {
        return {
          color: new Color(playerColors['4']),
          opacity: 1,
          lineWidth: 3,
        }
      }
      if ((startZones?.['5'] ?? []).includes(boardHexID)) {
        return {
          color: new Color(playerColors['5']),
          opacity: 1,
          lineWidth: 3,
        }
      }
    }
    // placement + unit selected: show valid drops
    if (isShowValidPlacements) {
      if (
        !(selectedUnitID === occupyingPlacementUnitId) &&
        isMyStartZoneHex &&
        (selectedUnit.is2Hex
          ? startZoneForMy2HexUnits.includes(boardHexID)
          : true)
      )
        return greenStyle
    }
    // pre-order-marker-phase: the drop:
    if (isTheDrop) {
      if (theDropPlaceableHexIDs.includes(boardHexID)) {
        return greenStyle
      }
    }
    // round of play: highlight my units that have full move points
    // const isNoActiveUnitSelected =
    //   !revealedGameCardUnitIDs.includes(selectedUnitID)

    if (isFullMoveUnit) {
      return whiteStyle
    }

    // round of play: highlight my units that exhausted/used their move points
    if (isDepletedMoveUnit) {
      return unitOnHex.movePoints === 0 ? redStyle : orangeStyle
    }
    // round of play: move range
    if (isMoveRangeHex) {
      if (isInSafeMoveRange) {
        return greenStyle
      }
      if (isInEngageMoveRange) {
        return orangeStyle
      }
      if (isInDisengageMoveRange) {
        return redStyle
      }
    }
    // round of play: not my move, highlight enemy units that are going
    if (isHighlightEnemyTurnUnits) {
      return redStyle
    }
    // round of play: my attack, highlight targetable enemy units
    if (isAttackTargetableUnit) {
      return redStyle
    }

    // round of play: my attack, my units that have attacks and moved

    if (isUsableAttackMovedUnit) {
      return orangeStyle
    }

    // round of play: my attack, my units that have attacks and did NOT move (AKA, these are "free" attacks to be used by any unmoved squadie)

    if (isUsableAttackUnmovedUnit) {
      return whiteStyle
    }
    // round of play: my attack, my units that have used all their attacks

    if (isDepletedAttack) {
      return grayStyle
    }
    //  ROP: water-clone
    if (isWaterCloneStage) {
      if (clonerHexIDs?.includes(boardHexID)) {
        return getUnitStyle(playerID)
      }
      if (clonePlaceableHexIDs?.includes(boardHexID)) {
        return greenStyle
      }
    }
    //  ROP: mind-shackle
    if (isMindShackleStage) {
      if (mindShackleSelectedHexIDs?.includes(boardHexID)) {
        return redStyle
      }
      if (mindShackleTargetableHexIDs?.includes(boardHexID)) {
        return greenStyle
      }
    }
    //  ROP: chomp
    if (isChompStage) {
      if (chompSelectedHexIDs?.includes(boardHexID)) {
        return redStyle
      }
      if (chompableHexIDs?.includes(boardHexID)) {
        return greenStyle
      }
    }
    //  ROP: Fire-Line Special Attack
    if (isFireLineSAStage) {
      // order matters here, check fireLineSelectedHexIDs first, else the below will early return
      if (fireLineSelectedHexIDs?.includes(boardHexID)) {
        return redStyle
      }
      if (fireLineTargetableHexIDs?.includes(boardHexID)) {
        return greenStyle
      }
      if (fireLineAffectedHexIDs?.includes(boardHexID)) {
        return orangeStyle
      }
    }
    //  ROP: Explosion/Grenade Special Attack
    if (isGrenadeOrExplosionSAStage) {
      const isAGrenadingUnitHex = revealedGameCardUnitIDs.includes(unitID)
      const hasUnitAttacked = Object.keys(unitsAttacked).includes(unitID)
      // highlight units that still need to throw a grenade
      if (!selectedUnit && isAGrenadingUnitHex && !hasUnitAttacked) {
        return whiteStyle
      }
      // highlight units that already threw a grenade
      if (!selectedUnit && isAGrenadingUnitHex && hasUnitAttacked) {
        return redStyle
      }
      if (explosionSelectedUnitIDs?.includes(unitID)) {
        return redStyle
      }
      if (explosionAffectedUnitIDs?.includes(unitID)) {
        return orangeStyle
      }
      if (explosionTargetableHexIDs?.includes(boardHexID)) {
        return greenStyle
      }
    }
    // If none of the above, at least highlight units with their player-color:
    if (unitOnHex) {
      return getUnitStyle(unitOnHex.playerID)
    }
    // FINALLY: top rings, if not modified, are gray to highlight the edge between hexes
    return basicGrayTopRingStyle
  }

  const {
    color,
    // opacity,
    lineWidth,
  } = getLineStyle()
  return (
    <line_
      geometry={lineGeometry}
      position={position}
      rotation={[0, Math.PI / 6, 0]}
    >
      <lineBasicMaterial
        attach="material"
        // warning, opacity can be a bit fps expensive
        // transparent
        // opacity={opacity}
        color={color}
        linewidth={lineWidth}
        linecap={'round'}
        linejoin={'round'}
      />
    </line_>
  )
}
