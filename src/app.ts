import { ListTemplate } from "./classes/ListTemplate.js";
import { Todo } from "./classes/Todo.js";
import { ITodo } from './interfaces/ITodo.js';
const form = document.querySelector('.NewTodoForm') as HTMLFormElement;
const input = document.querySelector("input[name=title]") as HTMLInputElement;
const ul = document.querySelector('.TodoList')! as HTMLUListElement;
const list = new ListTemplate(ul);
const radioButtonAll = document.querySelector('input#all')!;
const radioButtonDone = document.querySelector('input#done')!;
const radioButtonUndone = document.querySelector('input#undone')!;

[radioButtonAll, radioButtonDone, radioButtonUndone].forEach((radioButton => {
    radioButton.addEventListener('change', (e: Event) => {
        const element = e.target as HTMLInputElement
        switch (element.value) {
            case "done": list.setType("done");
                break;
            case "undone": list.setType("undone");
                break;
            default: list.setType("all");
                break;
        }
    })
}))

form.addEventListener('submit', (e: Event)=> {
    e.preventDefault();
    const id =  Math.random().toString(36).substring(7);

    const values: [string, string] = [id, input.value];

    const todo: ITodo = new Todo(...values);
    list.add(todo);
    input.value = "";
})








