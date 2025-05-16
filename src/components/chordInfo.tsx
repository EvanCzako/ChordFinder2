import { Component, createSignal, createMemo, Show, For } from "solid-js";
import { useStore } from "./storeProvider";
import WhiteKey from "./whiteKey";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";

const ChordInfoContainer: Component = (props: {

}) => {

	const [store, { addNotePressed, removeNotePressed }] = useStore() as any;
	const chordInfo = createMemo(() => audioUtils.getChordInfo(
		store.notesPressed,
		!store.sharps
	));
	const displayNotes = createMemo(() => {
		let notes = [];
		if(store.sharps){
			return store.notesPressed;
		} else {
			return store.notesPressedFlats;
		}
	})
	const mostLikely = () => chordInfo().mostLikely;
	const possibleChords = () => chordInfo().possibleChords;

    return (
        <div class={styles.chordInfo}>
			<div>{displayNotes()}</div>
			<div>{mostLikely()}</div>
			<For each={possibleChords()}>{(chord, i) =>
				<div>
					{chord}
				</div>
			}</For>
        </div>
    );
};

export default ChordInfoContainer;
