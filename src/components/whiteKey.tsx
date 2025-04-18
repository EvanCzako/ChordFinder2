import { Component, createSignal, Show } from "solid-js";

import styles from "../App.module.css";

const WhiteKey: Component<{ note: string }> = (props: { note: string }) => {
  const [pressed, setPressed] = createSignal(false);

  return (
    <Show
      when={!pressed()}
      fallback={
        <div
          class={styles.whiteKeyPressed}
          on:click={() => {
            setPressed(!pressed());
          }}
        ></div>
      }
    >
      <div
        class={styles.whiteKey}
        on:click={() => {
          setPressed(!pressed());
        }}
      ></div>
    </Show>
  );
};

export default WhiteKey;
