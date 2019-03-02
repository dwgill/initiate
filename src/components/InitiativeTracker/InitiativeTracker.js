import { ReactComponent as Next } from "@fortawesome/fontawesome-free/svgs/solid/caret-square-right.svg";
import { ReactComponent as Plus } from "@fortawesome/fontawesome-free/svgs/solid/plus-square.svg";
import React, { memo, useCallback } from "react";
import CombatantCard from "../CombatantCard";
import styles from "./InitiativeTracker.module.scss";
import enhance from "./InitiativeTrackerEnhancer";

const ActionButton = memo(({ onClick, Icon }) => {
  // prettier-ignore
  const handleClick = useCallback(event => {
    onClick();
    event.target.blur();
  }, [onClick]);

  return (
    <button className={styles.iconBtn} onClick={handleClick}>
      <Icon className={styles.icon} />
    </button>
  );
});

// prettier-ignore
const InitiativeTracker = memo(({
  combatants,
  onNewCombatant,
  canProgress,
  onProgressInitiative
}) => {  
  const handleKeyDown = useCallback(event => {
    if (event.shiftKey && event.key === "Enter") {
      onNewCombatant();
    }
  }, [onNewCombatant]);

  return (
    <div className={styles.initiativeList} onKeyDown={handleKeyDown}>
      <div className={styles.btnRow}>
        {canProgress && (
          <ActionButton onClick={onProgressInitiative} Icon={Next} />
        )}
        <ActionButton onClick={onNewCombatant} Icon={Plus} />
      </div>
      {combatants.map(combatant => (
        <CombatantCard {...combatant} key={combatant.id} />
      ))}
    </div>
  );
});

export default enhance(InitiativeTracker);
