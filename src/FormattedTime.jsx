import React from "react";
import moment from "moment";
import Clock from "./Clock";
import "./FormattedTime.css";

// This is a function component. It has no internal state. It renders only what it received as properties and context.
// The only way to update it, is to change its properties or context.
function FormattedTime({ format = "h:mm:ss a" }) {
  return (
    <React.Fragment>
      <span className="formattedtime-label">Current Time = </span>
      <span className="formattedtime-value">
        {/* 
          * Consumers accept a function callback as their "children". This callback is passed the context value, and
          * should return the actual children. In this case, it's returning the formatted time string given the context
          * timestamp value.
          */}
        <Clock.Consumer>{(timestamp) => moment(timestamp).format(format)}</Clock.Consumer>
      </span>
    </React.Fragment>
  );
}

export default FormattedTime;