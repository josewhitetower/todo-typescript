import { ITodo } from '../interfaces/ITodo.js';
export interface IListTemplate {
    add(todo: ITodo): void;
    render(todos: Array<ITodo>): void;
    bind(): void;
    toggleEdit(id: string): void;
    editTodo(id: string, value: string): void;
    toggleDone(id: string): void;
    deleteTodo(id: string): void;

}