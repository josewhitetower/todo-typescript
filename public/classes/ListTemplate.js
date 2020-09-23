import { Todo } from './Todo.js';
export class ListTemplate {
    constructor(container) {
        this.container = container;
        this.todos = [];
        this.type = "all";
        this.bind();
        if (localStorage) {
            const todos = localStorage.getItem("todos");
            if (todos) {
                JSON.parse(todos).forEach((todo) => {
                    const td = new Todo(todo.id, todo.title);
                    this.todos.push(td);
                });
                this.render();
            }
        }
    }
    add(todo) {
        this.todos.push(todo);
        this.render();
    }
    setType(type) {
        this.type = type;
        this.render();
    }
    bind() {
        this.container.addEventListener('click', (e) => {
            const target = e.target;
            const li = target.closest('li');
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
            const target = e.target;
            const id = target.closest('li').id;
            this.editTodo(id, target.value);
        });
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.getId() !== id);
        this.render();
    }
    editTodo(id, value) {
        this.todos.forEach((todo) => {
            if (todo.getId() === id) {
                todo.setTitle(value);
            }
        });
        this.toggleEdit(id);
        this.render();
    }
    toggleDone(id) {
        this.todos.forEach((todo) => {
            if (todo.getId() === id) {
                todo.toggleDone();
            }
        });
        this.render();
    }
    toggleEdit(id) {
        this.todos.forEach((todo) => {
            if (todo.getId() === id) {
                todo.toggleIsEditing();
            }
        });
        this.render();
    }
    render(todos = this.todos) {
        let innerHtml = "";
        switch (this.type) {
            case "done":
                todos.forEach((todo) => {
                    if (todo.getDone()) {
                        innerHtml += todo.render();
                    }
                });
                break;
            case "undone":
                todos.forEach((todo) => {
                    if (!todo.getDone()) {
                        innerHtml += todo.render();
                    }
                });
                break;
            default:
                todos.forEach((todo) => {
                    innerHtml += todo.render();
                });
                break;
        }
        this.container.innerHTML = innerHtml;
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}
