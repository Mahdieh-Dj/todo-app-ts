const list = document.querySelector<HTMLUListElement>("#task-list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
interface Task {
  id: string;
  title: string;
  done: boolean;
  startsAt: Date;
}
const loadTask: string | null = localStorage.getItem("tasks");
const tasks: Task[] = loadTask != null ? JSON.parse(loadTask) : [];
tasks.forEach(addNewTask);

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input?.value == "" || input?.value == null) return;
  const newTask: Task = {
    id: Math.random().toString(16).slice(2),
    title: input.value,
    done: false,
    startsAt: new Date(),
  };
  tasks.push(newTask);
  addNewTask(newTask);
  input.value = "";
});

function addNewTask(task: Task): void {
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
  list?.append(listItem);
}

function saveTasks(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
