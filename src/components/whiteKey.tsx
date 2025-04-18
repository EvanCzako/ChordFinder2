import type { Component } from 'solid-js';

import styles from '../App.module.css';

const WhiteKey: Component = () => {
  return (
    <div class={styles.whiteKey} on:click={() => console.log("YO")}>
      OOOOO
    </div>
  );
};

export default WhiteKey;
