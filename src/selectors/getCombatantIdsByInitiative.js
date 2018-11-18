import orderReducer from "../reducers/order";

const getCombatantIdsByInitiative = state => state.order.ids;

getCombatantIdsByInitiative.reducers = [orderReducer];

export default getCombatantIdsByInitiative;
