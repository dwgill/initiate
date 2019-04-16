import { NEW_COMBATANT } from "../actions/types";
import flow from "lodash/fp/flow";
import { createNewCombatantWithId } from "./transformers/combatants";
import { addNewIdToInitiativeOrder } from "./transformers/order";

export function reducer(state, action) {
  const { payload: newCombatantId } = action;
  return flow(
    createNewCombatantWithId(newCombatantId),
    addNewIdToInitiativeOrder(newCombatantId)
  )(state);
}

export const type = NEW_COMBATANT;
