// src/index.ts
import { TaskManager } from "./TaskManager.js";
import { TaskType, Task, TaskStatus } from "./types.js";

const taskManager = new TaskManager();

const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLTextAreaElement;
const typeSelect = document.getElementById("type") as HTMLSelectElement;
const taskList = document.getElementById("taskList") as HTMLDivElement;

// Функция для отображения списка задач
function renderTasks() {
  console.log('renderTasks')

    taskList.innerHTML = "";
    const tasks = taskManager.getTasks(); // Получаем все задачи
    console.log("Rendering tasks:", tasks); // Отладка

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Type: ${task.type}</p>
            <p>Status: ${task.status}</p>
            <button class="edit-task" data-id="${task.id}">Edit</button>
            <button class="delete-task" data-id="${task.id}">Delete</button>
        `;
        taskList.appendChild(taskElement);
    });

    // Привязываем обработчики событий к кнопкам редактирования и удаления
    document.querySelectorAll(".edit-task").forEach(button => {
        button.addEventListener("click", () => {
            const taskId = (button as HTMLButtonElement).dataset.id!;
            editTask(taskId);
        });
    });

    document.querySelectorAll(".delete-task").forEach(button => {
        button.addEventListener("click", () => {
            const taskId = (button as HTMLButtonElement).dataset.id!;
            deleteTask(taskId);
        });
    });
}

// Добавление новой задачи
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const newTask: Task = {
        id: Date.now().toString(),
        title: titleInput.value,
        description: descriptionInput.value,
        createdDate: new Date(),
        status: "pending" as TaskStatus,
        type: typeSelect.value as TaskType
    };

    taskManager.addTask(newTask);
    console.log("Task added:", newTask); // Отладка
    renderTasks();
    taskForm.reset();
});

// Редактирование задачи
function editTask(taskId: string) {
    const task = taskManager.getTasks().find(t => t.id === taskId);
    if (task) {
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        typeSelect.value = task.type;

        // Сохраняем изменения при повторном сабмите
        taskForm.onsubmit = (event) => {
            event.preventDefault();
            taskManager.editTask(taskId, {
                title: titleInput.value,
                description: descriptionInput.value,
                type: typeSelect.value as TaskType,
            });
            console.log("Task edited:", task); // Отладка
            renderTasks();
            taskForm.reset();
            taskForm.onsubmit = null; // Удаляем временный обработчик событий
        };
    }
}

// Удаление задачи
function deleteTask(taskId: string) {
    taskManager.deleteTask(taskId);
    console.log("Task deleted:", taskId); // Отладка
    renderTasks();
}

// Начальное отображение задач
renderTasks();
