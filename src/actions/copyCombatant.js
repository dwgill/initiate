import existy from "../logic/existy";
import newUniqueId from "../logic/newUniqueId";
import newCombatant from "./newCombatant";
import updateCombatant from "./updateCombatant";

const terminatesWithNumber = /[0-9]+$/;

/**
 * If the name of the combatant we are copying terminates in a number,
 * we should increment that number with the copy.
 * @param {string} sourceCombatantName The name of the original combatant.
 * @param {string} newCombatantName The name of the copy.
 */
export function determineNewCombatantName(sourceCombatantName) {
  const endNumberMatch = sourceCombatantName.match(terminatesWithNumber);
  if (!existy(endNumberMatch)) {
    return sourceCombatantName;
  } 

  const { 0: endNumberStr, index: endNumberIndex } = endNumberMatch;
  const newNumber = Number(endNumberStr.trim()) + 1;
  
  return sourceCombatantName.substring(0, endNumberIndex) + newNumber;
}


const copyCombatant = sourceCombatantId => (dispatch, getState) => {
  const sourceCombatant = getState().combatants[sourceCombatantId];
  if (!existy(sourceCombatant)) {
    console.warn(
      `Tried to copy combatantId ${sourceCombatantId} without corresponding combatant.`
    );
    return;
  }

  const newCombatantName = determineNewCombatantName(sourceCombatant.name);
  const newCombatantId = newUniqueId();
  dispatch(newCombatant(newCombatantId));
  dispatch(
    updateCombatant({
      ...sourceCombatant,
      name: newCombatantName,
      id: newCombatantId
    })
  );
};

export default copyCombatant;
