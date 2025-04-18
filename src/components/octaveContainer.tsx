import { Component, createSignal, Show } from "solid-js";
import WhiteKey from "./whiteKey";
import styles from "../App.module.css";

const OctaveContainer: Component<{ octaveIdx: number }> = (props: {
  octaveIdx: number;
}) => {
  return (
    <div>
      <WhiteKey note={`C${props.octaveIdx}`} />
    </div>
  );
};

export default OctaveContainer;
