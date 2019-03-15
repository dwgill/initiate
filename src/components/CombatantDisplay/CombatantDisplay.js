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
  onChangeHealthPoints,
  displayNotes,
  notes,
  onChangeNotes
}) => {
  const handleChangeName = useCallback(
    event => onChangeName(event.target.value),
    [onChangeName]
  );
  const handleChangeNotes = useCallback(
    event => onChangeNotes(event.target.value),
    [onChangeNotes]
  );
  const handleBlurName = useCallback(() => {
    if (name !== name.trim()) {
      onChangeName(name.trim());
    }
  }, [onChangeName]);

  const nameRef = useRef();

  useEffect(() => nameRef.current.focus(), []);

  return (
    <div className={styles.container}>
      <div className={styles.coreRow}>
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
      {displayNotes && (
        <div className={styles.notes}>
          <textarea
            className={styles.notesInput}
            value={notes}
            onChange={handleChangeNotes}
          />
        </div>
      )}
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
