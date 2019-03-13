import { UPDATE_COMBATANT } from "./types";
import { PartialCombatant } from "../types";
import existy from "../logic/existy";

function updateCombatant({ id, name, initiative, armorClass, healthPoints, notes }: PartialCombatant) {
  const payload: PartialCombatant = { id };
  
  if (existy(name)) {
    payload.name = name;
  }
  if (existy(initiative)) {
    payload.initiative = initiative;
  }
  if (existy(armorClass)) {
    payload.armorClass = armorClass;
  }
  if (existy(healthPoints)) {
    payload.healthPoints = healthPoints;
  }
  if (existy(notes)) {
    payload.notes = notes;
  }

  return {
    type: UPDATE_COMBATANT,
    payload
  };
}

export default updateCombatant;
