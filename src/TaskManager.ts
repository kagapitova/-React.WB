// src/TaskManager.ts
import { Task, TaskStatus, TaskType } from './types.js';

export class TaskManager {
    private tasks: Task[] = [];

    constructor() {
        this.loadFromLocalStorage(); // Загружаем задачи при создании экземпляра
    }

    addTask(task: Task): void {
        this.tasks.push(task);
        this.saveToLocalStorage();
    }

    editTask(taskId: string, updatedTask: Partial<Task>): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updatedTask);
            this.saveToLocalStorage();
        }
    }

    deleteTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveToLocalStorage();
    }

    filterTasks(status?: TaskStatus, type?: TaskType): Task[] {
        return this.tasks.filter(task => 
            (!status || task.status === status) && 
            (!type || task.type === type)
        );
    }

    saveToLocalStorage(): void {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadFromLocalStorage(): void {
        const data = localStorage.getItem("tasks");
        if (data) {
            try {
                // Парсируем данные и преобразуем дату создания
                this.tasks = JSON.parse(data).map((task: any) => ({
                    ...task,
                    createdDate: new Date(task.createdDate)
                })) as Task[];
                console.log("Tasks loaded:", this.tasks); // Отладка
            } catch {
                console.error("Failed to load tasks from localStorage");
                this.tasks = [];
            }
        }
    }

    getTasks(): Task[] {
        return this.tasks;
    }
}
