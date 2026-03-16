import { Component, createSignal, createMemo } from "solid-js";
import { useStore } from "./storeProvider";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";
import MyImage from "../assets/ChordFinder.png";

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
	const [localMuted, setLocalMuted] = createSignal(false);
	const [localSharps, setLocalSharps] = createSignal(true);

	let volumeSlider: HTMLInputElement | undefined;
	let midiCheckbox: HTMLInputElement | undefined;

	const textSize = createMemo(() => store.dispSize);

	const doMIDIStuff = () => {
		const navigator = window.navigator;
		let midi: any = null;
		let initialized: boolean = false;

		function onMIDISuccess(midiAccess: any) {
			console.log("MIDI ready!");
			midi = midiAccess;
			listInputsAndOutputs(midi);
			startLoggingMIDIInput(midi);
		}

		function onMIDIFailure(msg: any) {
			console.error(`Failed to get MIDI access - ${msg}`);
		}

		function listInputsAndOutputs(midiAccess: any) {
			for (const entry of midiAccess.inputs) {
				const input = entry[1];
				console.log(
					`Input port [type:'${input.type}']` +
						` id:'${input.id}'` +
						` manufacturer:'${input.manufacturer}'` +
						` name:'${input.name}'` +
						` version:'${input.version}'`,
				);
			}
			for (const entry of midiAccess.outputs) {
				const output = entry[1];
				console.log(
					`Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`,
				);
			}
		}

		function onMIDIMessage(event: any) {
			if (store.midiMode) {
				if (!event.data || event.data.length < 3) return;
				let str2 = "";
				for (const character of event.data) {
					str2 += `0x${character.toString(16)} `;
				}
				if (str2 !== "0xf8 ") {
					const note = audioUtils.freqArr[event.data[1]];
					const noteVol = event.data[2];
					if (
						note !== undefined &&
						noteVol > 0 &&
						event.data[0] === 144
					) {
						addNotePressed(note);
					} else if (
						note !== undefined &&
						(event.data[0] === 128 || noteVol === 0)
					) {
						removeNotePressed(note);
					}
				}
			}
		}

		function startLoggingMIDIInput(midiAccess: any) {
			if (!initialized) {
				midiAccess.inputs.forEach((entry: any) => {
					entry.onmidimessage = onMIDIMessage;
				});
			}
			initialized = true;
		}

		const runMidiStuff = (): void => {
			navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
		};

		const cancelMidiStuff = (): void => {
			if (midi) {
				midi.inputs.forEach((entry: any) => {
					entry.onmidimessage = null;
				});
			}
			initialized = false;
		};

		return { runMidiStuff, cancelMidiStuff };
	};

	const { runMidiStuff, cancelMidiStuff } = doMIDIStuff();

	return (
		<div class={styles.controlsContainer}>
			<a
				href="https://evanczako.github.io/DoughLab2/"
				target="_blank"
				rel="noopener noreferrer"
				class={styles.controlsLogoLink}
			>
				<img class={styles.controlsLogo} src={MyImage} alt="DoughLab" />
			</a>
			<div class={styles.controlsGrid}>
				<div
					class={styles.controlsText}
					style={{ "font-size": `${textSize()}px` }}
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
					style={{ "font-size": `${textSize()}px` }}
				>
					<span>Muted</span>
					<label class={styles.toggleSwitch}>
						<input
							type="checkbox"
							on:change={() => {
								setLocalMuted(!localMuted());
								setMuted(localMuted());
							}}
						/>
						<span class={styles.toggleKnob}></span>
					</label>
				</div>

				<div
					class={styles.controlsText}
					style={{ "font-size": `${textSize()}px` }}
				>
					<span>Sharps</span>
					<label class={styles.toggleSwitch}>
						<input
							type="checkbox"
							checked={localSharps()}
							on:change={() => {
								setLocalSharps(!localSharps());
								setSharps(localSharps());
							}}
						/>
						<span class={styles.toggleKnob}></span>
					</label>
				</div>

				<div
					class={styles.controlsText}
					style={{ "font-size": `${textSize()}px` }}
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
