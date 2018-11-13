import React from "react";
import ReactDOM from "react-dom";
import Clock from "./Clock";

// Calling render once is normal React usage pattern, even though it's valid to call it repeatedly.
ReactDOM.render(
  // We have encapsulated our clock. We can use as many clocks, as many times, as we want, without worrying about
  // re-rendering the application.
  <Clock/>,
  document.getElementById('root')
);