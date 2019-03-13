import createSelector from "selectorator";
import { ReduxState, Combatant } from "../types";

type Combatants = ReduxState['combatants'];

const getCombatants = createSelector<ReduxState, Combatants>(['combatants']);

export default getCombatants;
