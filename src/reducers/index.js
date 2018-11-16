import flatMap from "lodash/fp/flatMap";
import reduceReducers from "reduce-reducers";
import toposort from "toposort";
import combatantsReducer from "./combatants";
import orderReducer from "./order";
import activeInitiativeReducer from "./activeInitiative";

const prioritizeReducers = (...reducers) => {
  const nodes = reducers;
  const edges = flatMap(reducer =>
    reducer.dependencies.map(dep => [dep, reducer])
  )(reducers);

  return toposort.array(nodes, edges);
};

const initialState = {
  order: [],
  combatants: {},
  activeInitiative: null
};

const reducers = prioritizeReducers(
  combatantsReducer,
  orderReducer,
  activeInitiativeReducer
);

export default reduceReducers(...reducers, initialState);
