import React from "react";
import { inject, observer } from "mobx-react";
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

// We're now wrapping the component before export, using the inject() and observer() HOCs (high order components) which
// are provided by mobx-react.
// * The observer HOC rerenders the component if a consumed observable changes.
// * The inject HOC passes the store by name, provided by a parent mobx-react <Provider> component, to the component as
//   a property with the same name. This is why the FormattedTime component above accepts a "clock" property.
export default inject("clock")(observer(FormattedTime));