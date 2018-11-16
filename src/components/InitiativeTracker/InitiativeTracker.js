import React, { PureComponent, memo } from "react";
import CombatantCard from "../CombatantCard";
import enhance from "./InitiativeTrackerEnhancer";
import styles from "./InitiativeTracker.module.scss";
import { ReactComponent as Plus } from "@fortawesome/fontawesome-free/svgs/solid/plus-square.svg";
import { ReactComponent as Next } from "@fortawesome/fontawesome-free/svgs/solid/caret-square-right.svg";

const ActionButton = memo(({ onClick, Icon }) => (
  <button
    className={styles.iconBtn}
    onClick={event => {
      onClick();
      event.target.blur();
    }}
  >
    <Icon className={styles.icon} />
  </button>
));

class InitiativeTracker extends PureComponent {
  render() {
    const {
      combatants,
      onNewCombatant,
      canProgress,
      onProgressInitiative
    } = this.props;
    return (
      <div className={styles.initiativeList}>
        <div className={styles.btnRow}>
          {canProgress && (
            <ActionButton onClick={onProgressInitiative} Icon={Next} />
          )}
          <ActionButton onClick={onNewCombatant} Icon={Plus} />
        </div>
        {combatants.map(combatantID => (
          <CombatantCard id={combatantID} key={combatantID} />
        ))}
      </div>
    );
  }
}

export default enhance(InitiativeTracker);
