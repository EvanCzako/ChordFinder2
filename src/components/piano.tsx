import { Component, createSignal, Show, onCleanup, onMount, For } from "solid-js";
import OctaveContainer from "./octaveContainer";
import styles from "../App.module.css";


const PianoComponent: Component = (props: {}) => {

	const [width, setWidth] = createSignal(window.innerWidth);

	const updateWidth = () => {
		setWidth(window.innerWidth);
	}

	onMount(() => {
		window.addEventListener('resize', updateWidth);
		onCleanup(() => window.removeEventListener('resize', updateWidth));
	});

	const dispOctaves = () => {
		if( width() > 1300) {
			return [2,3,4,5];
		} else if (width() > 900 && width() <= 1300){
			return [3,4,5];
		} else {
			return [4,5];
		}
	}

    return (
        <div class={styles.pianoContainer}>
			<For each={dispOctaves()}>
				{(octaveIdx) => <OctaveContainer octaveIdx={octaveIdx} />}
			</For>
        </div>
    );
};

export default PianoComponent;
