import { ITodo } from '../interfaces/ITodo.js';

export class Todo implements ITodo {
    private isDone: boolean = false;
    private isEditing: boolean = false;
    constructor(
        private id: string,
        private title: string,
    ){}

    render(): string {
        const todoTemplate: string = `
        <li class="flex justify-between items-center bg-red-400 p-4 mb-2 text-left font-semibold hover:bg-red-300" id=${this.id}>
            ${this.isEditing ?
                `<input class="focus:outline-none bg-red-400 font-semibold mx-auto" type="text" value=${this.getTitle()}>` :
                `<p class="${this.isDone ? 'line-through' : ''}">${this.getTitle()}</p>`
            }
                <div class="flex">
                    <img src="/img/edit.svg" alt="" srcset="" class="w-4 cursor-pointer edit-icon">
                    <img src="/img/delete.svg" alt="" srcset="" class="w-4 cursor-pointer ml-2 delete-icon">
                </div>
        </li>`;
        return todoTemplate;
    }

    toggleIsEditing(): void {
        this.isEditing = !this.isEditing;
    }

    toggleDone(): void{
        this.isDone = !this.isDone;
    }

    getIsEditing(): boolean {
        return this.isEditing;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");;
    }

    getId(): string {
        return this.id;
    }

    getDone(): boolean {
        return this.isDone;
    }

}
