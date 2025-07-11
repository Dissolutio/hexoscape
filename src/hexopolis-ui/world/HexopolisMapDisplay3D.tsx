import { useRef } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { MapHex3D } from '../../shared/MapHex3D'
import { BoardHex, BoardHexes, HexTerrain } from '../../game/types'
import { useBgioClientInfo, useBgioCtx, useBgioG } from '../../bgio-contexts'
import { usePlacementContext, usePlayContext } from '../contexts'
import { useSpecialAttackContext } from '../contexts/special-attack-context'
import { GameUnit3D } from './GameUnit3D'
import { useUIContext } from '../../hooks/ui-context'
import { isFluidTerrainHex } from '../../game/constants'
import InstanceSubTerrainWrapper from '../../shared/world/InstanceSubTerrain'
import InstanceCapWrapper from '../../shared/world/InstanceCapWrapper'
import InstanceSolidHexCap from '../../shared/world/InstanceSolidHexCap'
import InstanceFluidHexCap from '../../shared/world/InstanceFluidHexCap'
import { useZoomCameraToMapCenter } from '../../hooks/useZoomCameraToMapCenter'

export function HexopolisMapDisplay3D({
  cameraControlsRef,
  boardHexes,
}: {
  cameraControlsRef: React.MutableRefObject<CameraControls>
  boardHexes: BoardHexes
}) {
  useZoomCameraToMapCenter({
    cameraControlsRef,
    boardHexes,
    mapID: 'hexopolis', // currently, hexopolis does not switch maps, thus map.id does not need to trigger re-zoom to middle
  })
  const hoverID = useRef('')
  const { gameUnits } = useBgioG()
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
  const { onClickPlacementHex } = usePlacementContext()
  const { onClickTurnHex, currentTurnGameCardID } = usePlayContext()

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
   * @param boardHex The hex that was clicked.
   */
  const onClick = (event: ThreeEvent<MouseEvent>, boardHex: BoardHex) => {
    event.stopPropagation()
    // if (isDraftPhase) {
    // TODO: Select Units: should be able to click around units on map as ppl draft them
    // onClickPlacementHex?.(event, sourceHex)
    // }
    if (isPlacementPhase) {
      onClickPlacementHex?.(event, boardHex)
    }
    // ROP
    if (isTheDropStage) {
      onClickTurnHex?.(event, boardHex)
    }

    if (isFireLineSAStage) {
      if (fireLineTargetableHexIDs.includes(boardHex.id)) {
        selectSpecialAttack(boardHex.id)
      }
    } else if (isMindShackleStage) {
      if (mindShackleTargetableHexIDs.includes(boardHex.id)) {
        selectSpecialAttack(boardHex.id)
      }
    } else if (isChompStage) {
      if (chompableHexIDs.includes(boardHex.id)) {
        selectSpecialAttack(boardHex.id)
      }
    } else if (isExplosionSAStage) {
      if (explosionTargetableHexIDs.includes(boardHex.id)) {
        selectSpecialAttack(boardHex.id)
      }
    } else if (isRoundOfPlayPhase) {
      if (
        // this is a weird splitting off to select a grenade hex, part of hacky GrenadeSA implementation
        isGrenadeSAStage &&
        explosionTargetableHexIDs.includes(boardHex.id)
      ) {
        selectSpecialAttack(boardHex.id)
      } else {
        // if we clicked a grenade unit, we need to deselect the attack (if any) of the previously selected grenade unit, but still let the onClick pass thru to select the new unit
        if (
          isGrenadeSAStage &&
          boardHex.occupyingUnitID !== selectedUnitID &&
          gameUnits[boardHex.occupyingUnitID]?.gameCardID ===
          currentTurnGameCardID
        ) {
          selectSpecialAttack('')
        }
        onClickTurnHex?.(event, boardHex)
      }
    }
  }

  const fluidHexCaps = Object.values(boardHexes).filter((bh) => {
    return bh.terrain !== HexTerrain.empty && isFluidTerrainHex(bh.terrain)
  })
  const solidHexCaps = Object.values(boardHexes).filter((bh) => {
    return bh.terrain !== HexTerrain.empty && !isFluidTerrainHex(bh.terrain)
  })
  const onPointerEnter = (_e: ThreeEvent<PointerEvent>, hex: BoardHex) => {
    hoverID.current = hex.id
  }
  const onPointerOut = (_e: ThreeEvent<PointerEvent>) => {
    hoverID.current = ''
  }

  const onPointerDown = (e: ThreeEvent<PointerEvent>, hex: BoardHex) => {
    if (e.button === 2) return // ignore right clicks
    e.stopPropagation();
    onClick(e, hex)
  }
  return (
    <>
      <InstanceCapWrapper
        capHexesArray={fluidHexCaps}
        glKey={'InstanceFluidHexCap-'}
        component={InstanceFluidHexCap}
        onPointerEnter={onPointerEnter}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
      />

      <InstanceCapWrapper
        capHexesArray={solidHexCaps}
        glKey={'InstanceSolidHexCap-'}
        component={InstanceSolidHexCap}
        onPointerEnter={onPointerEnter}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
      />

      <InstanceSubTerrainWrapper glKey={'InstanceSubTerrain-'} boardHexes={Object.values(boardHexes).filter(bh => !(bh.terrain === HexTerrain.empty))} />

      {Object.values(boardHexes).map((bh: any) => {
        return (
          <HexopolisHex3D
            key={`${bh.id}-${bh.altitude}`}
            cameraControlsRef={cameraControlsRef}
            boardHexID={bh.id}
          />
        )
      })}
    </>
  )
}
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
  const { isPlacementPhase, isTheDropStage } = useBgioCtx()
  const { editingBoardHexes } = usePlacementContext()
  const { selectedUnitMoveRange } = usePlayContext()

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

  return (
    <>
      <MapHex3D
        isEditor={false}
        boardHex={boardHex}
        playerID={playerID}
        glyphs={hexMap.glyphs}
        selectedUnitMoveRange={selectedUnitMoveRange}
      />
      {gameUnit && isShowableUnit && !isUnitTail ? (
        <GameUnit3D
          cameraControlsRef={cameraControlsRef}
          gameUnit={gameUnit}
          boardHex={boardHex}
        />
      ) : (
        <></>
      )}
    </>
  )
}
