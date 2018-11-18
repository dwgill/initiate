import combatantsReducer from "../reducers/combatants";

const getCombatants = state => state.combatants;

getCombatants.reducers = [combatantsReducer];

export default getCombatants;
