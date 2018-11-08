import { UPDATE_COMBATANT } from "./types";

function updateCombatant({ id, name, initiative, armorClass, healthPoints }) {
  const payload = {};
  if (id !== undefined) {
    payload.id = id;
  }
  if (name !== undefined) {
    payload.name = name;
  }
  if (initiative !== undefined) {
    payload.initiative = initiative;
  }
  if (armorClass !== undefined) {
    payload.armorClass = armorClass;
  }
  if (healthPoints !== undefined) {
    payload.healthPoints = healthPoints;
  }

  return {
    type: UPDATE_COMBATANT,
    payload
  };
}

export default updateCombatant;
