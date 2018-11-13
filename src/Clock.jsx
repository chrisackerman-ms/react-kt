// You MUST import React when using any JSX (e.g. <Component>) markup because when it's compiled, it gets turned into
// React.createElement(Component, properties, children).
import * as React from "react";
import FormattedTime from "./FormattedTime";

class Clock extends React.Component {
  // The constructor is passed props (and context, but we don't have to worry about it most of the time).
  constructor(props) {
    // You MUST call the super constructor with UNMODIFIED properties. If you attempt to modify the properties before
    // passing them to the parent contructor, React will yell at you.
    super(props);

    // Initialize the component's state. This is the ONLY time you can modify the state directly (without using
    // this.setState()).
    this.state = {
      timestamp: Date.now()
    };
  }
  
  // This is called once initially, and then repeatedly any time the state (or properties change).
  render() {
    // This component no longer knows about formatting times. It delegates that duty to the <FormattedTime> component.
    return <FormattedTime timestamp={this.state.timestamp}/>;
  }

  // This is called ONCE, after the first call to render()
  componentDidMount() {
    // Once the component is mounted, update it's state once per second to change the displayed time. The render()
    // method will be invoked as necessary to reflect state changes.
    this.interval = window.setInterval(() => {
      this._updateTime();
    }, 1000);
  }

  // This is called ONCE, before the underlying element is removed from the DOM, and after the last call to render().
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  _updateTime() {
    this.setState(state => {
      return {
        ...state,
        timestamp: Date.now()
      }
    });
  }
}

export default Clock;