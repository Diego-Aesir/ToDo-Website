class ToDoList {
    #items = [];

    constructor(index) {
        this.index = index;
    }
    
    addItem(ToDoItem) {
        this.#items.push(ToDoItem);
        ToDoItem.itemIndex = this.items.length-1
    }

    removeItem(index) {
        this.#items.splice(index, index+1);
    }

    get items() {
        return this.#items;
    }
}

const PRIORITY = {
    NO_HURRY: "Sem pressa",
    IMPORTANT: "Importante",
    URGENT: "Urgente"
};

class ToDoItem {
    itemIndex;
    #title;
    #description;
    #dueDate;
    #priority;
    constructor(title, description, dueDate, PRIORITY) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = PRIORITY;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        this.#title = newTitle;
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(newDate) {
        this.#dueDate = newDate;
    }

    get priority() {
        return this.#priority;
    }

    set priority(priority) {
        if (Object.values(PRIORITY).includes(priority)) {
            this.#priority = priority;
        } else {
            throw new Error('Invalid priority');
        }
    }
}

export {
    ToDoList,
    PRIORITY,
    ToDoItem
}