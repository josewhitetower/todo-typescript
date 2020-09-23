export interface ITodo {
    toggleDone(): void;
    setTitle(title: string): void;
    getDone(): boolean;
    getId(): string;
    getTitle(): string;
    getIsEditing(): boolean;
    toggleIsEditing(): void;
    render(): string;
}