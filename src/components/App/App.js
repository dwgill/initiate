import React, { PureComponent } from "react";
import InitiativeTracker from "../InitiativeTracker";
import PageCredits from "./PageCredits";
import PageHeader from "./PageHeader";
import styles from "./App.module.scss";

class App extends PureComponent {
  render() {
    return (
      <>
        <PageHeader />
        <section className={styles.mainSection}>
          <InitiativeTracker />
        </section>
        <PageCredits />
      </>
    );
  }
}

export default App;
