const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const remainingCount = document.getElementById('remaining-count');

let allTodos = [];
if (localStorage.getItem('todos')) {
  allTodos = JSON.parse(localStorage.getItem('todos'));
  updateTodoItem();
  displayRemainingTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(allTodos));
}

function addTodo() {
  const todo = todoInput.value.trim();
  if (todo.length > 0) {
    const todoObject = {
      text: todo,
      completed: false
    };
    allTodos.push(todoObject);
    saveTodos();
    updateTodoItem();
    displayRemainingTodos();
  }
  todoInput.value = '';
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function createTodoItem(todoObj, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoItem = document.createElement('li');
  todoItem.className = 'todo-item'; 
  todoItem.id = todoId;
  todoItem.innerHTML = `
    <input type="checkbox" id="todo-${todoIndex}" ${todoObj.completed ? 'checked' : ''}>
    <label for="todo-${todoIndex}" class="todo-text">${todoObj.text}</label>
    <button class="remove-todo"><span class="material-symbols-outlined delete-item">
      close_small
    </span></button>
  `;

  const checkbox = todoItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    todoObj.completed = checkbox.checked;
    saveTodos();
    displayRemainingTodos();
  });

  const deleteBtn = todoItem.querySelector('.remove-todo');
  deleteBtn.addEventListener('click', () => {
    allTodos.splice(todoIndex, 1);
    updateTodoItem();
    saveTodos();
    displayRemainingTodos();
  });

  return todoItem;
}

function updateTodoItem() {
  todoList.innerHTML = '';
  allTodos.forEach((todo, index) => {
    const todoItem = createTodoItem(todo, index);
    todoList.appendChild(todoItem);
  });
}

function displayRemainingTodos() {
  const remaining = allTodos.filter(t => !t.completed).length;
  remainingCount.textContent = remaining;
}
