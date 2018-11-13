// You MUST import React when using any JSX (e.g. <Component>) markup because when it's compiled, it gets turned into
// React.createElement(Component, properties, children).
import * as React from "react";

// Create paired context Provider and Consumer components. These components work together so that anywhere the Consumer
// is used, it will recieve it's value from the nearest parent Provider.
const {Provider, Consumer} = React.createContext(0);

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
    const { children } = this.props;

    // This component no longer knows about formatting times or even what children it's rendering. It only provides a
    // context to any children that it has. It is now completely declarative.
    return (
      <Provider value={this.state.timestamp}>
        {children}
      </Provider>
    );
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

// Assign the context Consumer component to a static property on the Clock component, so that "Clock-aware" components
// can consume the context using the <Clock.Consumer> component.
Clock.Consumer = Consumer;

export default Clock;