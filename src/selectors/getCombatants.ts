import createSelector from "selectorator";
import { ReduxState, Combatant } from "../types";

type Combatants = { [index: string]: Combatant };

const getCombatants = createSelector<ReduxState, Combatants>(['combatants']);

export default getCombatants;
