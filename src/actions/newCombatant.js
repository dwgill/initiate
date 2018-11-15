import { NEW_COMBATANT } from "./types";
const newUniqueId  = require("../logic/newUniqueId").default;

const newCombatant = newCombatantId => ({
  type: NEW_COMBATANT,
  payload: newCombatantId || newUniqueId()
});

export default newCombatant;
