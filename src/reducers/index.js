import existy from "../logic/existy";
// eslint-disable-next-line
import * as Types from "../types";
import * as deleteCombatant from './deleteCombatant';
import * as newCombatant from './newCombatant';
import * as progressInitiative from './progressInitiative';
import * as updateCombatant from "./updateCombatant";

/** @type {Types.ReduxState} */
const initialState = {
  order: {
    active: null,
    ids: []
  },
  combatants: {}
};

const reducers = {
  [updateCombatant.type]: updateCombatant.reducer,
  [newCombatant.type]: newCombatant.reducer,
  [deleteCombatant.type]: deleteCombatant.reducer,
  [progressInitiative.type]: progressInitiative.reducer
};

function coreReducer(state = initialState, action) {
  const reducer = reducers[action.type];
  if (existy(reducer)) {
    return reducer(state, action);
  }

  return state;
}

export default coreReducer;
