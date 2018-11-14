import React from "react";
import styles from './StandardLayout.module.scss';

const StandardLayout = ({ Name, Initiative, Health, ArmorClass }) => (
  <div className={styles.container}>
    <Name className={styles.name} />
    <div className={styles.rightRow}>
      <Initiative className={styles.numberField} />
      <Health className={styles.numberField} />
      <ArmorClass className={styles.numberField} />
    </div>
  </div>
);

export default StandardLayout;
