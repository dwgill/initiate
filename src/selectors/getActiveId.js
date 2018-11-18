import orderReducer from "../reducers/order";
import existy from '../logic/existy';

const getActiveId = state => {
  const activePos = state.order.active;
  if (!existy(activePos)) {
    return null;
  }
  const activeId = state.order.ids[activePos];
  if (!existy(activeId)) {
    return null;
  }
  return activeId;
};

getActiveId.reducers = [orderReducer];

export default getActiveId;
