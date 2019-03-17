import eq from "lodash/fp/eq";
import findIndex from "lodash/fp/findIndex";
import inRange from "lodash/fp/inRange";
import existy from "./existy";

/**
 *
 * @param {{ oldOrdering: string[], newOrdering: string[], oldActivePos: number, resetActive: boolean }} args
 * @returns number newActivePos
 */
const reassessActivePosition = ({
  oldOrdering,
  newOrdering,
  oldActivePos,
  resetActive = false
}) => {
  if (!existy(oldActivePos)) {
    return null;
  }

  if ([0, 1].includes(newOrdering.length)) {
    return null;
  }

  const oldActiveId = oldOrdering[oldActivePos];
  const newActivePos = findIndex(eq(oldActiveId))(newOrdering);

  if (!resetActive) {
    // If the previously active combatant has not been specifically updated
    // by the user, then we are safe to just find & return its new position.
    return newActivePos < 0
      ? oldActivePos % newOrdering.length // it was deleted, so use the old pos
      : newActivePos; // else maintain the identity of the active guy
  } else {
    // the position of active was specifically changed by the user
    const activeWasDeleted = newActivePos < 0;
    const activeWasMovedEarlier = inRange(0, oldActivePos, newActivePos);
    const activeDidntMove = oldActivePos === newActivePos;
    const activeWasMovedLater = inRange(
      oldActivePos + 1,
      newOrdering.length,
      newActivePos
    );
    if (activeWasDeleted) {
      return oldActivePos % newOrdering.length;
    } else if (activeDidntMove) {
      return newActivePos;
    } else if (activeWasMovedEarlier) {
      return (oldActivePos + 1) % newOrdering.length;
    } else if (activeWasMovedLater) {
      return oldActivePos % newOrdering.length;
    }
  }

  console.warn(
    "A decision was not reached in reassessing initiative ordering."
  );
  return null;
};

export default reassessActivePosition;
