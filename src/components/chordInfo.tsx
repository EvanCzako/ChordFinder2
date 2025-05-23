import { Component, createSignal, createMemo, Show, For } from "solid-js";
import { useStore } from "./storeProvider";
import WhiteKey from "./whiteKey";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";

const ChordInfoContainer: Component = (props: {}) => {
    const [store, { addNotePressed, removeNotePressed }] = useStore() as any;
    const chordInfo = createMemo(() =>
        audioUtils.getChordInfo(store.notesPressed, !store.sharps),
    );
    const displayNotes = createMemo(() => {
        let notes = store.sharps ? store.notesPressed : store.notesPressedFlats;
        const dispNotes = notes
            .map((note: string) => note + ",")
            .join(" ")
            .slice(0, -1);
        return dispNotes;
    });
    const mostLikely = () => chordInfo().mostLikely;
    const possibleChords = () => chordInfo().possibleChords;

    return (
        <div class={styles.chordInfo}>
			<Show when={displayNotes().length > 0}>
				Notes pressed:
				<div>{displayNotes()}</div>
			</Show>
			<Show when={mostLikely()}>
				<div class={styles.mostLikely}>Most Likely: {mostLikely()}</div>
			</Show>
			<Show when={possibleChords().length > 0}>
				<div class={styles.possibleChords}>
					Possible chords:
					<For each={possibleChords()}>
						{(chord, i) => <div>{chord}</div>}
					</For>
				</div>
			</Show>

        </div>
    );
};

export default ChordInfoContainer;
