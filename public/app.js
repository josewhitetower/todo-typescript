import { ListTemplate } from "./classes/ListTemplate.js";
import { Todo } from "./classes/Todo.js";
const form = document.querySelector('.NewTodoForm');
const input = document.querySelector("input[name=title]");
const ul = document.querySelector('.TodoList');
const list = new ListTemplate(ul);
const radioButtonAll = document.querySelector('input#all');
const radioButtonDone = document.querySelector('input#done');
const radioButtonUndone = document.querySelector('input#undone');
[radioButtonAll, radioButtonDone, radioButtonUndone].forEach((radioButton => {
    radioButton.addEventListener('change', (e) => {
        const element = e.target;
        switch (element.value) {
            case "done":
                list.setType("done");
                break;
            case "undone":
                list.setType("undone");
                break;
            default:
                list.setType("all");
                break;
        }
    });
}));
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(7);
    const values = [id, input.value];
    const todo = new Todo(...values);
    list.add(todo);
    input.value = "";
});
