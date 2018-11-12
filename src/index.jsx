import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

// Rendering once immediately.
render();

// Rendering repeatedly on a 1 second interval.
setInterval(() => {
  render();
}, 1000);

function render() {
  // Using the "moment" module to format the current time.
  const timeString = moment().format("h:mm:ss a");

  ReactDOM.render(
    // Using a fragment to render more than two top level nodes.
    <React.Fragment>
      <span>Current Time = </span>{timeString}
    </React.Fragment>,
    document.getElementById('root')
  );
}