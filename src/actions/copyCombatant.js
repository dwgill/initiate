import newCombatant from './newCombatant';
import updateCombatant from './updateCombatant';
import newUniqueId from "../logic/newUniqueId";
import getCombatantById from '../selectors/getCombatantById';

const copyCombatant = sourceCombatantId => (dispatch, getState) => {
  const sourceCombatant = getCombatantById(getState())(sourceCombatantId);
  const newCombatantId = newUniqueId();
  dispatch(newCombatant(newCombatantId));
  dispatch(updateCombatant({
    ...sourceCombatant,
    id: newCombatantId
  }));
};

export default copyCombatant;