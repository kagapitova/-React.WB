import { TaskManager } from './TaskManager.js';
import { Task, TaskStatus, TaskType } from './types.js';

const taskManager = new TaskManager();
taskManager.loadFromLocalStorage();

const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const taskList = document.getElementById('taskList') as HTMLElement;

function displayTasks() {
  taskList.innerHTML = '';
  taskManager.filterTasks().forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.innerText = `${task.title} - ${task.status}`;
    taskList.appendChild(taskElement);
  });
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  const title = (document.getElementById('title') as HTMLInputElement).value;
  const description = (document.getElementById('description') as HTMLTextAreaElement).value;
  const type = (document.getElementById('type') as HTMLSelectElement).value as TaskType;

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description,
    createdDate: new Date(),
    status: TaskStatus.Pending,
    type
  };

  taskManager.addTask(newTask);
  taskManager.saveToLocalStorage();
  displayTasks();
};

displayTasks();
