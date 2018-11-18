import { DELETE_COMBATANT } from "./types";

const deleteCombatant = combatantId => ({
  type: DELETE_COMBATANT,
  payload: combatantId
});

export default deleteCombatant;
