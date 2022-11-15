"use strict";
const list = document.querySelector("#task-list");
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-title");
const loadTask = localStorage.getItem("tasks");
const tasks = loadTask != null ? JSON.parse(loadTask) : [];
tasks.forEach(addNewTask);
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => {
    event.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        id: Math.random().toString(16).slice(2),
        title: input.value,
        done: false,
        startsAt: new Date(),
    };
    tasks.push(newTask);
    addNewTask(newTask);
    input.value = "";
});
function addNewTask(task) {
    const listItem = document.createElement("li");
    const label = document.createElement("labe");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        saveTasks();
    });
    checkbox.checked = task.done;
    label.append(checkbox, task.title);
    listItem.append(label);
    list === null || list === void 0 ? void 0 : list.append(listItem);
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
