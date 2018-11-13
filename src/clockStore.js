import { observable, computed } from "mobx";
import moment from "moment";

const DEFAULT_FORMAT = "h:mm:ss a";

// This class is a MobX store because it has observable properties. That's the only requirement for a MobX store. It
// has a few advantages over using a component and context (like <Clock> from the earlier example):
//
// 1) The React context is only considered "changed" when the top-level value is changed. No deep comparison is
//    performed. This means that to provide multiple context values which update correctly, you either need to use
//    multiple contexts, or create a new object whenever you update one property of an object context.
// 2) A MobX store is not specific to react at all. It can be consumed by things other than React Components.
class ClockStore {
  // The babel plugin "@babel/plugin-proposal-class-properties" is necessary support class properties, and the
  // "@babel/plugin-proposal-decorators" plugin is required to support decorators. Without these plugins, class
  // properties would need to be created in the constructor, and you would use the observable() factory method to
  // make the properties observable. Class properties and decorators aren't really required, they're just prettier.
  @observable _timestamp;
  @observable _format;

  constructor({ timestamp = Date.now(), format = DEFAULT_FORMAT } = {}) {
    this._timestamp = timestamp;
    this._format = format;
  }

  // This method updates an observable value. It doesn't need to be observable or computed itself, because it doesn't
  // return a value. The fact that it updates an observable is enough to get observers to see changes.
  update() {
    this._timestamp = Date.now();
  }

  // This setter is the same as the update() method. It updates an observable, but otherwise doesn't need to be
  // observable or computed.
  set format(value) {
    this._format = typeof value === "string" ? value : DEFAULT_FORMAT;
  }

  // Getters which use an observable or another computed value, should themselves be computed. This allows MobX to
  // memoize (cache) the returned value to avoid recomputing unless the used observed/computed values have changed.
  @computed
  get format() {
    return this._format;
  }

  // This getter depends on two observable values. If either one is changed, this computed value will also be updated.
  @computed
  get time() {
    return moment(this._timestamp).format(this._format);
  }
}

const instance = new ClockStore(Date.now());

// Update the singleton instance once per second.
// * This initialization mechanism is fairly common. Imagine a similar scenario where you subscribe to a Web Sockets
//   channel so that your store is always up-to-date.
window.setInterval(() => instance.update(), 1000);

// The store is a "singleton", in that the module's default export is an intance. For testing/extension purposes, the
// class is also exported as a named export.
export { instance as default, ClockStore };