import { ITodo } from '../interfaces/ITodo.js';
import { IListTemplate } from '../interfaces/IListTemplate.js';
import { Todo } from './Todo.js';
export class ListTemplate implements IListTemplate {
    private todos: Array<ITodo> = [];
    private type: string = "all";
    constructor(private container: HTMLUListElement) {
        this.bind();
        if (localStorage) {
            const todos = localStorage.getItem("todos");
            if (todos) {
                JSON.parse(todos).forEach((todo: any) => {
                    const td = new Todo(todo.id, todo.title);
                    this.todos.push(td);
                })
                this.render();
            }
        }
    }

    add(todo: ITodo): void {
        this.todos.push(todo);
        this.render();
    }

    setType(type: string): void {
        this.type = type;
        this.render()
    }

    bind(): void {
        this.container.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target!;
            const li = target.closest('li')!;
            if (target.className.includes("edit-icon")) {
                this.toggleEdit(li.id);
            }

            if (target.className.includes("delete-icon")) {
                this.deleteTodo(li.id);
            }

            if (target.tagName === "P") {
                this.toggleDone(li.id);
            }
        });

        this.container.addEventListener('change', (e) => {
            const target = <HTMLInputElement>e.target;
            const id = target.closest('li')!.id;
                this.editTodo(id, target.value);
        });
    }

    deleteTodo(id: string): void {
        this.todos = this.todos.filter(todo => todo.getId() !== id)
        this.render();
    }

    editTodo(id: string, value: string): void {
        this.todos.forEach((todo: ITodo) => {
            if (todo.getId() === id) {
                todo.setTitle(value)
            }
        });
        this.toggleEdit(id);
        this.render()
    }

    toggleDone(id: string): void {
        this.todos.forEach((todo: ITodo) => {
            if (todo.getId() === id) {
                todo.toggleDone()
            }
        })
        this.render();
    }

    toggleEdit(id: string): void {
        this.todos.forEach((todo: ITodo) => {
            if (todo.getId() === id) {
                todo.toggleIsEditing()
            }
        })
        this.render()
    }

    render(todos: Array<ITodo> = this.todos ): void {
        let innerHtml = ""

        switch (this.type) {
            case "done":
                todos.forEach((todo: ITodo) => {
                    if (todo.getDone()) {
                        innerHtml += todo.render();
                    }
                });
                break;
            case "undone":
                todos.forEach((todo: ITodo) => {
                    if (!todo.getDone()) {
                        innerHtml += todo.render();
                    }
                });
                break;
            default:
                todos.forEach((todo: ITodo) => {
                    innerHtml += todo.render();
                });
                break;
        }

        this.container.innerHTML = innerHtml;
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }
}