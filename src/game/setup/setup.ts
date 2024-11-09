import {
  makeCirdanGarden3PlayerScenario,
  makeForsakenWaters2PlayerScenario,
  makeGiantsTable2PlayerScenario,
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
  // DEFAULT RETURN BELOW::
  return makeGiantsTable2PlayerScenario(numPlayers, withPrePlacedUnits)
}
