import { Component, createSignal, JSXElement, Show, onMount, onCleanup, createMemo } from "solid-js";
import { useStore } from "./storeProvider";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";

const Controls: Component<{}> = (props: {}) => {
    const [
        store,
        {
            clearAllNotes,
            adjustVolume,
            setMuted,
            setSharps,
            addNotePressed,
            removeNotePressed,
			setMidiMode
        },
    ] = useStore() as any;
    const [localMuted, setLocalMuted] = createSignal(false);
    const [localSharps, setLocalSharps] = createSignal(true);

    let volumeSlider: HTMLInputElement | undefined;
	let midiCheckbox: HTMLInputElement | undefined;

	const textSize = createMemo(() => {
		console.log(store.dispSize);
		if (store.layoutMode === "portrait"){
			return store.dispSize;
		} else {
			return (store.dispSize**1.2)/3;	
		}
	})

    const doMIDIStuff = () => {
        const navigator = window.navigator;
        let midi: any = null; // global MIDIAccess object
		let initialized: boolean = false;
        function onMIDISuccess(midiAccess: any) {
            console.log("MIDI ready!");
            midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
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
			if(store.midiMode){
				let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
				let str2 = "";
				for (const character of event.data) {
					str2 += `0x${character.toString(16)} `;
				}
				str += str2;
				if (str2 !== "0xf8 ") {
					const note = audioUtils.freqArr[parseInt(event.data.slice(1))];
					const noteVol = parseInt(event.data[2]);
					if (noteVol > 0) {
						addNotePressed(note);
					} else {
						removeNotePressed(note);
					}
				}
			}
        }

        function startLoggingMIDIInput(midiAccess: any) {
            if(!initialized){
				midiAccess.inputs.forEach((entry: any) => {
					entry.onmidimessage = onMIDIMessage;
				});
			}

			initialized = true;
        }
        
		const runMidiStuff = (): void => {
			navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
		}

		const cancelMidiStuff = (): void => {
			// May not be necessary to implement for now
		}

		return {
			runMidiStuff,
			cancelMidiStuff
		}

    };

	const {
		runMidiStuff,
		cancelMidiStuff
	} = doMIDIStuff();


    return (
        <div class={styles.controlsContainer}>
			<div class={styles.controlsText} style={{"font-size": `${textSize()}px`,}}>
				Volume 
				<input class={styles.controlsSlider}
					type="range"
					ref={volumeSlider}
					value={100}
					min={0}
					max={100}
					on:input={() => {
						if (volumeSlider) {
							adjustVolume(parseFloat(volumeSlider.value) * 0.01);
						}
					}}
				/>
			</div>

			<div class={styles.controlsText} style={{"font-size": `${textSize()}px`,}}>
				Muted
				<input style={{"transform": `scale(${store.dispSize/20})`,}} class={styles.controlsCheckbox}
					type="checkbox"
					on:change={() => {
						setLocalMuted(!localMuted());
						setMuted(localMuted());
					}}
				/>
			</div>

			<div class={styles.controlsText} style={{"font-size": `${textSize()}px`,}}>
				Sharps 
				<input style={{"transform": `scale(${store.dispSize/20})`,}} class={styles.controlsCheckbox}
					type="checkbox"
					checked={localSharps()}
					on:change={() => {
						setLocalSharps(!localSharps());
						setSharps(localSharps());
					}}
				/>
			</div>

			<div class={styles.controlsText} style={{"font-size": `${textSize()}px`,}}>
				MIDI 
				<input style={{"transform": `scale(${store.dispSize/20})`,}} class={styles.controlsCheckbox}
					type="checkbox"
					checked={store.midiMode}
					ref={midiCheckbox}
					on:change={() => {
						if(midiCheckbox){
							if(midiCheckbox.checked){
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
			</div>

			<div class={styles.controlsText} style={{"font-size": `${textSize()}px`,}}>
				Clear
				<button on:click={() => clearAllNotes()} class={styles.controlsButton} style={{"font-size": `${store.dispSize/2}px`,}}>X</button>
			</div>

        </div>
    );
};

export default Controls;