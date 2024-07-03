// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// eslint-disable-next-line no-unused-vars
class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  _validateIndex(idx) {
    if (!(Number.isInteger(idx)) || idx < 0 || idx >= this.todos.length) {
      throw new ReferenceError(`invalid index: ${idx}`);
    }
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('can only add Todo objects');
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.todos.length - 1];
  }

  itemAt(idx) {
    this._validateIndex(idx);
    return this.todos[idx];
  }

  markDoneAt(idx) {
    this._validateIndex(idx);
    this.todos[idx].markDone();
  }

  markUndoneAt(idx) {
    this._validateIndex(idx);
    this.todos[idx].markUndone();
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(idx) {
    this._validateIndex(idx);
    return this.todos.splice(idx, 1)[0];
  }

  toString() {
    let firstLine = `---- ${this.title} ----`;
    let joinedTodos = this.todos.map(todo => todo.toString()).join('\n');
    return `${firstLine}\n${joinedTodos}`;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback, newTitle = this.title) {
    let filteredList = new TodoList(newTitle);
    this.forEach(todo => {
      if (callback(todo)) {
        filteredList.add(todo);
      }
    });

    return filteredList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.title === title).first();
  }

  allDone() {
    return this.filter(todo => todo.done);
  }

  allNotDone() {
    return this.filter(todo => !(todo.done));
  }

  markDone(title) {
    let found = this.findByTitle(title);
    if (found) {
      found.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => {
      todo.markDone();
    });
  }

  markAllUndone() {
    this.forEach(todo => {
      todo.markUndone();
    });
  }

  toArray() {
    return this.todos.slice();
  }
}
