import { Component, createSignal, Show } from "solid-js";
import WhiteKey from "./whiteKey";
import BlackKey from "./blackKey";
import styles from "../App.module.css";

const OctaveContainer: Component<{ octaveIdx: number }> = (props: {
    octaveIdx: number;
}) => {
    return (
        <div class={styles.octaveContainer}>
			<div class={styles.blackKeyContainer}>
				<BlackKey note={`C#${props.octaveIdx}`} />
				<BlackKey note={`D#${props.octaveIdx}`} />
				<div class={styles.fakeKey} id="E#"></div>
				<BlackKey note={`F#${props.octaveIdx}`} />
				<BlackKey note={`G#${props.octaveIdx}`} />
				<BlackKey note={`A#${props.octaveIdx}`} />
				<div class={styles.fakeKey} id="B#"></div>
			</div>
			<div class={styles.whiteKeyContainer}>
				<WhiteKey note={`C${props.octaveIdx}`} />
				<WhiteKey note={`D${props.octaveIdx}`} />
				<WhiteKey note={`E${props.octaveIdx}`} />
				<WhiteKey note={`F${props.octaveIdx}`} />
				<WhiteKey note={`G${props.octaveIdx}`} />
				<WhiteKey note={`A${props.octaveIdx}`} />
				<WhiteKey note={`B${props.octaveIdx}`} />
			</div>
        </div>
    );
};

export default OctaveContainer;
