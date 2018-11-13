import { observable, computed } from "mobx";

let lastId = 0;

class TodoListItem {
  id = ++lastId;
  @observable checked = false;

  constructor(text) {
    this.text = text;
  }
}

class TodoListStore {
  @observable _items = [];

  @computed
  get items() {
    return this._items.slice();
  }

  add(text) {
    this._items.push(new TodoListItem(text));
  }

  check(id, checked) {
    const item = this.get(id);

    if (item)
      item.checked = checked;
  }

  get(id) {
    return this._items.find((item) => {
      return item.id === id;
    });
  }
}

const instance = new TodoListStore();

export { instance as default, TodoListStore };