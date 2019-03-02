import reduceReducers from "reduce-reducers";
// eslint-disable-next-line
import * as Types from "../types";
import combatantsReducer from "./combatants";
import orderReducer from "./order";

/** @type {Types.ReduxState} */
const initialState = {
  order: {
    active: null,
    ids: []
  },
  combatants: {}
};

export default reduceReducers(combatantsReducer, orderReducer, initialState);
