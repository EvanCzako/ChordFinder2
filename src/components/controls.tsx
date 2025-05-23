import { Component, createSignal, JSXElement, Show } from "solid-js";
import { useStore } from "./storeProvider";
import styles from "../App.module.css";

const doMIDIStuff = () => {
	const navigator = window.navigator;
	let midi = null; // global MIDIAccess object
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
		let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
		let str2 = '';
		for (const character of event.data) {
			str2 += `0x${character.toString(16)} `;
		}
		str += str2;
		if(str2 !== "0xf8 "){
			console.log(event);
			// console.log(str2);
		}
		
	}

	function startLoggingMIDIInput(midiAccess: any) {
		midiAccess.inputs.forEach((entry: any) => {
			entry.onmidimessage = onMIDIMessage;
		});
	}
	navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

}

const Controls: Component<{}> = (props: {}) => {

	const [store, { clearAllNotes, adjustVolume, setMuted, setSharps }] = useStore() as any;
	const [localMuted, setLocalMuted] = createSignal(false);
	const [localSharps, setLocalSharps] = createSignal(true);

	let volumeSlider: HTMLInputElement | undefined;

    return (
		<div>
			<input type="range" ref={volumeSlider} value={100} min={0} max={100} on:input={() => {
				if(volumeSlider){
					adjustVolume(parseFloat(volumeSlider.value) * 0.01);
				}
			}}/>
			<input type="checkbox" on:change={() => {
				setLocalMuted(!localMuted());
				setMuted(localMuted());
			}}/>
			<input type="checkbox" checked={localSharps()} on:change={() => {
				setLocalSharps(!localSharps());
				setSharps(localSharps());
			}}/>
			<button on:click={() => {clearAllNotes();}}>Clear Notes</button>
			<button on:click={() => {doMIDIStuff();}}>MIDI</button>
		</div>
    );
};

export default Controls;
