import React from "react";
import { observer, inject } from "mobx-react";

// Apply the observer decorator to make this whole component aware of changes to any MobX observables it uses.
@inject("todos")
@observer
class TodoListForm extends React.Component {
  state = {
    // This state property is bi-directionally bound to the rendered form text input.
    // * This is the usual pattern for handling form inputs in React. Keeping the current value in the state is easier
    //   than just getting the final state from the form, because in React, you generally want to avoid querying the
    //   DOM.
    text: ""
  };

  render() {
    const { todos } = this.props;

    return (
      /*
       * Handle the onSubmit event to create the new todo item.
       */
      <form className="todoList-form" onSubmit={this._onSubmit}>
        {/*
          * This input always has the state "text" value, which means IT MUST ALSO UPDATE THE STATE to reflect the
          * current value. It does that by attaching an onChange handler. If it didn't update the state, then when it
          * did rerender for some reason (e.g. a parent updated, or some other state parameter changed), it would reset
          * the text input value to the last value set in the state (an empty string "" in this case).
          * 
          * If you find this tedious, it is possible to create components and patterns which do this more
          * automatically. React doesn't come with them because there are too many possibilities for usrs might want it
          * to work.
          */}
        <input name="text" value={this.state.text} onChange={this._onChange}></input>
        {/*
          * This submit button doesn't need any special binding. It makes the form "submit" as normal. We've handled
          * the onSubmit event at the form element.
          */}
        <button type="submit">Add Todo</button>
        {/*
          * This input is also bi-directionally bound, but to the MobX store, not the component state. It always has
          * the current value of the store's "showHidden" flag, and it toggles that value when the checkbox changes.
          */}
        <input type="checkbox" checked={todos.showHidden} onChange={todos.toggleShowHidden}/>
        <span>Show Completed</span>
      </form>
    );
  }

  // Update the state when the text input changes.
  // * We could use this handler for any text input, since it uses the input name to set the appropriate state
  //   property.
  // * This handler ONLY uses the input "value", which isn't the correct input property for some types of inputs (e.g.
  //   checkboxes). We could make it handle multiple types of inputs if we needed to.
  _onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState((state) => {
      return {
        ...state,
        [name]: value
      };
    });
  }

  // Update the todos MobX store when the form is submitted.
  _onSubmit = (event) => {
    // Make sure you prevent the default form action!!! If you don't the form will actually cause a page refresh as it
    // tries to submit the old fashioned way.
    event.preventDefault();

    const { todos } = this.props;

    // Use the current text input value, which is kept in the state.
    const text = this.state.text.trim();

    // Do nothing if the text input is blank.
    if (text) {
      // Update the store by adding the text for the new item.
      todos.add(text);

      // Update the state to clear the form. Remember the form values are bound to the state, which means if we blank
      // the values in the state, the form will also blank.
      this.setState((state) => {
        return {
          ...state,
          text: ""
        }
      });
    }
  }
}

export default TodoListForm;