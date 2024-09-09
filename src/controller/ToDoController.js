import {
    ToDoList,
    ToDoItem,
    PRIORITY
} from "../models/ToDoList.js";

import {
    createDivItemRow,
    removeChildFromIndex
} from "../view/ToDoView.js";

function createStandardList() {
    const list = new ToDoList("Home");
    const item = new ToDoItem (
        "Clean the house",
        "Perform a general cleaning of the house, including vacuuming and mopping.",
        "10/09/2024",
        PRIORITY.IMPORTANT
    );
    
    const item2 = new ToDoItem (
        "Plan meals",
        "Create a meal plan for the week, including recipes and necessary shopping.",
        "15/09/2024",
         PRIORITY.NO_HURRY
    );
    
    const item3 = new ToDoItem (
        "Team meeting",
        "Attend the weekly team meeting to discuss progress and upcoming tasks.",
        "07/09/2024",
         PRIORITY.URGENT
    );


    list.addItem(item);
    list.addItem(item2);
    list.addItem(item3);

    return list;
}

function insertItemsOnObject(list, object) {
    for(let x in list.items) {
        object.appendChild(createDivItemRow(list, list.getItemOnIndex(x)));
    }
}

function eraseItem(list, item) {
    removeChildFromIndex(list, item);
    list.removeItem(item.index);

    for(let i in list.items) {
        let itemReforged = list.getItemOnIndex(i);
        itemReforged.index = i;
    }
}

export {
    createStandardList,
    insertItemsOnObject,
    eraseItem
}