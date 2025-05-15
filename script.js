const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', loadTodos);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo(input.value);
  input.value = '';
});

function addTodo(text, isDone = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (isDone) li.classList.add('done');

  li.addEventListener('click', function () {
    li.classList.toggle('done');
    saveTodos();
  });

  const btn = document.createElement('button');
  btn.textContent = 'Hapus';
  btn.className = 'delete-btn';
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  li.appendChild(btn);
  list.appendChild(li);
  saveTodos();
}

function saveTodos() {
  const todos = [];
  list.querySelectorAll('li').forEach(li => {
    todos.push({
      text: li.firstChild.textContent,
      done: li.classList.contains('done')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => addTodo(todo.text, todo.done));
}