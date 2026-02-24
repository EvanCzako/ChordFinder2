import { Component } from "solid-js";
import WhiteKey from "./whiteKey";
import BlackKey from "./blackKey";
import styles from "../App.module.css";

const HalfOctaveContainer: Component<{ octaveIdx: number }> = (props) => {
    return (
        <div class={styles.halfOctaveContainer}>
            <div class={styles.halfBlackKeyContainer}>
                <BlackKey note={`F#${props.octaveIdx}`} />
                <BlackKey note={`G#${props.octaveIdx}`} />
                <BlackKey note={`A#${props.octaveIdx}`} />
                <div class={styles.fakeKey}></div>
            </div>
            <div class={styles.whiteKeyContainer}>
                <WhiteKey note={`F${props.octaveIdx}`} />
                <WhiteKey note={`G${props.octaveIdx}`} />
                <WhiteKey note={`A${props.octaveIdx}`} />
                <WhiteKey note={`B${props.octaveIdx}`} />
            </div>
        </div>
    );
};

export default HalfOctaveContainer;
