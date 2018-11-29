import React from "react";
import { observer, inject } from "mobx-react";
import "./FormattedTime.css";

// This is a function component. It has no internal state. It renders only what it received as properties.
// The only way to update it, is to change its properties.
// * We're passing in a MobX store with an observable "time" property. But, this component actually doesn't need it to
//   be a MobX store at all. As long as an object with a time property is passed in, this component will work, if only
//   statically.
function FormattedTime({ clock }) {
  return (
    <React.Fragment>
      <span className="formattedtime-label">Current Time = </span>
      <span className="formattedtime-value">{clock ? clock.time : "-"}</span>
    </React.Fragment>
  );
}

// Decorate the component before export using the observer() decorator which is provided by mobx-react.
// * The observer decorator modifies the component so that it re-renders if a referenced observable changes.
export default inject("clock")(observer(FormattedTime));