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
  order: ["foo", "bar"],
  combatants: {
    foo: {
      id: "foo",
      name: "Brokthar",
      initiative: 15,
      armorClass: 16,
      healthPoints: 25
    },
    bar: {
      id: "bar",
      name: "Archideld",
      initiative: 6,
      armorClass: 12,
      healthPoints: 10
    }
  }
};

const reducers = prioritizeReducers(combatantsReducer, orderReducer);

export default reduceReducers(...reducers, initialState);
