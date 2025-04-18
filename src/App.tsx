import type { Component } from "solid-js";

import WhiteKey from "./components/whiteKey";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <WhiteKey />
      <WhiteKey />
    </div>
  );
};

export default App;
