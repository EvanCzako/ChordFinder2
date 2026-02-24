import type {
    Component,
    createSignal,
    createContext,
    useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { StoreProvider, useStore } from "./components/storeProvider";
import PianoComponent from "./components/piano";
import ChordInfoContainer from "./components/chordInfo";
import Controls from "./components/controls";
import styles from "./App.module.css";
import * as audioUtils from "./audioUtils";

const ClearBar: Component = () => {
    const [, { clearAllNotes }] = useStore() as any;
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
