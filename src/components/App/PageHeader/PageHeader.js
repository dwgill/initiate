import React, { memo } from "react";
import styles from "./PageHeader.module.scss";

const PageHeader = memo(() => (
  <section className={styles.hero}>
    <div className={styles.heroBody}>
      <div className={styles.container}>
        <h1 className={styles.title}>Initiate</h1>
        <h2 className={styles.subtitle}>
          A(nother) Dungeons & Dragons Initative Tracker
        </h2>
      </div>
    </div>
  </section>
));

export default PageHeader;
