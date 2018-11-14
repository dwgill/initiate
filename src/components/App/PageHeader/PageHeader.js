import React, { PureComponent } from "react";
import styles from "./PageHeader.module.scss";

class PageHeader extends PureComponent {
  render() {
    return (
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
    );
  }
}

export default PageHeader;
