import { Component, createSignal, Show } from "solid-js";
import { useStore } from "./storeProvider";
import styles from "../App.module.css";

const blackKey: Component<{ note: string }> = (props: { note: string }) => {
    const [pressed, setPressed] = createSignal(false);
    const [store, { addNotePressed, removeNotePressed }] = useStore() as any;

    return (
        <Show
            when={!pressed()}
            fallback={
                <div
                    class={styles.blackKeyPressed}
                    on:click={() => {
                        setPressed(false);
                        removeNotePressed(props.note);
                    }}
                >
                </div>
            }
        >
            <div
                class={styles.blackKey}
                on:click={() => {
                    setPressed(true);
                    addNotePressed(props.note);
                }}
            >
            </div>
        </Show>
    );
};

export default blackKey;
