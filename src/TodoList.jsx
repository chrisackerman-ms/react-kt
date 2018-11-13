import React from "react";
import { inject, observer } from "mobx-react";

@inject("todos")
@observer
class TodoList extends React.Component {
  state = {
    text: ""
  };

  render() {
    const { todos } = this.props;
    const items = todos.items.map(this._renderItem);

    return (
      <React.Fragment>
        <ul className="todoList">
          {items.length ? items : <span className="todoList-empty">Nothing to do.</span>}
        </ul>
        <form className="todoList-form" onSubmit={this._onSubmit}>
          <input value={this.state.text} onChange={this._onTextChanged}></input>
          <button type="submit">Add Todo</button>
        </form>
      </React.Fragment>
    );
  }

  _onSubmit = (event) => {
    event.preventDefault();

    const { todos } = this.props;
    const text = this.state.text.trim();

    if (text) {
      todos.add(text);

      this.setState((state) => {
        return {
          ...state,
          text: ""
        }
      });
    }
  };

  _renderItem = (item) => {
    const onChange = (event) => this._onCheckChanged(event, item.id);

    return (
      <li className="todoList-item" key={item.id}>
        <input type="checkbox" onChange={onChange} checked={item.checked}/>
        <span>{item.text}</span>
      </li>
    );
  }

  _onTextChanged = (event) => {
    const text = event.target.value;

    this.setState((state) => {
      return {
        ...state,
        text
      }
    });
  }

  _onCheckChanged = (event, id) => {
    const { todos } = this.props;
    todos.check(id, event.target.checked);
  }
}

export default TodoList;