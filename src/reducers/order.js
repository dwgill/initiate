import sortBy from "lodash/fp/sortBy";
import map from "lodash/fp/map";
import reverse from "lodash/fp/reverse";
import flow from "lodash/fp/flow";
import { UPDATE_COMBATANT } from "../actions/types";
import getCombatants from '../selectors/getCombatants';

const getOrderForCombatants = flow(
  getCombatants,
  sortBy(combatant => combatant.initiative || 0),
  map("id"),
  reverse
);

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_COMBATANT: {
      if (!payload.initiative) {
        return state;
      }

      return {
        ...state,
        order: getOrderForCombatants(state),
      };
    }
    default: {
      return state;
    }
  }
};
