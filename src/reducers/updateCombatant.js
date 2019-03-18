import flow from "lodash/fp/flow";
import isEqual from "lodash/fp/isEqual";
import pick from "lodash/fp/pick";
import { UPDATE_COMBATANT } from "../actions/types";
import existy from "../logic/existy";
import reassessActivePosition from "../logic/reassessActivePosition";
import getInitiativeOrderSorted from "../selectors/getInitiativeOrderSorted";

const updateTheCombatant = action => state => {
  const { payload } = action;
  const { id: combatantId } = payload;
  if (!combatantId) {
    return state;
  }

  const oldCombatant = state.combatants[combatantId];
  const newProperties = payload;
  const newPropKeys = Object.keys(newProperties);
  const oldProperties = pick(newPropKeys)(oldCombatant);
  const noDifference = isEqual(oldProperties)(newProperties);

  // prettier-ignore
  return noDifference ? state : {
    ...state,
    combatants: {
      ...state.combatants,
      [combatantId]: {
        ...oldCombatant,
        ...newProperties,
      },
    }
  };
};

const updateTheInitiativeOrder = action => state => {
  const newProperties = action.payload;
  if (!existy(newProperties.initiative)) {
    return state;
  }

  const oldOrdering = state.order.ids;
  const newOrdering = getInitiativeOrderSorted(state);
  const noDifference = isEqual(oldOrdering, newOrdering);
  if (noDifference) {
    return state;
  }

  const updatedId = newProperties.id;
  const oldActivePos = state.order.active;
  const prevActiveId = oldOrdering[oldActivePos];
  const newActivePos = reassessActivePosition({
    oldOrdering,
    newOrdering,
    oldActivePos,
    resetActive: updatedId === prevActiveId
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
  const newProperties = action.payload;
  if (!newProperties.id) {
    return state;
  }

  return flow(
    updateTheCombatant(action),
    updateTheInitiativeOrder(action)
  )(state);
}

export const type = UPDATE_COMBATANT;
