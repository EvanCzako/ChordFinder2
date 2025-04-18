import type { Component, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import WhiteKey from "./components/whiteKey";
import OctaveContainer from "./components/octaveContainer";
import styles from "./App.module.css";

const App: Component = () => {

	const [appState, setAppState] = createStore<{notesPressed: string[]}>({
		notesPressed: [],
	});

	const addNotePressed = (note: string) => {
		setAppState({
			...appState,
			notesPressed: [...appState.notesPressed, note]
		});
	}

	const removeNotePressed = (note: string) => {
		if(appState.notesPressed.includes(note)){
			const noteIdx = appState.notesPressed.indexOf(note);
			setAppState({
				...appState,
				notesPressed: [
					...appState.notesPressed.slice(0,noteIdx),
					...appState.notesPressed.slice(noteIdx+1)
				]
			});
		}
	};

	return (
		<div class={styles.App}>
			<OctaveContainer octaveIdx={4} />
			<OctaveContainer octaveIdx={5} />
		</div>
	);
};

export default App;
