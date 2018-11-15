import flow from "lodash/fp/flow";
import isEqual from "lodash/fp/isEqual";
import map from "lodash/fp/map";
import reverse from "lodash/fp/reverse";
import sortBy from "lodash/fp/sortBy";
import { UPDATE_COMBATANT } from "../actions/types";
import getCombatants from "../selectors/getCombatants";

const calcCombatantInitiative = combatant =>
  isNaN(combatant.initiative) ? Number.MAX_SAFE_INTEGER : combatant.initiative;

const calcOrderOfCombatants = flow(
  getCombatants,
  sortBy(calcCombatantInitiative),
  map("id"),
  reverse
);

const orderReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_COMBATANT: {
      if (!payload.hasOwnProperty("initiative")) {
        return state;
      }

      const oldOrder = state.order;
      const newOrder = calcOrderOfCombatants(state);
      const noDifference = isEqual(oldOrder, newOrder);

      return noDifference ? state : {
        ...state,
        order: newOrder,
      };
    }
    default: {
      return state;
    }
  }
};

orderReducer.dependencies = [...getCombatants.reducers];

export default orderReducer;
