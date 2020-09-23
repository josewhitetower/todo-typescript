export class Todo {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.isDone = false;
        this.isEditing = false;
    }
    render() {
        const todoTemplate = `
        <li class="flex justify-between items-center bg-red-400 p-4 mb-2 text-left font-semibold hover:bg-red-300" id=${this.id}>
            ${this.isEditing ?
            `<input class="focus:outline-none bg-red-400 font-semibold mx-auto" type="text" value=${this.getTitle()}>` :
            `<p class="${this.isDone ? 'line-through' : ''}">${this.getTitle()}</p>`}
                <div class="flex">
                    <img src="/public/img/edit.svg" alt="" srcset="" class="w-4 cursor-pointer edit-icon">
                    <img src="/public/img/delete.svg" alt="" srcset="" class="w-4 cursor-pointer ml-2 delete-icon">
                </div>
        </li>`;
        return todoTemplate;
    }
    toggleIsEditing() {
        this.isEditing = !this.isEditing;
    }
    toggleDone() {
        this.isDone = !this.isDone;
    }
    getIsEditing() {
        return this.isEditing;
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        ;
    }
    getId() {
        return this.id;
    }
    getDone() {
        return this.isDone;
    }
}
