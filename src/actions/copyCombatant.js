import newCombatant from "./newCombatant";
import updateCombatant from "./updateCombatant";
import getCombatantById from "../selectors/getCombatantById";
const newUniqueId  = require("../logic/newUniqueId").default;

const copyCombatant = sourceCombatantId => (dispatch, getState) => {
  const sourceCombatant = getCombatantById(getState())(sourceCombatantId);
  const newCombatantId = newUniqueId();
  dispatch(newCombatant(newCombatantId));
  dispatch(
    updateCombatant({
      ...sourceCombatant,
      id: newCombatantId
    })
  );
};

export default copyCombatant;
