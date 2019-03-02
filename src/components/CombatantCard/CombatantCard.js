import { ReactComponent as Clone } from "@fortawesome/fontawesome-free/svgs/solid/clone.svg";
import { ReactComponent as Times } from "@fortawesome/fontawesome-free/svgs/solid/times.svg";
import cls from "classnames";
import React, { memo, useCallback, useEffect, useState } from "react";
import CombatantDisplay from "../CombatantDisplay";
import styles from "./CombatantCard.module.scss";
import enhance from "./CombatantCardEnhancer";

const useClickCallback = onClick => {
  // prettier-ignore
  const handleClick = useCallback(event => {
    onClick();
    event.target.blur();
  }, [onClick]);

  return handleClick;
};

const DeleteButton = memo(({ onClick }) => {
  const handleClick = useClickCallback(onClick);
  return (
    <button className={styles.deleteBtn} onClick={handleClick}>
      <Times className={styles.icon} />
    </button>
  );
});

const CopyButton = memo(({ onClick }) => {
  const handleClick = useClickCallback(onClick);
  return (
    <button className={styles.copyBtn} onClick={handleClick}>
      <Clone className={styles.icon} />
    </button>
  );
});

const useCombatantUpdater = (updater, property) => {
  // prettier-ignore
  return useCallback(newValue => {
    updater({ [property]: newValue });
  }, [updater, property]);
};

const CombatantCard = ({
  name,
  initiative,
  armorClass,
  healthPoints,
  onCopyCombatant,
  onUpdateCombatant,
  onDeleteCombatant,
  active
}) => {
  const handleChangeName = useCombatantUpdater(onUpdateCombatant, "name");
  const handleChangeInit = useCombatantUpdater(onUpdateCombatant, "initiative");
  const handleChangeHP = useCombatantUpdater(onUpdateCombatant, "healthPoints");
  const handleChangeAC = useCombatantUpdater(onUpdateCombatant, "armorClass");

  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    setFlashing(true);
    const timeoutID = setTimeout(() => setFlashing(false), 300);
    return () => clearTimeout(timeoutID);
  }, [initiative]);

  return (
    <div
      className={cls(styles.card, {
        [styles.active]: active && !flashing,
        [styles.flashing]: flashing
      })}
    >
      <div className={styles.cardInterior}>
        <CombatantDisplay
          name={name}
          onChangeName={handleChangeName}
          initiative={initiative}
          onChangeInitiative={handleChangeInit}
          healthPoints={healthPoints}
          onChangeHealthPoints={handleChangeHP}
          armorClass={armorClass}
          onChangeArmorClass={handleChangeAC}
        />
        <DeleteButton onClick={onDeleteCombatant} />
        <CopyButton onClick={onCopyCombatant} />
      </div>
    </div>
  );
};

export default enhance(CombatantCard);
