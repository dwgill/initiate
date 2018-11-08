import reduceReducers from 'reduce-reducers';
import combatants from './combatants';
import order from './order';

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

export default reduceReducers(combatants, order, initialState);