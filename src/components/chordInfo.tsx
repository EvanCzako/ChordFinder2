import { Component, createSignal, Show } from "solid-js";
import { useStore } from "./storeProvider";
import WhiteKey from "./whiteKey";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";

const ChordInfoContainer: Component = (props: {

}) => {

	const [store, { addNotePressed, removeNotePressed }] = useStore() as any;
	const chordInfo = () => audioUtils.getChordInfo(
		store.notesPressed.map((note: string) => {
			return note.slice(0,note.length-1);
		})
	);
	const mostLikely = () => chordInfo().mostLikely;
	const possibleChords = () => chordInfo().possibleChords;

    return (
        <div class={styles.chordInfo}>
			{store.notesPressed}
			{mostLikely()}
			{possibleChords()}
        </div>
    );
};

export default ChordInfoContainer;
