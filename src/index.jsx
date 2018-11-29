import React from "react";
import ReactDOM from "react-dom";
import clockStore from "./clockStore";
import todoListStore, { TodoListStore } from "./todoListStore";
import FormattedTime from "./FormattedTime";
import TodoListForm from "./TodoListForm";
import MyTodoList from "./MyTodoList";
import { Provider } from "mobx-react";

ReactDOM.render(
  <Provider todos={todoListStore} clock={clockStore}>
    <div className="todo-common-parent">
      {/*
        * Passing the clock MobX store into the component as a property
        */}
      <FormattedTime/>
      <div className="todo-list-outer">
        <div className="todo-list-inner">
          <MyTodoList/>
        </div>
      </div>
      <div className="todo-form-container">
        {/*
          * Passing the SAME todoList MobX store into the component as a property, so that the two components are now
          * effectively linked by shared state
          */}
        <TodoListForm/>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);