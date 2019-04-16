import flow from "lodash/fp/flow";
import { UPDATE_COMBATANT } from "../actions/types";
import { updateCombatantWithNewProperties } from "./transformers/combatants";
import { reorderInitiativeGivenUpdatedId } from "./transformers/order";

export function reducer(state, action) {
  const { payload: newProperties } = action;
  if (!newProperties.id) {
    return state;
  }

  return flow(
    updateCombatantWithNewProperties(newProperties),
    reorderInitiativeGivenUpdatedId(newProperties.id)
  )(state);
}

export const type = UPDATE_COMBATANT;
