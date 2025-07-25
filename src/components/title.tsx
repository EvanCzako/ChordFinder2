import { Component, createSignal, JSXElement, Show, onMount, onCleanup } from "solid-js";
import { useStore } from "./storeProvider";
import * as audioUtils from "../audioUtils";
import styles from "../App.module.css";
import MyImage from "../assets/ChordFinder.png";

const Title: Component<{}> = (props: {}) => {

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

    return (
		<div class={styles.titleContainer}>
			<img class={styles.image} src={MyImage} alt="" />
			<a href="https://evanczako.github.io/DoughLab2/" target="_blank" style={{"font-size": `${store.dispSize*0.6}px`,}} class={styles.doughLabLink}>by Evan Czako (more here)</a>
			
		</div>
	);
};

export default Title;
