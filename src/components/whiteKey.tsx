import { Component, createMemo, Show } from "solid-js";
import { useStore, AppStateType } from "./storeProvider";
import styles from "../App.module.css";

const WhiteKey: Component<{ note: string }> = (props: { note: string }) => {
	const [store, { addNotePressed, removeNotePressed }] = useStore() as [
		AppStateType,
		any,
	];
	const pressed = createMemo(() => {
		return store.notesPressed.includes(props.note);
	});

	const isC = props.note.startsWith("C");

	return (
		<Show
			when={!pressed()}
			fallback={
				<div
					class={styles.whiteKeyPressed}
					on:click={() => {
						removeNotePressed(props.note);
					}}
				>
					<Show when={isC}>
						<span class={styles.octaveLabel}>{props.note}</span>
					</Show>
				</div>
			}
		>
			<div
				class={styles.whiteKey}
				on:click={() => {
					addNotePressed(props.note);
				}}
			>
				<Show when={isC}>
					<span class={styles.octaveLabel}>{props.note}</span>
				</Show>
			</div>
		</Show>
	);
};

export default WhiteKey;
