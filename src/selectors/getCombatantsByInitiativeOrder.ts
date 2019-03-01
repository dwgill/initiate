import createSelector from "selectorator";
import { ReduxState, Combatant } from "../types";
import getInitiativeOrder from "./getInitiativeOrder";
import getCombatants from "./getCombatants";
import map from "lodash/fp/map";

const getCombatantsByInitiativeOrder = createSelector<ReduxState, Combatant[]>(
  [getCombatants, getInitiativeOrder],
  (combatants, combatantIds: string[]) => map((id: string) => combatants[id])(combatantIds)
);

export default getCombatantsByInitiativeOrder;
