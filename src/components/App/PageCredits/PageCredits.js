import React, { PureComponent } from "react";
import styles from "./PageCredits.module.scss";

const A = ({ link, children }) => (
  <a className={styles.anchor} href={link}>
    {children}
  </a>
);

class PageCredits extends PureComponent {
  render() {
    return (
      <footer className={styles.footer}>
        <ul className={styles.credits}>
          <li className={styles.credit}>
            <A link="https://bulma.io/">Bulma CSS framework</A> by Jeremy
            Thomas.
          </li>
        </ul>
      </footer>
    );
  }
}

export default PageCredits;
