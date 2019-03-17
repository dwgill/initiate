import existy from "../logic/existy";
import newUniqueId from "../logic/newUniqueId";
import newCombatant from "./newCombatant";
import updateCombatant from "./updateCombatant";
import getCombatants from "../selectors/getCombatants";
import getCombatantNames from "../selectors/getCombatantNames";

const terminatesWithNumber = /[0-9]+$/;

/**
 * If the name of the combatant we are copying terminates in a number,
 * we should increment that number with the copy.
 * @param {string} sourceGuyName The name of the original combatant.
 * @param {Set<string>} allNames
 * @returns {string} newCombatantName The name of the copy.
 */
export function determineNewCombatantName(sourceGuyName, allNames) {
  if (!existy(sourceGuyName) || sourceGuyName === '') {
    return null;
  }
  const endNumberMatch = sourceGuyName.match(terminatesWithNumber);
  
  const sourceIsNumbered = existy(endNumberMatch);
  
  let nextNumToCheck, baseName;
  if (!sourceIsNumbered) {
    nextNumToCheck = 2;
    baseName = sourceGuyName.trim();
  } else {
    const { 0: endNumberStr, index: endNumberIndex } = endNumberMatch;
    nextNumToCheck = Math.floor(Number(endNumberStr.trim())) + 1;
    baseName = sourceGuyName.substring(0, endNumberIndex).trim();
  }

  let copyName = `${baseName} ${nextNumToCheck}`.trim();
  while (allNames.has(copyName)) {
    nextNumToCheck += 1;
    copyName = `${baseName} ${nextNumToCheck}`.trim();
  }

  return copyName;
}


const copyCombatant = sourceCombatantId => (dispatch, getState) => {
  const state = getState();
  const sourceCombatant = getCombatants(state)[sourceCombatantId];

  if (!existy(sourceCombatant)) {
    console.warn(
      `Tried to copy combatant ${sourceCombatantId} but it does not exist.`
    );
    return;
  }

  const combatantNames = getCombatantNames(state);

  const newCombatantName = determineNewCombatantName(sourceCombatant.name, combatantNames);
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
