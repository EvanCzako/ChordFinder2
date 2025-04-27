import { Component, createSignal, JSXElement, Show } from "solid-js";
import { useStore } from "./storeProvider";
import styles from "../App.module.css";

const Controls: Component<{}> = (props: {}) => {

	const [store, { addNotePressed, removeNotePressed, adjustVolume, setMuted }] = useStore() as any;
	const [localMuted, setLocalMuted] = createSignal(false);

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
		</div>
    );
};

export default Controls;
