import { Component, createMemo, Show } from "solid-js";
import { useStore } from "./storeProvider";
import styles from "../styles/piano.module.css";

const BlackKey: Component<{ note: string }> = (props) => {
	const [store, { addNotePressed, removeNotePressed }] = useStore();
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

export default BlackKey;
