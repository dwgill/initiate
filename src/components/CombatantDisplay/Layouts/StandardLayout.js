import React from "react";
import styles from './StandardLayout.module.scss';

const StandardLayout = ({ Name, Initiative, Health, ArmorClass }) => (
  <div className={styles.container}>
    <Name className={styles.left} />
    <div className={styles.right}>
      <Initiative className={styles.rightElement} />
      <Health className={styles.rightElement} />
      <ArmorClass className={styles.rightElement} />
    </div>
  </div>
);

export default StandardLayout;
