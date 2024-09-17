import {
  makeCirdanGarden3PlayerScenario,
  makeDefaultScenario,
  makeForsakenWaters2PlayerScenario,
  makeGiantsTable2PlayerScenario,
  makeMoveRange1HexFlyEngagedScenario,
  makeMoveRange1HexFlyScenario,
  makeMoveRange1HexWalkScenario,
  makeMoveRange2HexFlyEngagedScenario,
  makeMoveRange2HexFlyScenario,
  makeMoveRange2HexWalkScenario,
  makeMoveRangePassThruScenario,
  scenarioNames,
} from './scenarios'

//!! TEST SCENARIO
export const gameSetupInitialGameState = ({
  numPlayers,
  scenarioName,
  withPrePlacedUnits,
}: {
  numPlayers: number
  scenarioName?: string
  withPrePlacedUnits?: boolean
}) => {
  if (scenarioName === scenarioNames.clashingFrontsAtTableOfTheGiants2) {
    return makeGiantsTable2PlayerScenario(numPlayers, withPrePlacedUnits)
  }
  if (scenarioName === scenarioNames.forsakenWaters2) {
    return makeForsakenWaters2PlayerScenario(numPlayers, withPrePlacedUnits)
  }
  if (scenarioName === scenarioNames.cirdanGardenWithoutTrees) {
    return makeCirdanGarden3PlayerScenario(numPlayers, withPrePlacedUnits)
  }
  if (scenarioName === scenarioNames.makeMoveRange1HexWalkScenario) {
    return makeMoveRange1HexWalkScenario(numPlayers, withPrePlacedUnits)
  }
  if (scenarioName === scenarioNames.makeMoveRange1HexFlyEngagedScenario) {
    const withStealth = false
    return makeMoveRange1HexFlyEngagedScenario(
      withStealth,
      numPlayers,
      withPrePlacedUnits
    )
  }
  if (scenarioName === scenarioNames.makeMoveRange2HexFlyEngagedScenario) {
    const withStealth = true
    return makeMoveRange2HexFlyEngagedScenario(
      withStealth,
      numPlayers,
      withPrePlacedUnits
    )
  }
  if (scenarioName === scenarioNames.makeMoveRange2HexWalkScenario) {
    return makeMoveRange2HexWalkScenario(numPlayers, withPrePlacedUnits)
  }
  if (scenarioName === scenarioNames.makeMoveRangePassThruScenario) {
    const withGhostWalk = true
    return makeMoveRangePassThruScenario(
      withGhostWalk,
      numPlayers,
      withPrePlacedUnits
    )
  }
  if (
    scenarioName === scenarioNames.makeMoveRange1HexFlyEngagedStealthScenario
  ) {
    const withStealth = true
    return makeMoveRange1HexFlyEngagedScenario(
      withStealth,
      numPlayers,
      withPrePlacedUnits
    )
  }
  if (scenarioName === scenarioNames.makeMoveRange1HexFlyScenario) {
    return makeMoveRange1HexFlyScenario(numPlayers, withPrePlacedUnits)
  }
  if (scenarioName === scenarioNames.makeMoveRange2HexFlyScenario) {
    return makeMoveRange2HexFlyScenario(numPlayers, withPrePlacedUnits)
  }
  // DEFAULT RETURN BELOW::
  return makeDefaultScenario(numPlayers, withPrePlacedUnits)
}
