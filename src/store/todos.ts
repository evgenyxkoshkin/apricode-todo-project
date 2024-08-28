import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import { TodoType } from '../types/types';
import { recursionFilter, recursionCompleteToggler, subTaskAdding } from '../utils/utils';

class Todos {
  todoArray: TodoType[] = localStorage.todos ? JSON.parse(localStorage.todos) : [];
  activeTask: TodoType | null = null;
  todoTitle = '';
  todoText = '';
  isModalOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  titleHandler = (str: string) => {
    this.todoTitle = str;
  }

  textHandler = (str: string) => {
    this.todoText = str;
  }

  openModal = () => {
    this.isModalOpen = true;
  }

  closeModal = () => {
    this.isModalOpen = false;
  }

  addTask = () => {
    if (this.todoTitle.trim().length) {
      this.todoArray.push({
        id: uuidv4(),
        title: this.todoTitle,
        text: this.todoText,
        isCompleted: false,
        subTasks: [],
      });

      localStorage.setItem('todos', JSON.stringify(this.todoArray));
      this.todoTitle = '';
      this.todoText = '';
      this.closeModal();
    }
  }

  addSubtask = (id: string) => {
    if (this.todoTitle.trim().length) {
      const task = {
        id: uuidv4(),
        title: this.todoTitle,
        text: this.todoText,
        isCompleted: false,
        subTasks: [],
      };

      this.todoArray = subTaskAdding(id, this.todoArray, task);
      localStorage.setItem('todos', JSON.stringify(this.todoArray));
      this.todoTitle = '';
      this.todoText = '';
      this.closeModal();
    }
  }

  removeTask = (id: string) => {
    this.todoArray = recursionFilter(id, this.todoArray);
    localStorage.setItem('todos', JSON.stringify(this.todoArray));

    if (!this.todoArray.length) {
      this.activeTask = null;
      localStorage.removeItem('todos');
    }
  }

  completeToggler = (id: string) => {
    this.todoArray = recursionCompleteToggler(id, this.todoArray);
    localStorage.setItem('todos', JSON.stringify(this.todoArray));
  }
  
  findTaskRecursive = (tasks: TodoType[], id: string): TodoType | null => {
    for (const task of tasks) {
      if (task.id === id) {
        return task;
      } else if (task.subTasks.length > 0) {
        const foundTask = this.findTaskRecursive(task.subTasks, id);
        if (foundTask) {
          return foundTask;
        }
      }
    }
    return null;
  }

  chooseTask = (id: string) => {
    this.activeTask = this.findTaskRecursive(this.todoArray, id);
  }

  updateTask = (id: string, newTitle: string, newText: string) => {
    const updateTaskRecursive = (tasks: TodoType[]): TodoType[] => {
      return tasks.map(task => {
        if (task.id === id) {
          return { ...task, title: newTitle, text: newText };
        } else if (task.subTasks.length > 0) {
          return { ...task, subTasks: updateTaskRecursive(task.subTasks) };
        }
        return task;
      });
    };
  
    this.todoArray = updateTaskRecursive(this.todoArray);
    localStorage.setItem('todos', JSON.stringify(this.todoArray));
  
    this.activeTask = this.findTaskRecursive(this.todoArray, id);
  }
}

const todos = new Todos();

export default todos;
