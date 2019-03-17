import { DELETE_COMBATANT } from "../actions/types";
import omit from "lodash/fp/omit";
import flow from "lodash/fp/flow";
import reassessActivePosition from "../logic/reassessActivePosition";

const theCombatantItself = action => state => {
  const combatantId = action.payload;
  const noDifference = !state.combatants.hasOwnProperty(combatantId);
  return noDifference ? state : omit(`combatants.${combatantId}`)(state);
};

const theInitiativeOrder = action => state => {
  const deletedId = action.payload;
  const oldOrdering = state.order.ids;
  const oldActivePos = state.order.active;
  const noDifference = !oldOrdering.includes(deletedId);
  if (noDifference) {
    return state;
  }

  const newOrdering = oldOrdering.filter(otherId => otherId !== deletedId);
  const prevActiveId = oldOrdering[oldActivePos];
  const newActivePos = reassessActivePosition({
    newOrdering,
    oldOrdering,
    oldActivePos,
    resetActive: deletedId === prevActiveId
  });

  return {
    ...state,
    order: {
      ...state.order,
      ids: newOrdering,
      active: newActivePos
    }
  };
};

export function reducer(state, action) {
  return flow(
    theCombatantItself(action),
    theInitiativeOrder(action)
  )(state);
}

export const type = DELETE_COMBATANT;
