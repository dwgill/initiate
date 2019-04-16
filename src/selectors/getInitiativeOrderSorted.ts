import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import reverse from "lodash/fp/reverse";
import size from "lodash/fp/size";
import sortBy from "lodash/fp/sortBy";
import createSelector from "selectorator";
import existy from "../logic/existy";
import { Combatant, ReduxState } from "../types";


const calcCombatantInitiative = (combatant: Combatant) => {
  if (existy(combatant) && existy(combatant.initiative)) {
    return combatant.initiative;
  } else {
    return Number.MAX_SAFE_INTEGER;
  }
};

type Combatants = { [index: string]: Combatant };

const initiativeValuesHaveNotChanged = (prevCombatants: Combatants, nextCombatants: Combatants) => {
  if (prevCombatants === nextCombatants) {
    return true;
  }

  if (size(prevCombatants) !== size(nextCombatants)) {
    return false;
  }

  for (const [id, { initiative: newInit }] of Object.entries(nextCombatants)) {
    if (!existy(prevCombatants[id])) {
      return false;
    }

    const { initiative: prevInit } = prevCombatants[id];
    if (prevInit !== newInit) {
      return false;
    }
  }

  return true;
};

const getInitiativeOrderingSorted = createSelector<ReduxState, string[]>(
  ["combatants"],
  flow(
    sortBy(calcCombatantInitiative),
    map("id"),
    reverse
  ),
  {
    isEqual: initiativeValuesHaveNotChanged
  }
);

export default getInitiativeOrderingSorted;
