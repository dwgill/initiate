import flatMap from "lodash/fp/flatMap";
import reduceReducers from "reduce-reducers";
import toposort from "toposort";
import combatantsReducer from "./combatants";
import orderReducer from "./order";

const prioritizeReducers = (...reducers) => {
  const nodes = reducers;
  const edges = flatMap(reducer =>
    reducer.dependencies.map(dep => [dep, reducer])
  )(reducers);

  return toposort.array(nodes, edges);
};

const initialState = {
  order: {
    active: null,
    ids: []
  },
  combatants: {}
};

const reducers = prioritizeReducers(
  combatantsReducer,
  orderReducer
);

export default reduceReducers(...reducers, initialState);
