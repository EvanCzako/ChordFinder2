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
	const possibleChordsDispText = () => {
		if (possibleChords().length > 0){
			if (mostLikely()){
				return "Other possible chords:"
			}
			return "Possible chords:"
		}
		return "";
	}

    return (
        <div style={{"font-size": `${store.dispSize}px`,}} class={styles.chordInfo}>
			<div class={styles.notesContainer}>
				<Show when={displayNotes().length > 0}>
					<div>Notes pressed: {displayNotes()}</div>
				</Show>
			</div>

			<div class={styles.chordContainer}>
				<Show when={mostLikely()}>
					<div class={styles.mostLikely} style={{"font-size": `${store.dispSize*1.2}px`,}}>Most Likely: {mostLikely()}</div>
				</Show>
				<Show when={possibleChords().length > 0}>
					<div class={styles.possibleChords} style={{"font-size": `${store.dispSize}px`,}}>
						{possibleChordsDispText()}
						<For each={possibleChords()}>
							{(chord, i) => <div>{chord}</div>}
						</For>
					</div>
				</Show>
			</div>


        </div>
    );
};

export default ChordInfoContainer;
