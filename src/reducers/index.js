import reduceReducers from 'reduce-reducers';
import combatantsReducer from './combatants';
import orderReducer from './order';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import flatMap from 'lodash/fp/flatMap';

const reducerDependencyGraph = flatMap(
  reducer => reducer.dependencies.map(dep => [dep, reducer])
)([combatantsReducer, orderReducer]);

const initialState = {
  order: ['foo', 'bar'],
  combatants: {
    'foo': {
      id: 'foo',
      name: 'Brokthar',
      initiative: 15,
      armorClass: 16,
      healthPoints: 25,
    },
    'bar': {
      id: 'bar',
      name: 'Archideld',
      initiative: 6,
      armorClass: 12,
      healthPoints: 10,
    }
  },
}

export default reduceReducers(combatantsReducer, orderReducer, initialState);