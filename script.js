const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");
const deleteBtn = document.querySelector(".delete");
const localStorage_key = "Todo-list";
let todos = getTodo();
todos.forEach((todo) => {
  todoUI(todo);
});

list.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    deleteElement(e.target);
  }
});

form.addEventListener("submit", (e) => {
  // remove default behaviour of form
  e.preventDefault();

  const todoInput = input.value;
  //check input field
  if (todoInput === "") return;
  let check = checkTodo(todoInput);
  // check Input data to avoid repeatition
  if (check) {
    //reset input field
    input.value = "";
    return;
  }
  //storing input data
  const todoObj = {
    id: Math.floor(Math.random() * 100000),
    todoName: todoInput,
  };
  todoUI(todoObj);
  todos.push(todoObj);
  saveTodo();
  // reset input field
  input.value = "";
});

//display UI
function todoUI(todo) {
  const div = document.createElement("div");
  div.dataset.list = todo.id;
  const li = document.createElement("li");
  li.textContent = todo.todoName;
  const button = document.createElement("button");
  button.classList.add("delete");
  button.textContent = "Delete";
  div.append(li, button);
  list.appendChild(div);
}

// loading Todo from localStorage
function getTodo() {
  return JSON.parse(localStorage.getItem(localStorage_key)) || [];
}

// Saving Todo in localStorage
function saveTodo() {
  localStorage.setItem(localStorage_key, JSON.stringify(todos));
}
// Checking todo
function checkTodo(todoInput) {
  let check = false;
  todos.forEach((todo) => {
    if (todo.todoName === todoInput) {
      check = true;
    }
  });
  return check;
}

// Delete functionality
function deleteElement(ele) {
  const list = ele.closest("[data-list]");
  list.remove();
  let id = list.dataset.list;
  // console.log(typeof id);
  todos = todos.filter((todo) => {
    return todo.id !== parseInt(id);
  });
  saveTodo();
}
