import React, { PureComponent } from "react";
import InitiativeListing from "../InitiativeListing";
import PageCredits from "./PageCredits";
import PageHeader from './PageHeader';
import styles from "./App.module.scss";

class App extends PureComponent {
  render() {
    return (
      <>
        <PageHeader />
        <section className={styles.pageBody}>
          <InitiativeListing />
        </section>
        <PageCredits />
      </>
    );
  }
}

export default App;
