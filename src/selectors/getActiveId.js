import existy from "../logic/existy";
import ActiveInitiativeReducer from "../reducers/activeInitiative";
import getCombatantIdsByInitiative from "./getCombatantIdsByInitiative";

const getActiveId = state => {
  const { activeInitiative } = state;
  const initiativeOrder = getCombatantIdsByInitiative(state);
  if (!existy(activeInitiative)) {
    return null;
  }
  if (initiativeOrder.length < 1 || initiativeOrder.length < activeInitiative) {
    return null;
  }

  return initiativeOrder[activeInitiative];
};

getActiveId.reducers = [ActiveInitiativeReducer];

export default getActiveId;
