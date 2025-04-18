import { Component, createSignal, Show } from "solid-js";
import WhiteKey from "./whiteKey";
import styles from "../App.module.css";

const OctaveContainer: Component<{ octaveIdx: number }> = (props: {
    octaveIdx: number;
}) => {
    return (
        <div>
            <WhiteKey note={`C${props.octaveIdx}`} />
			<WhiteKey note={`D${props.octaveIdx}`} />
			<WhiteKey note={`E${props.octaveIdx}`} />
			<WhiteKey note={`F${props.octaveIdx}`} />
			<WhiteKey note={`G${props.octaveIdx}`} />
			<WhiteKey note={`A${props.octaveIdx}`} />
			<WhiteKey note={`B${props.octaveIdx}`} />
        </div>
    );
};

export default OctaveContainer;
