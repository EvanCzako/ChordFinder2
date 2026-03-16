import type { Component } from "solid-js";
import { StoreProvider, useStore } from "./components/storeProvider";
import PianoComponent from "./components/piano";
import ChordInfoContainer from "./components/chordInfo";
import Controls from "./components/controls";
import styles from "./styles/layout.module.css";

const ClearBar: Component = () => {
	const [, { clearAllNotes }] = useStore();
	return (
		<button class={styles.clearButton} on:click={() => clearAllNotes()}>
			Clear
		</button>
	);
};

const App: Component = () => {
	return (
		<StoreProvider>
			<div class={styles.App}>
				<Controls />
				<ChordInfoContainer />
				<PianoComponent />
				<ClearBar />
			</div>
		</StoreProvider>
	);
};

export default App;
