import { ReactComponent as Next } from "@fortawesome/fontawesome-free/svgs/solid/caret-square-right.svg";
import { ReactComponent as Plus } from "@fortawesome/fontawesome-free/svgs/solid/plus-square.svg";
import cls from "classnames";
import React, { memo, useCallback } from "react";
import CombatantCard from "../CombatantCard";
import styles from "./InitiativeTracker.module.scss";
import enhance from "./InitiativeTrackerEnhancer";

const ActionButton = memo(({ onClick, Icon }) => {
  const handleClick = useCallback(
    event => {
      onClick();
      event.target.blur();
    },
    [onClick]
  );

  return (
    <button className={styles.iconBtn} onClick={handleClick}>
      <Icon className={styles.icon} />
    </button>
  );
});

const InitiativeTracker = memo(
  ({
    combatants,
    onNewCombatant,
    canProgress,
    onProgressInitiative,
    isProgressing
  }) => {
    const handleKeyDown = useCallback(
      event => {
        if (event.shiftKey && event.key === "Enter") {
          onNewCombatant();
        }
      },
      [onNewCombatant]
    );

    return (
      <div
        className={cls(styles.initiativeList, {
          [styles.progressing]: isProgressing
        })}
        onKeyDown={handleKeyDown}
      >
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
  }
);

export default enhance(InitiativeTracker);
