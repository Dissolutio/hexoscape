import * as React from 'react'
import { BoardProps } from 'boardgame.io/react'
import { useBgioClientInfo } from './useBgioClientInfo'
import { phaseNames, stageNames } from '../game/constants'

type BgioCtxProviderProps = {
  children: React.ReactNode
  ctx: BoardProps['ctx']
  isLocalOrDemoGame: boolean
}

// add two handy properties
type BgioCtxValue = BoardProps['ctx'] & {
  isMyTurn: boolean
  isWaitingForPlayersToJoin: boolean
  isOrderMarkerPhase: boolean
  isDraftPhase: boolean
  isPlacementPhase: boolean
  isTheDropStage: boolean
  isIdleTheDropStage: boolean
  isRoundOfPlayPhase: boolean
  isIdleStage: boolean
  isMovementStage: boolean
  isWaitingForDisengagementSwipeStage: boolean
  isDisengagementSwipeStage: boolean
  isWaterCloneStage: boolean
  isPlacingAttackSpiritStage: boolean
  isIdlePlacingAttackSpiritStage: boolean
  isPlacingArmorSpiritStage: boolean
  isIdlePlacingArmorSpiritStage: boolean
  isAttackingStage: boolean
  isFireLineSAStage: boolean
  isExplosionSAStage: boolean
  isGrenadeSAStage: boolean
  isChompStage: boolean
  isBerserkerStage: boolean
  isMindShackleStage: boolean
  isGameover: boolean
}
const BgioCtxContext = React.createContext<BgioCtxValue | undefined>(undefined)

export function BgioCtxProvider({
  ctx,
  isLocalOrDemoGame,
  children,
}: BgioCtxProviderProps) {
  const { playerID, isAllPlayerSlotsFilled } = useBgioClientInfo()
  const isMyTurn: boolean = ctx.currentPlayer === playerID
  const isDraftPhase: boolean = ctx.phase === phaseNames.draft
  const isPlacementPhase: boolean = ctx.phase === phaseNames.placement
  const isTheDropStage: boolean =
    ctx.activePlayers?.[playerID] === stageNames.theDrop
  const isIdleTheDropStage: boolean =
    ctx.activePlayers?.[playerID] === stageNames.idleTheDrop
  const isOrderMarkerPhase: boolean = ctx.phase === phaseNames.placeOrderMarkers
  const isRoundOfPlayPhase: boolean = ctx.phase === phaseNames.roundOfPlay
  const isIdleStage: boolean =
    isRoundOfPlayPhase && ctx.activePlayers?.[playerID] === undefined
  const isMovementStage: boolean =
    ctx.activePlayers?.[playerID] === stageNames.movement
  const isAttackingStage: boolean =
    isRoundOfPlayPhase && ctx.activePlayers?.[playerID] === stageNames.attacking
  const isWaterCloneStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.waterClone
  const isPlacingAttackSpiritStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.placingAttackSpirit
  const isIdlePlacingAttackSpiritStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.idlePlacingAttackSpirit
  const isPlacingArmorSpiritStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.placingArmorSpirit
  const isIdlePlacingArmorSpiritStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.idlePlacingArmorSpirit
  const isWaitingForDisengagementSwipeStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.waitingForDisengageSwipe
  const isDisengagementSwipeStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.disengagementSwipe
  const isFireLineSAStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.fireLineSA
  const isExplosionSAStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.explosionSA
  const isGrenadeSAStage: boolean =
    isRoundOfPlayPhase && ctx.activePlayers?.[playerID] === stageNames.grenadeSA
  const isChompStage: boolean =
    isRoundOfPlayPhase && ctx.activePlayers?.[playerID] === stageNames.chomp
  const isBerserkerStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.berserkerCharge
  const isMindShackleStage: boolean =
    isRoundOfPlayPhase &&
    ctx.activePlayers?.[playerID] === stageNames.mindShackle
  const isGameover: boolean = Boolean(ctx.gameover)
  const isWaitingForPlayersToJoin: boolean = isLocalOrDemoGame
    ? false
    : !isAllPlayerSlotsFilled
  return (
    <BgioCtxContext.Provider
      value={{
        ...ctx,
        isWaitingForPlayersToJoin,
        isMyTurn,
        isOrderMarkerPhase,
        isDraftPhase,
        isPlacementPhase,
        isTheDropStage,
        isIdleTheDropStage,
        isRoundOfPlayPhase,
        isIdleStage,
        isMovementStage,
        isWaitingForDisengagementSwipeStage,
        isDisengagementSwipeStage,
        isWaterCloneStage,
        isPlacingAttackSpiritStage,
        isIdlePlacingAttackSpiritStage,
        isPlacingArmorSpiritStage,
        isIdlePlacingArmorSpiritStage,
        isAttackingStage,
        isFireLineSAStage,
        isExplosionSAStage,
        isGrenadeSAStage,
        isChompStage,
        isBerserkerStage,
        isMindShackleStage,
        isGameover,
      }}
    >
      {children}
    </BgioCtxContext.Provider>
  )
}

export function useBgioCtx() {
  const context = React.useContext(BgioCtxContext)
  if (context === undefined) {
    throw new Error('useBgioCtx must be used within a BgioCtxProvider')
  }
  return context
}
