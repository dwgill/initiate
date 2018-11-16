import {
  UPDATE_COMBATANT,
  NEW_COMBATANT,
  DELETE_COMBATANT
} from "../actions/types";
import isEqual from "lodash/fp/isEqual";
import pick from "lodash/fp/pick";
import omit from "lodash/fp/omit";

const combatantsReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_COMBATANT: {
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
    }
    case NEW_COMBATANT: {
      const combatantId = payload;
      return {
        ...state,
        combatants: {
          ...state.combatants,
          [combatantId]: {
            id: combatantId,
            name: "",
            initiative: null,
            armorClass: null,
            healthPoints: null
          }
        }
      };
    }
    case DELETE_COMBATANT: {
      const { id: combatantId } = payload;
      const noDifference = !state.combatants.hasOwnProperty(combatantId);
      return noDifference ? state : omit(`combatants.${combatantId}`)(state);
    }
    default: {
      return state;
    }
  }
};

combatantsReducer.dependencies = [];

export default combatantsReducer;
