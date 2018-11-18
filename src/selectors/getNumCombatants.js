import size from 'lodash/fp/size';
import combatantsReducer from "../reducers/combatants";

const getNumCombatants = state => size(state.combatants);

getNumCombatants.reducers = [combatantsReducer];

export default getNumCombatants;
