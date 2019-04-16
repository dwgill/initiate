import { DELETE_COMBATANT } from "../actions/types";
import flow from "lodash/fp/flow";
import { removeCombatantFromState } from "./transformers/combatants";
import { removeCombatantIdFromInitiative } from "./transformers/order";

export function reducer(state, action) {
  const { payload: combatantId } = action;
  return flow(
    removeCombatantFromState(combatantId),
    removeCombatantIdFromInitiative(combatantId),
  )(state);
}

export const type = DELETE_COMBATANT;
