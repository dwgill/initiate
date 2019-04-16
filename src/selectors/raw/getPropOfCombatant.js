import get from 'lodash/fp/get';

function getPropOfCombatant(state, combatantId, propName) {
  return get(['combatants', combatantId, propName], state);
}

export default getPropOfCombatant;
