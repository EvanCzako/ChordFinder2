import type { Component } from "solid-js";

import WhiteKey from "./components/whiteKey";
import OctaveContainer from "./components/octaveContainer";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <OctaveContainer octaveIdx={4} />
    </div>
  );
};

export default App;
