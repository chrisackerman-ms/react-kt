import { observable, computed } from "mobx";

let lastId = 0;

// This is the todo list item model. It is observable (it has observable properties). It will be kept in an observable
// array in the TodoList class. Observables can be nested, and added and removed dynamically.
class TodoListItem {
  _onChecked = null;
  _id = ++lastId;
  _text = null;
  @observable _checked = false;
  @observable _hidden = false;

  @computed
  get id() {
    return this._id;
  }

  @computed
  get text() {
    return this._text;
  }

  @computed
  get checked() {
    return this._checked;
  }

  @computed
  get hidden() {
    return this._hidden;
  }

  constructor(text, onChecked) {
    this._text = text;
    this._onChecked = onChecked;
  }

  // Action: Toggle the check state of an item.
  //
  // This model is intended for backing the UI, so it's entirely acceptable to have methods which represent expected UI
  // interactions. It's less good to have them use UI events for instance, because it means you're passing more than
  // the bare minimum amount of information the method needs (i.e. it violates the Interface Segregation Principal). It
  // also makes it harder to test.
  toggleChecked = () => {
    this._checked = !this._checked;

    if (this._checked)
      this._onChecked();
    else
      this._hidden = false;
  }

  // Action: Hide a checked item.
  commit = () => {
    if (this._checked)
      this._hidden = true;
  }
}

export default TodoListItem;