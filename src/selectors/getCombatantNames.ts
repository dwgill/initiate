import createSelector from "selectorator";
import { Combatant, ReduxState } from "../types";
import getCombatants from "./getCombatants";

type Combatants = { [index: string]: Combatant }

const getCombatantNames = createSelector<ReduxState, Set<string>>(
  [getCombatants],
  (combatants: Combatants) => new Set(Object.values(combatants).map(combatant => combatant.name)),
);

export default getCombatantNames;
