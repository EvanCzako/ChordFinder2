import { Component, createSignal, Show } from "solid-js";
import { useStore } from "./storeProvider";
import WhiteKey from "./whiteKey";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";

const ChordInfoContainer: Component = (props: {

}) => {

	const [store, { addNotePressed, removeNotePressed }] = useStore() as any;
	const possibleChords = audioUtils.getChordInfo(store.notesPressed);

    return (
        <div class={styles.chordInfo}>
			{store.notesPressed}
			{possibleChords.possibleChords}
        </div>
    );
};

export default ChordInfoContainer;
