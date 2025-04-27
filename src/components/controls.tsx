import { Component, createSignal, JSXElement, Show } from "solid-js";
import { useStore } from "./storeProvider";
import styles from "../App.module.css";

const Controls: Component<{}> = (props: {}) => {

	const [store, { addNotePressed, removeNotePressed, adjustVolume }] = useStore() as any;

	let volumeSlider: HTMLInputElement | undefined;

    return (
		<div>
			<input type="range" ref={volumeSlider} value={100} min={0} max={100} on:input={() => {
				if(volumeSlider){
					adjustVolume(parseFloat(volumeSlider.value) * 0.01)
					console.log(store);
				}
			}}/>
		</div>
    );
};

export default Controls;
