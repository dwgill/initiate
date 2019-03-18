import { NEW_COMBATANT } from "../actions/types";
import reassessActivePosition from "../logic/reassessActivePosition";
import flow from "lodash/fp/flow";

const createTheCombatant = action => state => {
  const newCombatantId = action.payload;
  return {
    ...state,
    combatants: {
      ...state.combatants,
      [newCombatantId]: {
        id: newCombatantId,
        name: "",
        initiative: null,
        armorClass: null,
        healthPoints: null,
        notes: ""
      }
    }
  };
}

const updateTheInitiativeOrdering = action => state => {
  const newCombatantId = action.payload;
  const oldOrdering = state.order.ids;
  const newOrdering = [newCombatantId, ...oldOrdering];
  const oldActivePos = state.order.active;
  const newActivePos = reassessActivePosition({
    oldOrdering,
    newOrdering,
    oldActivePos
  });

  return {
    ...state,
    order: {
      ...state.order,
      ids: newOrdering,
      active: newActivePos,
    }
  };
};

export function reducer(state, action) {
  return flow(
    createTheCombatant(action),
    updateTheInitiativeOrdering(action)
  )(state);
}

export const type = NEW_COMBATANT;
