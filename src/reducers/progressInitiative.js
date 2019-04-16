import flow from "lodash/fp/flow";
import { PROGRESS_INITIATIVE } from "../actions/types";
import { updatePropertiesOfNewActiveCombatant } from "./transformers/combatants";
import { progressActiveInitiative } from "./transformers/order";

export function reducer(state, action) {
  return flow(
    progressActiveInitiative,
    updatePropertiesOfNewActiveCombatant
  )(state);
}

export const type = PROGRESS_INITIATIVE;
