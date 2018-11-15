import { NEW_COMBATANT } from "./types";
import newUniqueId from "../logic/newUniqueId";

const newCombatant = newCombatantId => ({
  type: NEW_COMBATANT,
  payload: newCombatantId || newUniqueId()
});

export default newCombatant;
