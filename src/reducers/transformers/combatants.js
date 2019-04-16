import omit from "lodash/fp/omit";
import isEqual from "lodash/fp/isEqual";
import pick from "lodash/fp/pick";
import getActiveId from "../../selectors/raw/getActiveId";
import existy from "../../logic/existy";
import newTurnNotes from "../../logic/newTurnNotes";
import set from 'lodash/fp/set';

export const removeCombatantFromState = combatantId => state => {
  const noDifference = !state.combatants.hasOwnProperty(combatantId);
  return noDifference ? state : omit(`combatants.${combatantId}`)(state);
};

export const updateCombatantWithNewProperties = ({
  id: combatantId,
  ...newProperties
}) => state => {
  if (!combatantId) {
    return state;
  }

  const oldCombatant = state.combatants[combatantId];
  const newPropKeys = Object.keys(newProperties);
  const oldProperties = pick(newPropKeys)(oldCombatant);
  const noDifference = isEqual(oldProperties)(newProperties);

  // prettier-ignore
  return noDifference ? state : {
    ...state,
    combatants: {
      ...state.combatants,
      [combatantId]: {
        ...oldCombatant,
        ...newProperties,
      },
    }
  };
}

export const createNewCombatantWithId = newCombatantId => state => {
  return {
    ...state,
    combatants: {
      ...state.combatants,
      [newCombatantId]: {
        id: newCombatantId,
        name: "",
        initiative: null,
        armorClass: null,
        healthPoints: null,
        notes: ""
      }
    }
  };
};

export const updatePropertiesOfNewActiveCombatant = state => {
  const activeId = getActiveId(state);
  if (!existy(activeId)) {
    return state;
  }

  const activeCombatant = state.combatants[activeId];
  if (!existy(activeCombatant)) {
    return state;
  }
  const { notes: activeNotes } = activeCombatant;

  const newNotes = newTurnNotes(activeNotes);
  const notesChanged = activeNotes !== newNotes;

  if (!notesChanged) {
    return state;
  }

  return set(['combatants', activeId, 'notes'], newNotes, state);
}