import { createContext, useContext, onMount, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import * as audioUtils from "../audioUtils";

export type AppStateType = {
	notesPressed: string[];
	sharps: boolean;
	volume: number;
	muted: boolean;
	midiMode: boolean;
	dispSize: number;
	layoutMode: string;
};

export type StoreActions = {
	addNotePressed: (note: string) => void;
	removeNotePressed: (note: string) => void;
	clearAllNotes: () => void;
	adjustVolume: (volume: number) => void;
	setMuted: (muted: boolean) => void;
	setSharps: (sharps: boolean) => void;
	setMidiMode: (midiMode: boolean) => void;
};

type StoreContextType = [AppStateType, StoreActions];

const StoreContext = createContext<StoreContextType>();

export function StoreProvider(props: any) {
	const [appState, setAppState] = createStore<AppStateType>({
		notesPressed: [],
		sharps: true,
		volume: 0.2,
		muted: false,
		midiMode: false,
		dispSize: 0,
		layoutMode: "landscape",
	});

	const addNotePressed = (note: string) => {
		const newNotesPressed = [...appState.notesPressed, note];
		setAppState({ notesPressed: newNotesPressed });
		audioUtils.refreshAudio(
			newNotesPressed,
			appState.volume,
			appState.muted,
		);
	};

	const removeNotePressed = (note: string) => {
		let newNotesPressed = appState.notesPressed;
		if (appState.notesPressed.includes(note)) {
			const noteIdx = appState.notesPressed.indexOf(note);
			newNotesPressed = [
				...appState.notesPressed.slice(0, noteIdx),
				...appState.notesPressed.slice(noteIdx + 1),
			];
			setAppState({ notesPressed: newNotesPressed });
		}
		audioUtils.refreshAudio(
			newNotesPressed,
			appState.volume,
			appState.muted,
		);
	};

	const clearAllNotes = () => {
		setAppState({ notesPressed: [] });
		audioUtils.refreshAudio([], appState.volume, appState.muted);
	};

	const adjustVolume = (volume: number) => {
		setAppState("volume", volume);
		audioUtils.refreshVolume(volume, appState.muted);
	};

	const setMuted = (muted: boolean) => {
		setAppState("muted", muted);
		audioUtils.refreshVolume(appState.volume, muted);
	};

	const setSharps = (sharps: boolean) => {
		setAppState("sharps", sharps);
	};

	const setMidiMode = (midiMode: boolean) => {
		setAppState("midiMode", midiMode);
	};

	const applySize = () => {
		const vw = (window.visualViewport?.width ?? window.innerWidth) / 100;
		const vh = (window.visualViewport?.height ?? window.innerHeight) / 100;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		document.documentElement.style.setProperty("--vw", `${vw}px`);
		const layoutMode = vw >= vh ? "landscape" : "portrait";
		const product = Math.sqrt(vh ** 2 * Math.min(3, vw / vh));
		setAppState({ dispSize: product * 3, layoutMode });
	};

	let resizeTimer: ReturnType<typeof setTimeout> | undefined;
	const updateSize = () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(applySize, 50);
	};

	onMount(() => {
		applySize();
		window.addEventListener("resize", updateSize);
		onCleanup(() => {
			window.removeEventListener("resize", updateSize);
			clearTimeout(resizeTimer);
		});
	});

	const store: StoreContextType = [
		appState,
		{
			addNotePressed,
			removeNotePressed,
			clearAllNotes,
			adjustVolume,
			setMuted,
			setSharps,
			setMidiMode,
		},
	];

	return (
		<StoreContext.Provider value={store}>
			{props.children}
		</StoreContext.Provider>
	);
}

export function useStore(): StoreContextType {
	return useContext(StoreContext)!;
}
