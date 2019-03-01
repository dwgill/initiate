import existy from "../logic/existy";
import newUniqueId from "../logic/newUniqueId";
import newCombatant from "./newCombatant";
import updateCombatant from "./updateCombatant";

const copyCombatant = sourceCombatantId => (dispatch, getState) => {
  const sourceCombatant = getState().combatants[sourceCombatantId];
  if(!existy(sourceCombatant)) {
    console.warn(`Tried to copy combatantId ${sourceCombatantId} without corresponding combatant.`);
    return;
  }
  
  const newCombatantId = newUniqueId();
  dispatch(newCombatant(newCombatantId));
  dispatch(
    updateCombatant({
      ...sourceCombatant,
      id: newCombatantId
    })
  );
};

export default copyCombatant;
