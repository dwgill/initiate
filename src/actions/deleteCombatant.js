import { DELETE_COMBATANT } from "./types";
import getCombatantIsActiveOrUpNext from "../selectors/getCombatantIsActiveOrUpNext";

const deleteCombatant = combatantId => (dispatch, getState) => {
  const activeOrUpNext = getCombatantIsActiveOrUpNext(getState());
  dispatch({
    type: DELETE_COMBATANT,
    payload: {
      id: combatantId,
      activeOrUpNext, 
    }
  });
};

export default deleteCombatant;
