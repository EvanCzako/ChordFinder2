import { Component, createSignal, Show, For } from "solid-js";
import { useStore } from "./storeProvider";
import WhiteKey from "./whiteKey";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";

const ChordInfoContainer: Component = (props: {

}) => {

	const [store, { addNotePressed, removeNotePressed }] = useStore() as any;
	const chordInfo = () => audioUtils.getChordInfo(
		store.notesPressed
	);
	const mostLikely = () => chordInfo().mostLikely;
	const possibleChords = () => chordInfo().possibleChords;

    return (
        <div class={styles.chordInfo}>
			<div>{store.notesPressed}</div>
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
