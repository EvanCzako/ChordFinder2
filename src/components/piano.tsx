import { Component, createSignal, Show, onCleanup, onMount, For } from "solid-js";
import OctaveContainer from "./octaveContainer";
import styles from "../App.module.css";


const PianoComponent: Component = (props: {}) => {

	const [width, setWidth] = createSignal(window.innerWidth);

	const updateWidth = () => {
		setWidth(window.innerWidth);
		console.log(dispOctaves());
	}

	onMount(() => {
		window.addEventListener('resize', updateWidth);
		onCleanup(() => window.removeEventListener('resize', updateWidth));
	});

	const isSmall = () => width() < 1000; //  "small" threshold
	const dispOctaves = () => isSmall() ? [4,5] : [2,3,4,5]

    return (
        <div class={styles.pianoContainer}>
			<For each={dispOctaves()}>
				{(octaveIdx) => <OctaveContainer octaveIdx={octaveIdx} />}
			</For>
        </div>
    );
};

export default PianoComponent;
