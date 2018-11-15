import React, { PureComponent } from "react";
import styles from "./CombatantCard.module.scss";
import enhance from "./CombatantCardEnhancer";
import PropTypes from "prop-types";
import { Combatant, CombatantId } from "../../reducers/propTypes.js";
import CombatantDisplay from "../CombatantDisplay";
import { ReactComponent as Times } from '@fortawesome/fontawesome-free/svgs/solid/times.svg';
import { ReactComponent as Clone } from '@fortawesome/fontawesome-free/svgs/solid/clone.svg';

const DeleteButton = ({ onPress }) => (
  <button className={styles.deleteBtn} onPress={onPress}>
    <Times className={styles.icon} />
  </button>
);

const CopyButton = ({ onPress }) => (
  <button className={styles.copyBtn} onPress={onPress}>
    <Clone className={styles.icon} />
  </button>
);

class CombatantCard extends PureComponent {
  static propTypes = {
    id: CombatantId().isRequired,
    combatant: Combatant().isRequired,
    onUpdateCombatant: PropTypes.func.isRequired
  };

  doUpdateCombatant(property, value) {
    const { onUpdateCombatant } = this.props;
    if (!onUpdateCombatant) {
      return;
    }

    onUpdateCombatant({ [property]: value });
  }

  handleChangeName = newName => {
    this.doUpdateCombatant("name", newName);
  };
  handleChangeInitiative = newInit => {
    this.doUpdateCombatant("initiative", newInit);
  };
  handleChangeHealthPoints = newHP => {
    this.doUpdateCombatant("healthPoints", newHP);
  };
  handleChangeArmorClass = newAC => {
    this.doUpdateCombatant("armorClass", newAC);
  };

  render() {
    const {
      combatant: { name, initiative, armorClass, healthPoints }
    } = this.props;
    return (
      <div className={styles.card}>
        <div className={styles.cardInterior}>
          <CombatantDisplay
            name={name}
            onChangeName={this.handleChangeName}
            initiative={initiative}
            onChangeInitiative={this.handleChangeInitiative}
            healthPoints={healthPoints}
            onChangeHealthPoints={this.handleChangeHealthPoints}
            armorClass={armorClass}
            onChangeArmorClass={this.handleChangeArmorClass}
          />
          <DeleteButton />
          <CopyButton />
        </div>
      </div>
    );
  }
}

export default enhance(CombatantCard);
