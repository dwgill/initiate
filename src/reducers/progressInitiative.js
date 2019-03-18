import { PROGRESS_INITIATIVE } from "../actions/types";
import existy from "../logic/existy";
import flow from "lodash/fp/flow";
import newTurnNotes from "../logic/newTurnNotes";
import produce from 'immer';

const updateTheInitiativeOrder = action => state => {
  const oldActivePos = state.order.active;
  const numCombatants = state.order.ids.length;
  const newActivePos = !existy(oldActivePos)
    ? 0
    : (oldActivePos + 1) % numCombatants;
  const finalNewActivePos = isNaN(newActivePos) ? null : newActivePos;
  const noDifference = oldActivePos === finalNewActivePos;
  return noDifference ? state : {
    ...state,
    order: {
      ...state.order,
      active: finalNewActivePos
    }
  }
};

const updateTheNewActiveCombatant = action => state => {
  if (!existy(state.order.active) || state.order.ids.length < 1) {
    return state;
  }

  const activePos = state.order.active;
  const activeId = state.order.ids[activePos];
  const activeCombatant = state.combatants[activeId];
  const { notes: activeNotes } = activeCombatant;

  const newNotes = newTurnNotes(activeNotes);
  const notesChanged = activeNotes !== newNotes;
  
  return produce(state, draft => {
    if (notesChanged) { 
      draft.combatants[activeId].notes = newNotes;
    }
  });
}

export function reducer(state, action) {
  return flow(
    updateTheInitiativeOrder(action),
    updateTheNewActiveCombatant(action),
  )(state);
}

export const type = PROGRESS_INITIATIVE;
