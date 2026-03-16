import { Component, createMemo, Show, For } from "solid-js";
import { useStore } from "./storeProvider";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";

const ChordInfoContainer: Component = () => {
	const [store] = useStore();
	const chordInfo = createMemo(() =>
		audioUtils.getChordInfo(store.notesPressed, !store.sharps),
	);
	const displayNotes = createMemo(() => {
		const notes = store.sharps
			? store.notesPressed
			: store.notesPressed.map((n: string) =>
					audioUtils.getFlatFromSharp(n),
				);
		const dispNotes = notes
			.map((note: string) => note + ",")
			.join(" ")
			.slice(0, -1);
		return dispNotes;
	});
	const mostLikely = () => chordInfo().mostLikely;
	const possibleChords = () => chordInfo().possibleChords;
	const possibleChordsDispText = () => {
		if (possibleChords().length > 0) {
			if (mostLikely()) {
				return "Other possible chords:";
			}
			return "Possible chords:";
		}
		return "";
	};
	const textSize = () => store.dispSize * 0.75;

	return (
		<div class={styles.chordInfo}>
			<div
				style={{ "font-size": `${textSize()}px` }}
				class={styles.chordContent}
			>
				<div class={styles.notesContainer}>
					<Show when={displayNotes().length > 0}>
						<div>Notes pressed: {displayNotes()}</div>
					</Show>
				</div>

				<div class={styles.chordContainer}>
					<Show when={mostLikely()}>
						<div
							class={styles.mostLikely}
							style={{ "font-size": `${textSize() * 1.2}px` }}
						>
							<span class={styles.chordLabel}>Most Likely:</span>
							<div>{mostLikely()}</div>
						</div>
					</Show>
					<Show when={possibleChords().length > 0}>
						<div
							class={styles.possibleChords}
							style={{ "font-size": `${textSize() * 1.2}px` }}
						>
							<span class={styles.chordLabel}>
								{possibleChordsDispText()}
							</span>
							<For each={possibleChords()}>
								{(chord) => <div>{chord}</div>}
							</For>
						</div>
					</Show>
				</div>
			</div>
		</div>
	);
};

export default ChordInfoContainer;
