import sortBy from "lodash/fp/sortBy";
import map from "lodash/fp/map";
import reverse from "lodash/fp/reverse";
import flow from "lodash/fp/flow";
import { UPDATE_COMBATANT } from "../actions/types";
import getCombatants from "../selectors/getCombatants";

const getOrderForCombatants = flow(
  getCombatants,
  sortBy(combatant =>
    isNaN(combatant.initiative) ? Number.MAX_SAFE_INTEGER : combatant.initiative
  ),
  map("id"),
  reverse
);

const orderReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_COMBATANT: {
      if (!payload.hasOwnProperty("initiative")) {
        return state;
      }

      return {
        ...state,
        order: getOrderForCombatants(state)
      };
    }
    default: {
      return state;
    }
  }
};

orderReducer.dependencies = [...getCombatants.reducers];

export default orderReducer;
