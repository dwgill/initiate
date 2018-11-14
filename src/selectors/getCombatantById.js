import CombatantsReducer from "../reducers/combatants";

const getCombatantById = state => combatantId => state.combatants[combatantId];

getCombatantById.reducers = [CombatantsReducer];

export default getCombatantById;
