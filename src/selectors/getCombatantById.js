import combatantsReducer from "../reducers/combatants";

const getCombatantById = state => combatantId => state.combatants[combatantId];

getCombatantById.reducers = [combatantsReducer];

export default getCombatantById;
