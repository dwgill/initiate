import { ReactComponent as Clone } from "@fortawesome/fontawesome-free/svgs/solid/clone.svg";
import { ReactComponent as Times } from "@fortawesome/fontawesome-free/svgs/solid/times.svg";
import { ReactComponent as Comment } from "@fortawesome/fontawesome-free/svgs/solid/comment-alt.svg";
import cls from "classnames";
import React, { memo, useCallback, useEffect, useState } from "react";
import CombatantDisplay from "../CombatantDisplay";
import styles from "./CombatantCard.module.scss";
import enhance from "./CombatantCardEnhancer";
import { flashDurationMilliseconds } from "../../logic/flashDuration";
import { copyCombatantPredicate } from "../../logic/shortcuts";
import existy from "../../logic/existy";

const useClickCallback = onClick => {
  // prettier-ignore
  return useCallback(event => {
    onClick();
    event.target.blur();
  }, [onClick]);
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

const NotesButton = memo(({ onClick }) => {
  const handleClick = useClickCallback(onClick);
  return (
    <button className={styles.commentBtn} onClick={handleClick}>
      <Comment className={styles.icon} />
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
  active,
  notes,
  onCopyCombatant,
  onUpdateCombatant,
  onDeleteCombatant
}) => {
  const handleChangeName = useCombatantUpdater(onUpdateCombatant, "name");
  const handleChangeNotes = useCombatantUpdater(onUpdateCombatant, "notes");
  const handleChangeInit = useCombatantUpdater(onUpdateCombatant, "initiative");
  const handleChangeHP = useCombatantUpdater(onUpdateCombatant, "healthPoints");
  const handleChangeAC = useCombatantUpdater(onUpdateCombatant, "armorClass");
  const handleKeyDown = useCallback((event) => {
    if (copyCombatantPredicate(event)) {
      onCopyCombatant();
    }
  }, [onCopyCombatant]);
  const [displayNotes, setDisplayNotes] = useState(false);
  const handleToggleNotes = useCallback(() => setDisplayNotes(state => !state));

  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    setFlashing(true);
    const timeoutID = setTimeout(
      () => setFlashing(false),
      flashDurationMilliseconds
    );
    return () => {
      setFlashing(false);
      clearTimeout(timeoutID);
    };
  }, [initiative]);

  useEffect(() => {
    if (existy(notes) && notes.length > 0) {
      setDisplayNotes(true);
    }
  }, []);

  return (
    <div
      className={cls(styles.card, {
        [styles.active]: active,
        [styles.flashing]: flashing
      })}
      onKeyDown={handleKeyDown}
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
          displayNotes={displayNotes}
          notes={notes}
          onChangeNotes={handleChangeNotes}
        />
        <DeleteButton onClick={onDeleteCombatant} />
        <CopyButton onClick={onCopyCombatant} />
        <NotesButton onClick={handleToggleNotes} />
      </div>
    </div>
  );
};

export default enhance(CombatantCard);
