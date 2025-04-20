import { Component, createSignal, Show } from "solid-js";
import { useStore } from "./storeProvider";
import styles from "../App.module.css";

const WhiteKey: Component<{ note: string }> = (props: { note: string }) => {
    const [pressed, setPressed] = createSignal(false);
    const [store, { addNotePressed, removeNotePressed }] = useStore() as any;

    return (
        <Show
            when={!pressed()}
            fallback={
                <div
                    class={styles.whiteKeyPressed}
                    on:click={() => {
                        setPressed(false);
                        removeNotePressed(props.note);
                        console.log(store.notesPressed);
                    }}
                >
                    {props.note}
                </div>
            }
        >
            <div
                class={styles.whiteKey}
                on:click={() => {
                    setPressed(true);
                    addNotePressed(props.note);
                    console.log(store.notesPressed);
                }}
            >
                {props.note}
            </div>
        </Show>
    );
};

export default WhiteKey;
