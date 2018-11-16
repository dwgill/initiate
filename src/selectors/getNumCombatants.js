import size from 'lodash/fp/size';
import CombatantsReducer from "../reducers/combatants";

const getNumCombatants = state => size(state.combatants);

getNumCombatants.reducers = [CombatantsReducer];

export default getNumCombatants;
