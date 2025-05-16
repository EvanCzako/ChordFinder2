import { Component, createSignal, JSXElement, Show } from "solid-js";
import { useStore } from "./storeProvider";
import styles from "../App.module.css";

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
		</div>
    );
};

export default Controls;
