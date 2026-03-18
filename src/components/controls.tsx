import { Component } from "solid-js";
import { useStore } from "./storeProvider";
import * as audioUtils from "../audioUtils";
import styles from "../styles/controls.module.css";
import MyImage from "../assets/ChordFinder-downSaturated.png";

const Controls: Component = () => {
	const [
		store,
		{
			clearAllNotes,
			adjustVolume,
			setMuted,
			setSharps,
			addNotePressed,
			removeNotePressed,
			setMidiMode,
		},
	] = useStore();
	let volumeSlider: HTMLInputElement | undefined;
	let midiCheckbox: HTMLInputElement | undefined;

	const doMIDIStuff = () => {
		let midi: any = null;

		function onMIDISuccess(midiAccess: any) {
			console.log("MIDI ready!");
			midi = midiAccess;
			attachHandlers();
			midi.onstatechange = attachHandlers;
		}

		function onMIDIFailure(msg: any) {
			console.error(`Failed to get MIDI access - ${msg}`);
		}

		function onMIDIMessage(event: any) {
			if (!event.data || event.data.length < 3) return;
			if (event.data[0] === 0xf8) return; // MIDI timing clock
			const note = audioUtils.freqArr[event.data[1]];
			const noteVol = event.data[2];
			if (note !== undefined && noteVol > 0 && event.data[0] === 144) {
				addNotePressed(note);
			} else if (
				note !== undefined &&
				(event.data[0] === 128 || noteVol === 0)
			) {
				removeNotePressed(note);
			}
		}

		function attachHandlers() {
			if (midi) {
				midi.inputs.forEach((entry: any) => {
					entry.onmidimessage = onMIDIMessage;
				});
			}
		}

		const runMidiStuff = (): void => {
			window.navigator
				.requestMIDIAccess()
				.then(onMIDISuccess, onMIDIFailure);
		};

		const cancelMidiStuff = (): void => {
			if (midi) {
				midi.onstatechange = null;
				midi.inputs.forEach((entry: any) => {
					entry.onmidimessage = null;
				});
			}
		};

		return { runMidiStuff, cancelMidiStuff };
	};

	const { runMidiStuff, cancelMidiStuff } = doMIDIStuff();

	return (
		<div class={styles.controlsContainer}>
			<div class={styles.logoRow}>
				<img class={styles.controlsLogo} src={MyImage} alt="ChordFinder" />
				<a
					href="https://evanczako.github.io/DoughLab2/"
					target="_blank"
					rel="noopener noreferrer"
					class={styles.backLink}
				>
					Back to Dough's Lab
				</a>
			</div>
			<div class={styles.controlsGrid}>
				<div
					class={styles.controlsText}
					style={{ "font-size": `${store.dispSize}px` }}
				>
					<span>Volume</span>
					<input
						class={styles.controlsSlider}
						type="range"
						ref={volumeSlider}
						value={store.volume * 100}
						min={0}
						max={100}
						on:input={() => {
							if (volumeSlider) {
								adjustVolume(
									parseFloat(volumeSlider.value) * 0.01,
								);
							}
						}}
					/>
				</div>

				<div
					class={styles.controlsText}
					style={{ "font-size": `${store.dispSize}px` }}
				>
					<span>Muted</span>
					<label class={styles.toggleSwitch}>
						<input
							type="checkbox"
							checked={store.muted}
							on:change={() => {
								setMuted(!store.muted);
							}}
						/>
						<span class={styles.toggleKnob}></span>
					</label>
				</div>

				<div
					class={styles.controlsText}
					style={{ "font-size": `${store.dispSize}px` }}
				>
					<span>Sharps</span>
					<label class={styles.toggleSwitch}>
						<input
							type="checkbox"
							checked={store.sharps}
							on:change={() => {
								setSharps(!store.sharps);
							}}
						/>
						<span class={styles.toggleKnob}></span>
					</label>
				</div>

				<div
					class={styles.controlsText}
					style={{ "font-size": `${store.dispSize}px` }}
				>
					<span>MIDI</span>
					<label class={styles.toggleSwitch}>
						<input
							type="checkbox"
							checked={store.midiMode}
							ref={midiCheckbox}
							on:change={() => {
								if (midiCheckbox) {
									if (midiCheckbox.checked) {
										setMidiMode(true);
										clearAllNotes();
										runMidiStuff();
									} else {
										setMidiMode(false);
										cancelMidiStuff();
										clearAllNotes();
									}
								}
							}}
						/>
						<span class={styles.toggleKnob}></span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Controls;
