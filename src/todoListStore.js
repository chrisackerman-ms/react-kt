import { observable, computed } from "mobx";
import TodoListItem from "./TodoListItem";

// This class is observable, because it has observable properties. This class is purpose built to represent an
// ABSTRACT user interface. UI knowledge is limited to actions a user might take on the state. The actual visual
// user interface which might trigger these actions is not in scope.
class TodoListStore {
  _timeout = null;
  // This array is observable, meaning adding/removing items, as well as replacing the array will notify observers.
  // It will also contain observable things!
  @observable _items = [];
  @observable showHidden = false;

  @computed
  get items() {
    if (this.showHidden)
      return this._items.slice();
    
    return this._items.filter((item) => !item.hidden);
  }

  // Action: Add a new item.
  add = (text) => {
    const item = new TodoListItem(text, this._queueCommit);
    this._items.push(item);
    return item;
  }

  // Action: Toggle visibility of completed (hidden) items.
  toggleShowHidden = () => {
    this.showHidden = !this.showHidden;
    this._clearTimeout();
    this._commit();
  }

  _queueCommit = () => {
    this._clearTimeout();
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this._commit();
    }, 3000);
  }

  _commit = () => {
    this._items.forEach((item) => item.commit());
  }

  _clearTimeout = () => {
    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}

const instance = new TodoListStore();

export { instance as default, TodoListStore };