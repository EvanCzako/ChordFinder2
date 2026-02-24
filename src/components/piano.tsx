import { Component, onCleanup, onMount, For } from "solid-js";
import { createSignal } from "solid-js";
import OctaveContainer from "./octaveContainer";
import HalfOctaveContainer from "./halfOctaveContainer";
import styles from "../App.module.css";

type PianoSegment = { octave: number; half: boolean };

const PianoComponent: Component = (props: {}) => {

	const [width, setWidth] = createSignal(window.innerWidth);

	const updateWidth = () => {
		setWidth(window.innerWidth);
	}

	onMount(() => {
		window.addEventListener('resize', updateWidth);
		onCleanup(() => window.removeEventListener('resize', updateWidth));
	});

	const dispSegments = (): PianoSegment[] => {
		if (width() > 1300) {
			return [{octave:2,half:false},{octave:3,half:false},{octave:4,half:false},{octave:5,half:false}];
		} else if (width() > 1100) {
			return [{octave:2,half:true},{octave:3,half:false},{octave:4,half:false},{octave:5,half:false}];
		} else if (width() > 900) {
			return [{octave:3,half:false},{octave:4,half:false},{octave:5,half:false}];
		} else if (width() > 700) {
			return [{octave:3,half:true},{octave:4,half:false},{octave:5,half:false}];
		} else if (width() > 550) {
			return [{octave:4,half:false},{octave:5,half:false}];
		} else if (width() > 360) {
			return [{octave:4,half:true},{octave:5,half:false}];
		} else {
			return [{octave:5,half:false}];
		}
	}

    return (
        <div class={styles.pianoContainer}>
			<For each={dispSegments()}>
				{(seg) => seg.half
					? <HalfOctaveContainer octaveIdx={seg.octave} />
					: <OctaveContainer octaveIdx={seg.octave} />
				}
			</For>
        </div>
    );
};

export default PianoComponent;
