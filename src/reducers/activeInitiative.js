import partition from "lodash/fp/partition";
import uniq from "lodash/fp/uniq";
import {
  PROGRESS_INITIATIVE,
  NEW_COMBATANT,
  DELETE_COMBATANT
} from "../actions/types";
import existy from "../logic/existy";
import getCombatantById from "../selectors/getCombatantById";
import getCombatantIdsByInitiative from "../selectors/getCombatantIdsByInitiative";

const activeReducer = (state, { type, payload }) => {
  switch (type) {
    case NEW_COMBATANT: {
      const prevActiveInit = state.activeInitiative;
      const newActiveInit = !existy(prevActiveInit) ? null : prevActiveInit + 1;
      const noDifference = prevActiveInit === newActiveInit;

      // prettier-ignore
      return noDifference ? state : {
        ...state,
        activeInitiative: newActiveInit
      };
    }
    case DELETE_COMBATANT: {
      const { activeOrUpNext } = payload;
      const prevActiveInit = state.activeInitiative;
      const deletionIsBeforeActive = existy(prevActiveInit) && !activeOrUpNext;
      const nextActiveInit = deletionIsBeforeActive
        ? prevActiveInit + 1
        : prevActiveInit;
      const noDifference = nextActiveInit === prevActiveInit;

      // prettier-ignore
      return noDifference ? state : {
        ...state,
        activeInitiative: nextActiveInit
      };
    }
    case PROGRESS_INITIATIVE: {
      const initiativeOrder = getCombatantIdsByInitiative(state);
      const [definedInit, undefinedInit] = partition(combatantId => {
        const combatant = getCombatantById(state)(combatantId);
        return existy(combatant.initiative);
      })(initiativeOrder);

      const prevActiveInit = state.activeInitiative;
      let newActiveInit;
      if (definedInit.length === 0) {
        newActiveInit = null;
      } else if (!existy(prevActiveInit)) {
        /**
         * The items with undefined initiatives are always at the front,
         * so we can simply start after that section.
         */
        newActiveInit = undefinedInit.length;
      } else {
        const prevAdjustedActiveInit = prevActiveInit - undefinedInit.length;
        const newAdjustedActiveInit =
          (prevAdjustedActiveInit + 1) % definedInit.length;
        newActiveInit = newAdjustedActiveInit + undefinedInit.length;
      }

      const noDifference = prevActiveInit === newActiveInit;

      // prettier-ignore
      return noDifference ? state : {
        ...state,
        activeInitiative: newActiveInit
      };
    }
    default: {
      return state;
    }
  }
};

activeReducer.dependencies = uniq([
  ...getCombatantById.reducers,
  ...getCombatantIdsByInitiative.reducers
]);

export default activeReducer;
