import getCombatantIdsByInitiative from './getCombatantIdsByInitiative';
import getActiveId from './getActiveId';
import existy from '../logic/existy';

const getCombatantIsActiveOrUpNext = state => combatantId => {
  const activeId = getActiveId(state);
  const initiativeOrder = getCombatantIdsByInitiative(state);

  if (!existy(activeId) || !existy(combatantId)) {
    return false;
  }

  const activeIndex = initiativeOrder.findIndex(id => id === activeId);
  const thisIndex = initiativeOrder.findIndex(id => id === combatantId);
  return thisIndex >= activeIndex;
};

export default getCombatantIsActiveOrUpNext;
