/*
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");
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

  e.preventDefault();

  const todoInput = input.value;
  if (todoInput === "") return;
  let check = checkTodo(todoInput);
  input.value = "";
  if (check) {

    return;
  }
  const todoObj = {
    id: Math.floor(Math.random() * 100000),
    todoName: todoInput,
  };
  todoUI(todoObj);
  todos.push(todoObj);
  saveTodo();
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
*/

const input = document.getElementById("input");
const form = document.getElementById("form");
const list = document.getElementById("list");
const localStorage_key = "Todo-list";

let todos = loadTodos();
renderTodo(todos);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = input.value;
  addTodo(todo);
  input.value = "";
});

function addTodo(todo) {
  if (!todo) return;

  const todoObj = {
    id: Math.floor(Math.random() * 10000),
    value: todo,
  };
  todos.push(todoObj);
  saveTodo();
  renderTodo(todos);
}

function renderTodo(todos) {
  const template = todos
    .map((todo) => {
      return `<li data-list><p>${todo.value}</p><button onclick="deleteTodo(${todo.id})" class="delete">Delete</button></li>`;
    })
    .join("");

  list.innerHTML = template;
}

function loadTodos() {
  return JSON.parse(localStorage.getItem(localStorage_key)) || [];
}

function saveTodo() {
  localStorage.setItem(localStorage_key, JSON.stringify(todos));
}

function deleteTodo(id) {
  todos = todos.filter((todo) => {
    return todo.id !== id;
  });
  renderTodo(todos);
  saveTodo();
}

//
const homePage = document.querySelector(".home-page");

//
const todoPage = document.querySelector(".todo-page");
const formPage = document.querySelector(".form-page");
const todoList = document.querySelector("#todo-list");
todoList.classList.add("hidden");

//
const usersList = document.querySelector("#users-list");
usersList.classList.add("hidden");
const usersPage = document.querySelector(".users-page");
//
let showHomePage = false;
let showTodosPage = false;
let showUsersPage = false;

homePage.addEventListener("click", () => {
  showHomePage = !showHomePage;
  if (showHomePage) {
    formPage.classList.remove("hidden");
    todoPage.classList.add("hidden");
    todoList.classList.add("hidden");
    showTodosPage = false;
    showUsersPage = false;
  }
});

todoPage.addEventListener("click", () => {
  // formPage.classList.add("hidden");
  // showTodosPage = !showTodosPage;
  // if (showTodosPage) {
  //   todoList.classList.remove("hidden");
  //   usersList.classList.add("hidden");
  //   renderTodoItems(todos);
  // } else {
  //   todoList.classList.add("hidden");
  //   formPage.classList.remove("hidden");
  // }
  showTodosPage = !showTodosPage;
  if (showTodosPage) {
    formPage.classList.add("hidden");
    todoList.classList.remove("hidden");
    usersList.classList.add("hidden");
    renderTodoItems(todos);
    showHomePage = false;
    showUsersPage = false;
  }
});

function renderTodoItems(todos) {
  const template = todos
    .map((todo) => {
      return `<li data-list>${todo.value}</li>`;
    })
    .join("");
  todoList.innerHTML = template;
}

//

usersPage.addEventListener("click", () => {
  // showUsersPage = !showUsersPage;
  // if (showUsersPage) {
  //   todoList.classList.add("hidden");
  //   formPage.classList.add("hidden");
  //   usersList.classList.remove("hidden");
  //   renderUserPage();
  // } else {
  //   usersList.classList.add("hidden");
  //   formPage.classList.remove("hidden");
  //   todoList.classList.add("hidden");
  // }
  showUsersPage = !showUsersPage;
  if (showUsersPage) {
    usersList.classList.remove("hidden");
    todoList.classList.add("hidden");
    formPage.classList.add("hidden");
    renderUserPage();
    showHomePage = false;
    showTodosPage = false;
  }
});

async function renderUserPage() {
  const API = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(API);
  const json = await response.json();
  const template = json
    .map((user) => {
      return `<li data-list>${user.name}</li>`;
    })
    .join("");
  usersList.innerHTML = template;
}
