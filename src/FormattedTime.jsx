import React from "react";
import moment from "moment";

// This is a function component. It has no internal state. It renders only what it received as properties. The only
// way to update it, is to change its properties.
function FormattedTime({ timestamp = Date.now(), format = "h:mm:ss a" }) {
  const time = moment(timestamp).format(format);

  return (
    <React.Fragment>
      <span>Current Time = </span>{time}
    </React.Fragment>
  )
}

export default FormattedTime;