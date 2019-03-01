import React, { memo } from "react";
import styles from "./PageCredits.module.scss";

const A = memo(({ link, children }) => (
  <a className={styles.anchor} href={link}>
    {children}
  </a>
));

const PageCredits = memo(() => (
  <footer className={styles.footer}>
    <ul className={styles.credits}>
      <li className={styles.credit}>
        <A link="https://bulma.io/">Bulma CSS framework</A> by Jeremy Thomas.
      </li>
      <li className={styles.credit}>
        <A link="https://github.com/thebinarypenguin/droll">droll</A> library by
        Ethan Zimmerman.
      </li>
      <li className={styles.credit}>
        <A link="https://github.com/JedWatson/react-input-autosize">
          react-input-autosize
        </A>{" "}
        library by Jed Watson.
      </li>
      <li className={styles.credit}>
        <A link="https://game-icons.net/1x1/delapouite/backward-time.html">
          Backward time icon
        </A>{" "}
        by <A link="https://delapouite.com/">Delapouite</A> under{" "}
        <A link="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</A>
      </li>
    </ul>
  </footer>
));

export default PageCredits;
