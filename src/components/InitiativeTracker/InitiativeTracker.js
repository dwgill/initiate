import React, { PureComponent } from "react";
import CombatantCard from "../CombatantCard";
import enhance from "./InitiativeTrackerEnhancer";
import styles from "./InitiativeTracker.module.scss";

class InitiativeTracker extends PureComponent {
  render() {
    const { combatants } = this.props;
    return (
      <div className={styles.initiativeList}>
        {combatants.map(combatantID => (
          <CombatantCard id={combatantID} key={combatantID} />
        ))}
      </div>
    );
  }
}

export default enhance(InitiativeTracker);
