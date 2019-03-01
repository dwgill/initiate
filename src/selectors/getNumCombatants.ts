import size from "lodash/fp/size";
import createSelector from "selectorator";
import { ReduxState } from "../types";

const getNumCombatants = createSelector<ReduxState, number>(
  ['combatants'],
  combatants => size(combatants)
);

export default getNumCombatants;
