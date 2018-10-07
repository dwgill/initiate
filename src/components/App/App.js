import React, { PureComponent } from "react";
import PageCredits from "./PageCredits";
import PageHeader from './PageHeader';
import styles from "./App.module.scss";

class App extends PureComponent {
  render() {
    return (
      <>
        <PageHeader />
        <section className={styles.pageBody}>

        </section>
        <PageCredits />
      </>
    );
  }
}

export default App;
