import type { Component, createSignal, createContext, useContext  } from "solid-js";
import { createStore } from "solid-js/store";
import { StoreProvider } from "./components/storeProvider";
import OctaveContainer from "./components/octaveContainer";
import styles from "./App.module.css";

const App: Component = () => {

	return (
		<StoreProvider>
			<div class={styles.App}>
				<OctaveContainer octaveIdx={4} />
				<OctaveContainer octaveIdx={5} />
			</div>
		</StoreProvider>
	);
};

export default App;
