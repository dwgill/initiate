import flow from "lodash/fp/flow";
import isEqual from "lodash/fp/isEqual";
import map from "lodash/fp/map";
import reverse from "lodash/fp/reverse";
import sortBy from "lodash/fp/sortBy";
import {
  DELETE_COMBATANT,
  NEW_COMBATANT,
  PROGRESS_INITIATIVE,
  UPDATE_COMBATANT
} from "../actions/types";
import existy from "../logic/existy";
import reassessActivePosition from "../logic/reassessActivePosition";
import getCombatants from "../selectors/getCombatants";
import getConfigSorted from "../selectors/getConfigSorted";

const calcCombatantInitiative = combatant =>
  isNaN(combatant.initiative) ? Number.MAX_SAFE_INTEGER : combatant.initiative;

const calcOrderOfCombatants = flow(
  getCombatants,
  sortBy(calcCombatantInitiative),
  map("id"),
  reverse
);

const newOrder = state => (order, replace = false) => ({
  ...state,
  order: {
    ...(replace ? {} : state.order),
    ...order
  }
});

const orderReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_COMBATANT: {
      const shouldSort = getConfigSorted(state);
      if (!shouldSort || !payload.hasOwnProperty("initiative")) {
        return state;
      }

      const oldOrdering = state.order.ids;
      const newOrdering = calcOrderOfCombatants(state);
      const noDifference = isEqual(oldOrdering, newOrdering);
      if (noDifference) {
        return state;
      }

      const updatedId = payload.id;
      const prevActiveId = oldOrdering[oldActivePos];
      const oldActivePos = state.order.active;
      const newActivePos = reassessActivePosition({
        oldOrdering,
        newOrdering,
        oldActivePos,
        resetActive: updatedId === prevActiveId,
      });

      return newOrder(state)({
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

      return newOrder(state)({ ids: newOrdering, active: newActivePos });
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
        resetActive: deletedId === prevActiveId,
      });

      // prettier-ignore
      return newOrder(state)({
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
      return noDifference ? state : newOrder(state)({ active: newActivePos });
    }
    default: {
      return state;
    }
  }
};

orderReducer.dependencies = [
  ...getCombatants.reducers,
  ...getConfigSorted.reducers
];

export default orderReducer;
