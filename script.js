const btnAdd = document.querySelector(".add-btn");
const btnDeleteCompleted = document.querySelector(".delete1");
const btnDeleteAll = document.querySelector(".delete2");
const inputTasks = document.querySelector(".input-tasks");
const form = document.querySelector("form");
const listOfTasks = document.querySelector(".tasks-list");
const tasksMenu = document.querySelector(".todo-list");
const deleteButtons = document.querySelector(".delete");
const LS_TODOS_KEY = "todos"
const savedToDos = JSON.parse(localStorage.getItem(LS_TODOS_KEY))
console.log(savedToDos)
let arrTasks = savedToDos ?? [];


// arrTasks.length = 0

function deleteAll() {
    arrTasks.length = 0;
    renderTasks();
}

function deleteTodo(id) {
    arrTasks = arrTasks.filter((taskObj) => taskObj.id !== id);
    renderTasks();
}

function toggleCompleted(id) {
    const findedObj = arrTasks.find((taskObj) => taskObj.id === id);
    console.log(findedObj);
    findedObj.completed = !findedObj.completed;
    renderTasks();
}

function deleteCompleted() {
    arrTasks = arrTasks.filter((taskObj) => !taskObj.completed);
    renderTasks();
}

function toDoMenu() {
    if (!arrTasks.length) {
        tasksMenu.style.display = "none";
        deleteButtons.style.display = "none";
    } else {
        tasksMenu.style.display = "block";
        deleteButtons.style.display = "flex";
    }
}

function addTask(evt) {
    evt.preventDefault();
    if (inputTasks.value.trim().length) {
        arrTasks.push({
            completed: false,
            text: inputTasks.value,
            id: Date.now(),
        });
    }

    inputTasks.value = "";
    inputTasks.focus();
    renderTasks();
}

function createTask({ completed, id, text }) {
    const task = document.createElement("li");
    task.innerHTML = `<input class="toDoCheck" type="checkbox">
                      <span>${text}</span>
                      <button>❌</button>`;

    const deleteBtn = task.querySelector("button");
    const checkBox = task.querySelector(".toDoCheck");

    checkBox.checked = completed;

    deleteBtn.addEventListener("click", () => deleteTodo(id));
    checkBox.addEventListener("change", () => toggleCompleted(id));

    return task;
}

function renderTasks() {
    listOfTasks.innerHTML = "";
    arrTasks.forEach((taskObj) => {
        const task = createTask(taskObj);
        listOfTasks.appendChild(task);
    });
    console.log(arrTasks);
    toDoMenu();
    const todosJson = JSON.stringify(arrTasks)
    setToLocalStorage(LS_TODOS_KEY, todosJson)
}
renderTasks();

function setToLocalStorage(key, value) {
    localStorage.setItem(key, value)
}


btnDeleteCompleted.addEventListener("click", deleteCompleted);
form.addEventListener("submit", addTask);
btnDeleteAll.addEventListener("click", deleteAll);




