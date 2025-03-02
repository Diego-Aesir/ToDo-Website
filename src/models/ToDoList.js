class ToDoList {
    #items = [];

    constructor (subject) {
        this.subject = subject;
    }
    
    addItem(ToDoItem) {
        this.#items.push(ToDoItem);
        ToDoItem.index = this.#items.length - 1;
    }

    removeItem(index) {
        this.#items.splice(index, 1);
    }

    getItemOnIndex(index) {
        return this.#items[index];
    }

    get items() {
        return this.#items;
    }

    toJSON() {
        return {
            subject: this.subject,
            items: this.#items
        };
    }
}

const PRIORITY = {
    NO_HURRY: "No Hurry",
    IMPORTANT: "Important",
    URGENT: "Urgent"
};

class ToDoItem {
    index = null;
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

    toJSON() {
        return {
            index: this.index,
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate,
            priority: this.#priority
        };
    }
}

export {
    ToDoList,
    ToDoItem,
    PRIORITY,
}