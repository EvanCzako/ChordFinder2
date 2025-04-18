import { Component, createSignal, createContext, useContext  } from "solid-js";
import { createStore } from "solid-js/store";

const StoreContext = createContext();

export function StoreProvider(props: any) {
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

	const store = [
		appState,
		{
			addNotePressed,
			removeNotePressed
		}
	]

	return (
	  <StoreContext.Provider value={store}>
		{props.children}
	  </StoreContext.Provider>
	);
  }
  
  export function useStore() { return useContext(StoreContext); }