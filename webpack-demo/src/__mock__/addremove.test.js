import Todos from '../todolist.js';

document.body.innerHTML = `
<div class="container">
<h4 class="title">My Today's To do List</h4>
<form>
    <input class="description" type="text" placeholder="Add to your List..." autofocus />
    <button class="add-btn">
        <i class="fa-solid fa-arrows-rotate fa-icon"></i>
    </button>
</form>
<div class="todos">
</div>
<div class="clear">
    <a class="clear-btn">Clear All Completed Tasks</a>
</div>
</div>
`;

describe('add and remove', () => {
  test('addion test', () => {
    const todosList = new Todos();
    const newTodo = {
      id: '1234',
      description: 'testAdd1',
      completed: false,
      index: 1,
    };
    const newTodo1 = {
      id: '1235',
      description: 'testAdd2',
      completed: false,
      index: 2,
    };
    todosList.addItems(newTodo);
    expect(todosList.list).toHaveLength(1);
    todosList.addItems(newTodo1);
    expect(todosList.list).toHaveLength(2);
  });

  test('removal test', () => {
    const todoList = new Todos();
    const newTodo = {
      id: '5678',
      description: 'testRemove1',
      completed: false,
      index: 3,
    };
    todoList.addItems(newTodo);
    todoList.removeItems(newTodo.id);
    expect(todoList.list[1].description).toBe('testAdd2');
    expect(todoList.list).toHaveLength(2);
  });
});

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});