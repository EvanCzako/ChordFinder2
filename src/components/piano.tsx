import { Component, createSignal, Show } from "solid-js";
import OctaveContainer from "./octaveContainer";
import styles from "../App.module.css";

const PianoComponent: Component = (props: {}) => {
    return (
        <div class={styles.pianoContainer}>
			<OctaveContainer octaveIdx={2} />
            <OctaveContainer octaveIdx={3} />
            <OctaveContainer octaveIdx={4} />
            <OctaveContainer octaveIdx={5} />
        </div>
    );
};

export default PianoComponent;
