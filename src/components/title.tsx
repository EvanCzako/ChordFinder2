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
			{/* <div style={{"font-size": `${store.dispSize*2}px`,}} class={styles.titleName}>ChordFinder</div>
			<div style={{"font-size": `${store.dispSize}px`,}} class={styles.authorName}>by Evan Czako</div> */}
			<img class={styles.image} src={MyImage} alt="" />
		</div>
	);
};

export default Title;
