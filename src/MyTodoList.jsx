import React from "react";
import { inject, observer } from "mobx-react";
import TodoList from "./TodoList";

// This is a HOC wrapper for the base <TodoList> component, which adds MobX integration. It is a version of the todo
// list which enables observable observation, and injection from a parent <Provider> component.
// * You might ask, why not have the base <TodoList> component do the injection? The answer is that this is a slightly
//   contrived example, and TodoList would usually be a reusable component stored in a component library. It's not
//   wrong to have a library use MobX, but generally, MobX integration will be left up to the end application which is
//   consuming reusable components. This allows reusable components to be data modeling framework agnostic. An
//   application can choose to use the component along with MobX, Redux, or no-framework at all.
const MyTodoList = inject("todos")(observer(TodoList));

export default MyTodoList;