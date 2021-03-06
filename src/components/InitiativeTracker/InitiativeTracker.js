import { ReactComponent as Next } from "@fortawesome/fontawesome-free/svgs/solid/caret-square-right.svg";
import { ReactComponent as Plus } from "@fortawesome/fontawesome-free/svgs/solid/plus-square.svg";
import cls from "classnames";
import React, { memo, useCallback, useEffect } from "react";
import CombatantCard from "../CombatantCard";
import styles from "./InitiativeTracker.module.scss";
import enhance from "./InitiativeTrackerEnhancer";
import { newCombatantPredicate, progressInitiativePredicate } from "../../logic/shortcuts";

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
    initiativeOrder,
    onNewCombatant,
    canProgress,
    onProgressInitiative,
    isProgressing
  }) => {
    const handleKeyDown = useCallback((event) => {
      if (newCombatantPredicate(event)) {
        onNewCombatant();
        return;
      }

      if (progressInitiativePredicate(event)) {
        onProgressInitiative();
        return;
      }
    }, [onNewCombatant, onProgressInitiative]);


    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
      <div
        className={cls(styles.initiativeList, {
          [styles.progressing]: isProgressing
        })}
      >
        <div className={styles.btnRow}>
          {canProgress && (
            <ActionButton onClick={onProgressInitiative} Icon={Next} />
          )}
          <ActionButton onClick={onNewCombatant} Icon={Plus} />
        </div>
        {initiativeOrder.map(combatantId => (
          <CombatantCard id={combatantId} key={combatantId} />
        ))}
      </div>
    );
  }
);

export default enhance(InitiativeTracker);
