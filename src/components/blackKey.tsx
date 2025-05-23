import { Component, createSignal, createMemo, Show } from "solid-js";
import { useStore, AppStateType } from "./storeProvider";
import styles from "../App.module.css";

const blackKey: Component<{ note: string }> = (props: { note: string }) => {
    const [store, { addNotePressed, removeNotePressed }] = useStore() as [
        AppStateType,
        any,
    ];
    const pressed = createMemo(() => {
        return store.notesPressed.includes(props.note);
    });

    return (
        <Show
            when={!pressed()}
            fallback={
                <div
                    class={styles.blackKeyPressed}
                    on:click={() => {
                        removeNotePressed(props.note);
                    }}
                ></div>
            }
        >
            <div
                class={styles.blackKey}
                on:click={() => {
                    addNotePressed(props.note);
                }}
            ></div>
        </Show>
    );
};

export default blackKey;
