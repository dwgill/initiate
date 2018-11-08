import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./CombatantDisplay.module.scss";
import NumberField from "./NumberField";

class CombatantDisplay extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,

    initiative: PropTypes.number.isRequired,
    onChangeInitiative: PropTypes.func.isRequired,

    armorClass: PropTypes.number.isRequired,
    onChangeArmorClass: PropTypes.func.isRequired,

    healthPoints: PropTypes.number.isRequired,
    onChangeHealthPoints: PropTypes.func.isRequired
  };

  render() {
    const {
      name,
      initiative,
      onChangeInitiative,
      healthPoints,
      onChangeHealthPoints,
      armorClass,
      onChangeArmorClass
    } = this.props;
    return (
      <>
        <input
          type="text"
          className={styles.name}
          value={name}
          onChange={this.handleChangeName}
          placeholder="Unnamed"
        />
        <div className={styles.body}>
          <NumberField
            label="Initiative:"
            value={initiative}
            onChange={onChangeInitiative}
          />
          <NumberField
            label="Health:"
            value={healthPoints}
            onChange={onChangeHealthPoints}
          />
          <NumberField
            label="Armor Class:"
            value={armorClass}
            onChange={onChangeArmorClass}
          />
        </div>
      </>
    );
  }

  handleChangeName = event => {
    const newName = event.target.value;
    const { onChangeName } = this.props;
    onChangeName(newName);
  };
}

export default CombatantDisplay;
