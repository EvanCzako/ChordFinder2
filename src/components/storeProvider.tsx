import { Component, createSignal, createContext, useContext, onMount, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import * as audioUtils from "../audioUtils";
import App from "../App";
const StoreContext = createContext();

export type AppStateType = {
    notesPressed: string[];
    notesPressedFlats: string[];
    chordInfo: {
        mostLikely?: string;
        possibleChords: string[];
    };
    sharps: boolean;
    volume: number;
    muted: boolean;
	midiMode: boolean;
	dispSize: number;
	layoutMode: string;
};

export function StoreProvider(props: any) {
    const [appState, setAppState] = createStore<AppStateType>({
        notesPressed: [],
        notesPressedFlats: [],
        chordInfo: {
            possibleChords: [],
        },
        sharps: true,
        volume: 1,
        muted: false,
		midiMode: false,
		dispSize: 0,
		layoutMode: "landscape"
    });

    const addNotePressed = (note: string) => {
        setAppState({
            ...appState,
            notesPressed: [...appState.notesPressed, note],
            notesPressedFlats: [
                ...appState.notesPressedFlats,
                audioUtils.getFlatFromSharp(note),
            ],
        });
        audioUtils.refreshAudio(
            appState.notesPressed,
            appState.volume,
            appState.muted,
        );
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
                notesPressedFlats: [
                    ...appState.notesPressedFlats.slice(0, noteIdx),
                    ...appState.notesPressedFlats.slice(noteIdx + 1),
                ],
            });
        }
        audioUtils.refreshAudio(
            appState.notesPressed,
            appState.volume,
            appState.muted,
        );
    };

    const clearAllNotes = () => {
        setAppState({
            ...appState,
            notesPressed: [],
            notesPressedFlats: [],
        });
        audioUtils.refreshAudio(
            appState.notesPressed,
            appState.volume,
            appState.muted,
        );
    };

    const adjustVolume = (volume: number) => {
        setAppState({
            ...appState,
            volume,
        });
        audioUtils.refreshVolume(appState.volume, appState.muted);
    };

    const setMuted = (muted: boolean) => {
        setAppState({
            ...appState,
            muted,
        });
        audioUtils.refreshVolume(appState.volume, appState.muted);
    };

    const setSharps = (sharps: boolean) => {
        setAppState({
            ...appState,
            sharps,
        });
    };

	const setMidiMode = (midiMode: boolean) => {
		setAppState({
			...appState,
			midiMode
		})
	}

	const updateSize = () => {
		const vw = (window.visualViewport?.width ?? window.innerWidth) / 100;
		const vh = (window.visualViewport?.height ?? window.innerHeight) / 100;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		document.documentElement.style.setProperty('--vw', `${vw}px`);
		const layoutMode = vw >= vh ? "landscape" : "portrait";
		const product = Math.sqrt(vh**2 * Math.min(3,(vw/vh)));
		setAppState({
			...appState,
			dispSize: product*3,
			layoutMode
		});
	};

	onMount(() => {
		updateSize();
		window.addEventListener("resize", updateSize);
		onCleanup(() => window.removeEventListener("resize", updateSize));
	});

    const store = [
        appState,
        {
            addNotePressed,
            removeNotePressed,
            clearAllNotes,
            adjustVolume,
            setMuted,
            setSharps,
			setMidiMode
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
