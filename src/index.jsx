import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import clockStore from "./clockStore";
import todoListStore from "./todoListStore";
import FormattedTime from "./FormattedTime";
import TodoList from "./TodoList";

// Calling render once is normal React usage pattern, even though it's valid to call it repeatedly.
ReactDOM.render(
  // Instead of using a Clock component, we're now using a MobX store with similar functionality. The store is provided
  // to child components using the MobX <Provider> component, which is similar to (and in fact internally uses) the
  // React context mechanism.
  // * Using a Provider for MobX stores is not strictly necesary. The <FormattedTime> component accepts the clockStore
  //   as a "clock" property which you could simply pass in explicitly below. If your component is purpose built for
  //   your application and doesn't need configurable injection, it could also simply import the store itself.
  <Provider clock={clockStore} todos={todoListStore}>
    <React.Fragment>
      <FormattedTime/>
      <TodoList/>
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);