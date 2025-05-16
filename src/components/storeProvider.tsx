import { Component, createSignal, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import * as audioUtils from "../audioUtils";
const StoreContext = createContext();

export type AppStateType = {
	notesPressed: string[],
	chordInfo: {
		mostLikely?: string,
		possibleChords: string[]
	},
	sharps: boolean,
	volume: number,
	muted: boolean
}

export function StoreProvider(props: any) {
    const [appState, setAppState] = createStore<AppStateType>({
        notesPressed: [],
		chordInfo: {
			possibleChords: []
		},
		sharps: true,
		volume: 1,
		muted: false
    });

    const addNotePressed = (note: string) => {
        setAppState({
            ...appState,
            notesPressed: [...appState.notesPressed, note],
        });
		audioUtils.refreshAudio(appState.notesPressed, appState.volume, appState.muted);
    };

    const removeNotePressed = (note: string) => {
        if (appState.notesPressed.includes(note)) {
            const noteIdx = appState.notesPressed.indexOf(note);
            setAppState({
                ...appState,
                notesPressed: [
                    ...appState.notesPressed.slice(0, noteIdx),
                    ...appState.notesPressed.slice(noteIdx + 1),
                ],
            });
        }
		audioUtils.refreshAudio(appState.notesPressed, appState.volume, appState.muted);
    };

	const clearAllNotes = () => {
		setAppState({
			...appState,
			notesPressed: []
		});
		audioUtils.refreshAudio(appState.notesPressed, appState.volume, appState.muted);
	}

	const adjustVolume = (volume: number) => {
		setAppState({
			...appState,
			volume
		});
		audioUtils.refreshVolume(appState.volume, appState.muted);
	}

	const setMuted = (muted: boolean) => {
		setAppState({
			...appState,
			muted
		});
		audioUtils.refreshVolume(appState.volume, appState.muted)
	}

    const store = [
        appState,
        {
            addNotePressed,
            removeNotePressed,
			clearAllNotes,
			adjustVolume,
			setMuted
        },
    ];

    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    return useContext(StoreContext);
}
