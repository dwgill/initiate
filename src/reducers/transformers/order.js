import sortBy from "lodash/fp/sortBy";
import reassessActivePosition from "../../logic/reassessActivePosition";
import getPropOfCombatant from "../../selectors/raw/getPropOfCombatant";
import existy from "../../logic/existy";
import flow from "lodash/fp/flow";
import reverse from "lodash/fp/reverse";

export const removeCombatantIdFromInitiative = deletedCombatantId => state => {
  const oldOrdering = state.order.ids;
  const oldActivePos = state.order.active;
  const noDifference = !oldOrdering.includes(deletedCombatantId);
  if (noDifference) {
    return state;
  }

  const newOrdering = oldOrdering.filter(
    otherId => otherId !== deletedCombatantId
  );
  const prevActiveId = oldOrdering[oldActivePos];
  const newActivePos = reassessActivePosition({
    newOrdering,
    oldOrdering,
    oldActivePos,
    resetActive: deletedCombatantId === prevActiveId
  });

  return {
    ...state,
    order: {
      ...state.order,
      ids: newOrdering,
      active: newActivePos
    }
  };
};

export const reorderInitiativeGivenUpdatedId = updatedId => state => {
  const initiativeForId = id => getPropOfCombatant(state, id, "initiative");
  const initiativeCmpValForId = flow(
    initiativeForId,
    initVal => (existy(initVal) ? initVal : Number.MAX_SAFE_INTEGER)
  );
  const updatedIdHasNoInit = !existy(initiativeForId(updatedId));
  if (updatedIdHasNoInit) {
    return state;
  }

  const oldOrdering = state.order.ids;
  const oldActivePos = state.order.active;

  const oldOrderingIsSorted = oldOrdering.every((earlierId, index) => {
    const noLaterId = index + 1 >= oldOrdering.length;
    if (noLaterId) {
      return true;
    }

    const laterId = oldOrdering[index + 1];

    const earlierInit = initiativeCmpValForId(earlierId);
    const laterInit = initiativeCmpValForId(laterId);
    return earlierInit >= laterInit;
  });

  if (oldOrderingIsSorted) {
    return state;
  }

  const sortOrdering = flow(
    sortBy(initiativeCmpValForId),
    reverse
  );

  const newOrdering = sortOrdering(oldOrdering);
  const newActivePos = reassessActivePosition({
    oldOrdering,
    newOrdering,
    oldActivePos,
    resetActive: updatedId === oldActivePos
  });

  return {
    ...state,
    order: {
      ...state.order,
      ids: newOrdering,
      active: newActivePos
    }
  };
};

export const addNewIdToInitiativeOrder = newCombatantId => state => {
  const oldOrdering = state.order.ids;
  const newOrdering = [newCombatantId, ...oldOrdering];
  const oldActivePos = state.order.active;
  const newActivePos = reassessActivePosition({
    oldOrdering,
    newOrdering,
    oldActivePos
  });

  return {
    ...state,
    order: {
      ...state.order,
      ids: newOrdering,
      active: newActivePos
    }
  };
};

export const progressActiveInitiative = state => {
  const oldActivePos = state.order.active;
  const numCombatants = state.order.ids.length;
  const newActivePos = !existy(oldActivePos)
    ? 0
    : (oldActivePos + 1) % numCombatants;
  const finalNewActivePos = isNaN(newActivePos) ? null : newActivePos;
  const noDifference = oldActivePos === finalNewActivePos;
  // prettier-ignore
  return noDifference ? state : {
    ...state,
    order: {
      ...state.order,
      active: finalNewActivePos
    }
  };
};
