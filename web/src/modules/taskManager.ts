import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];
let nextTaskId = initialTasks.length + 1;

export function initializeTasks() {
  tasks = [...initialTasks];
  if (tasks.length > 0) {
    tasks[0].active = true;
  }
}

export function getActiveTasks(): Task[] {
  return tasks.filter((task) => task.active && !task.completed);
}

export function getCompletedTasks(): Task[] {
  return tasks.filter((task) => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const taskIndex = tasks.findIndex((task) => task.title === taskTitle);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    tasks[taskIndex].active = false;
    const nextGroup = tasks[taskIndex].group + 1;
    const nextTask = tasks.find(
      (task) => task.group === nextGroup && !task.completed
    );
    if (nextTask) {
      nextTask.active = true;
    }
  }
}

export function createTask(
  title: string,
  description: string,
  persona: string,
  group: number
): void {
  const newTask: Task = new Task(
    nextTaskId++,
    title,
    description,
    persona,
    group,
    false,
    false
  );
  tasks.push(newTask);
}

export function updateTask(
  taskId: number,
  updatedTask: Partial<Omit<Task, "id">>
): void {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter((task) => task.id !== taskId);
}
