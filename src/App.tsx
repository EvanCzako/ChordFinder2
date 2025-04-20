import type {
    Component,
    createSignal,
    createContext,
    useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { StoreProvider } from "./components/storeProvider";
import OctaveContainer from "./components/octaveContainer";
import ChordInfoContainer from "./components/chordInfo";
import styles from "./App.module.css";
import * as audioUtils from "./audioUtils";

const App: Component = () => {

    return (
        <StoreProvider>
            <div class={styles.App}>
				<ChordInfoContainer/>
                <OctaveContainer octaveIdx={4} />
                <OctaveContainer octaveIdx={5} />
            </div>
        </StoreProvider>
    );
};

export default App;
