import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";
import AutosizeInput from "react-input-autosize";
import styles from "./CombatantDisplay.module.scss";
import NumberField from "./NumberField";

const CombatantDisplay = ({
  name,
  onChangeName,
  initiative,
  onChangeInitiative,
  armorClass,
  onChangeArmorClass,
  healthPoints,
  onChangeHealthPoints
}) => {
  const handleChangeName = useCallback(
    event => onChangeName(event.target.value),
    [onChangeName]
  );
  const handleBlurName = useCallback(() => {
    if (name !== name.trim()) {
      onChangeName(name.trim());
    }
  }, [onChangeName]);

  const nameRef = useRef(null);

  useEffect(() => {
    if (nameRef) {
      nameRef.current.focus();
    }
  }, [nameRef.current]);

  return (
    <div className={styles.container}>
      <AutosizeInput
        className={styles.leftElement}
        inputClassName={styles.name}
        value={name}
        onChange={handleChangeName}
        placeholder="N/A"
        onBlur={handleBlurName}
        ref={nameRef}
      />
      <div className={styles.rightSide}>
        <NumberField
          className={styles.rightElement}
          label="Initiative:"
          value={initiative}
          onChange={onChangeInitiative}
        />
        <NumberField
          className={styles.rightElement}
          label="Health:"
          value={healthPoints}
          onChange={onChangeHealthPoints}
        />
        <NumberField
          className={styles.rightElement}
          label="Armor Class:"
          value={armorClass}
          onChange={onChangeArmorClass}
        />
      </div>
    </div>
  );
};

CombatantDisplay.propTypes = {
  name: PropTypes.string,
  onChangeName: PropTypes.func.isRequired,

  initiative: PropTypes.number,
  onChangeInitiative: PropTypes.func.isRequired,

  armorClass: PropTypes.number,
  onChangeArmorClass: PropTypes.func.isRequired,

  healthPoints: PropTypes.number,
  onChangeHealthPoints: PropTypes.func.isRequired
};

export default CombatantDisplay;
