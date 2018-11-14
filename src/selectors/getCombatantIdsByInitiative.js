import OrderReducer from "../reducers/order";

const getCombatantIdsByInitiative = state => state.order;

getCombatantIdsByInitiative.reducers = [OrderReducer];

export default OrderReducer;
