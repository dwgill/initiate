import isEqual from "lodash/fp/isEqual";
import { DELETE_COMBATANT, NEW_COMBATANT, PROGRESS_INITIATIVE, UPDATE_COMBATANT } from "../actions/types";
import existy from "../logic/existy";
import reassessActivePosition from "../logic/reassessActivePosition";
import getConfigSorted from "../selectors/getConfigSorted";
import getInitiativeOrderSorted from "../selectors/getInitiativeOrderSorted";

const defineNewState = state => (order, replace = false) => ({
  ...state,
  order: {
    ...(replace ? {} : state.order),
    ...order
  }
});

const orderReducer = (state, { type, payload }) => {
  const withNewOrder = defineNewState(state);
  switch (type) {
    case UPDATE_COMBATANT: {
      const shouldSort = getConfigSorted(state);
      if (!shouldSort || !payload.hasOwnProperty("initiative")) {
        return state;
      }

      const oldOrdering = state.order.ids;
      const newOrdering = getInitiativeOrderSorted(state);
      const noDifference = isEqual(oldOrdering, newOrdering);
      if (noDifference) {
        return state;
      }

      const updatedId = payload.id;
      const oldActivePos = state.order.active;
      const prevActiveId = oldOrdering[oldActivePos];
      const newActivePos = reassessActivePosition({
        oldOrdering,
        newOrdering,
        oldActivePos,
        resetActive: updatedId === prevActiveId
      });

      return withNewOrder({
        ids: newOrdering,
        active: newActivePos
      });
    }
    case NEW_COMBATANT: {
      const newCombatantId = payload;
      const oldOrdering = state.order.ids;
      const newOrdering = [newCombatantId, ...oldOrdering];
      const oldActivePos = state.order.active;

      const newActivePos = reassessActivePosition({
        oldOrdering,
        newOrdering,
        oldActivePos
      });

      return withNewOrder({ ids: newOrdering, active: newActivePos });
    }
    case DELETE_COMBATANT: {
      const deletedId = payload;
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

      return withNewOrder({
        ids: newOrdering,
        active: newActivePos
      });
    }
    case PROGRESS_INITIATIVE: {
      const oldActivePos = state.order.active;
      const numCombatants = state.order.ids.length;
      const newActivePos = !existy(oldActivePos)
        ? 0
        : (oldActivePos + 1) % numCombatants;
      const noDifference = oldActivePos === newActivePos || numCombatants < 1;
      return noDifference ? state : withNewOrder({ active: newActivePos });
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
