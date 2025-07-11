import { moves } from "./hexxaform-moves";
import { hexagonScenario, rectangleScenario } from "./hexxaform-setup";

export const Hexxaform = {
  name: "Hexxaform",
  setup: () => {
    // Setup returns G - the initial bgio game state
    // return hexagonMapScenario;
    // rectangle is vertical on left/right sides, and horizontal along top and bottom
    return rectangleScenario;
    // return hexagonScenario;
    // rectangle is tipped such that there is a bottom left of the rectangle, and a top-right
    // return orientedRectangleScenario;
  },
  moves,
  events: {
    endGame: false,
  },
};
