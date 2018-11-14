import CombatantsReducer from "../reducers/combatants";

const getCombatants = state => state.combatants;

getCombatants.reducers = [CombatantsReducer];

export default getCombatants;
