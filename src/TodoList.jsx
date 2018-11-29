import React from "react";
import "./TodoList.css";

// This base todo list is not aware of MobX at all. It could be used with MobX, or Redux, or no framework at all. It
// would normally be a reusable component imported as a dependency, rather than source in your end application.
// * See the <MyCheckList> component for the MobX integration.
class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    const items = todos.items.map(this._renderItem);

    return (
      <ul className="todoList">
        {items.length ? items : <li className="todoList-empty">Nothing to do.</li>}
      </ul>
    );
  }

  _renderItem = (item) => {
    return (
      <li className={`todoList-item ${item.checked ? "todoList-item-checked" : ""}`} key={item.id}>
        <input type="checkbox" onChange={item.toggleChecked} checked={item.checked}/>
        <span>{item.text}</span>
      </li>
    );
  }
}

export default TodoList;