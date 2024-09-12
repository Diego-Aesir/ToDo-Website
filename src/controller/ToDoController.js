import {
    ToDoList,
    ToDoItem,
    PRIORITY
} from "../models/ToDoList.js";

import {
    createItemOnDiv,
    removeChildFromIndex,
} from "../view/ToDoView.js";

function createStandardList() {
    const list = new ToDoList("Home");

    list.addItem(createNewItem(
        "Clean the house",
        "Perform a general cleaning of the house, including vacuuming and mopping.",
        "10/09/2024",
        PRIORITY.IMPORTANT
    ));

    list.addItem(createNewItem(
        "Plan meals",
        "Create a meal plan for the week, including recipes and necessary shopping.",
        "15/09/2024",
         PRIORITY.NO_HURRY
    ));
    list.addItem(createNewItem(
        "Team meeting",
        "Attend the weekly team meeting to discuss progress and upcoming tasks.",
        "07/09/2024",
         PRIORITY.URGENT
    ));
    return list;
}

function insertItemsOnObjectFromList(list, row) {
    for(let x in list.items) {
        row.appendChild(createItemOnDiv(list, list.getItemOnIndex(x)));
    }
}

function createNewToDoList(subject) {
    const newList = new ToDoList(subject);
    return newList;
}

function createNewItem(title, description, date, PRIORITY) {
    const newItem = new ToDoItem (
        title,
        description,
        date,
        PRIORITY
    );
    return newItem;
}

function eraseItem(list, item) {
    if(eraseConfirmation("ToDo Item: " + item.title)) {
        removeChildFromIndex(list, item);
        list.removeItem(item.index);
    
        for(let i in list.items) {
            let itemReforged = list.getItemOnIndex(i);
            itemReforged.index = i;
        }
    }
}

function eraseConfirmation(whichItem) {
    return confirm("Do you wish to remove " + whichItem + " ? (This action cannot be undone)");
}

function addConfirmation(whichThing) {
    return confirm("Are you sure about your " + whichThing + " information");
}

function saveContentOnLocalStorage(list) {
    localStorage.setItem("personalToDoList", JSON.stringify(list));
}

export {
    createStandardList,
    insertItemsOnObjectFromList,
    eraseItem,
    eraseConfirmation,
    createNewToDoList,
    createNewItem,
    addConfirmation,
    saveContentOnLocalStorage
}