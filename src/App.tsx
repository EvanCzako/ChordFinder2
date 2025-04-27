import type {
    Component,
    createSignal,
    createContext,
    useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { StoreProvider } from "./components/storeProvider";
import PianoComponent from "./components/piano";
import ChordInfoContainer from "./components/chordInfo";
import Controls from "./components/controls";
import styles from "./App.module.css";
import * as audioUtils from "./audioUtils";

const App: Component = () => {

    return (
        <StoreProvider>
            <div class={styles.App}>
				<Controls/>
				<PianoComponent/>
				<ChordInfoContainer/>
            </div>
        </StoreProvider>
    );
};

export default App;
