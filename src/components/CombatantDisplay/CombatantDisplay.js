import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./CombatantDisplay.module.scss";
import NumberField from "./NumberField";
import StandardLayout from "./Layouts/StandardLayout";
import AutosizeInput from "react-input-autosize";
import cls from "classnames";

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

  handleRenderName = ({ className }) => (
    <AutosizeInput
      className={className}
      inputClassName={styles.name}
      value={this.props.name}
      onChange={this.handleChangeName}
      placeholder="Unnamed"
    />
  );

  handleRenderInitiative = ({ className }) => (
    <NumberField
      className={className}
      label="Initiative:"
      value={this.props.initiative}
      onChange={this.props.onChangeInitiative}
    />
  );

  handleRenderHealth = ({ className }) => (
    <NumberField
      className={className}
      label="Health:"
      value={this.props.healthPoints}
      onChange={this.props.onChangeHealthPoints}
    />
  );

  handleRenderArmorClass = ({ className }) => (
    <NumberField
      className={className}
      label="Armor Class:"
      value={this.props.armorClass}
      onChange={this.props.onChangeArmorClass}
    />
  );

  render() {
    return (
      <StandardLayout
        Name={this.handleRenderName}
        Initiative={this.handleRenderInitiative}
        Health={this.handleRenderHealth}
        ArmorClass={this.handleRenderArmorClass}
      />
    );
  }

  handleChangeName = event => {
    const newName = event.target.value;
    const { onChangeName } = this.props;
    onChangeName(newName);
  };
}

export default CombatantDisplay;
