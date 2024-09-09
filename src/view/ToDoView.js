import {
    PRIORITY
} from "../models/ToDoList.js";

import {
    createStandardList,
    insertItemsOnObject,
    eraseItem
} from "../controller/ToDoController.js";

const content = document.querySelector("#content");

function loadFirstTimeHomeScreen() {
    content.appendChild(createRow(createStandardList()));
}

function createRow(list) {
    const row = document.createElement("div");
    row.style.height = "280px";
    row.style.display = "grid";
    row.style.gridTemplateRows = "250px";
    row.style.gridTemplateColumns = "150px 1fr 150px";
    row.style.border = "2px solid #1E2A5E";

    row.appendChild(createDivSubject(list));
    row.appendChild(createItemsDiv(list));
    row.appendChild(createButtonExclude(row));
    return row;
}

function createDivSubject(item) {
    const subjectDiv = document.createElement("div");
    subjectDiv.style.textAlign = "center";
    subjectDiv.style.alignSelf = "center";
    subjectDiv.style.fontWeight = "bolder";
    subjectDiv.innerText = item.subject;
    return subjectDiv;
}

function createItemsDiv(list) { 
    const divisor = document.createElement("div");
    divisor.style.display = "flex";
    divisor.style.width = "90 vw";
    divisor.style.height = "30vh";
    divisor.style.overflowX = "scroll";
    divisor.style.border = "0.5px solid #1E2A5E";
    divisor.className = list.subject;
    insertItemsOnObject(list, divisor);
    return divisor;
}

function createButtonExclude(row) { 
    const buttonExclude = document.createElement("button");
    buttonExclude.innerText = "Exclude ToDo List";
    buttonExclude.style.height = "30vh";
    buttonExclude.addEventListener("click", () => {
        row.remove();
    });
    return buttonExclude;
}

function createDivItemRow(list, item) {
    const row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = "255px";
    row.style.gridTemplateRows = "repeat(auto-fill, 55px)";
    row.style.gap = "1px";
    row.style.alignItems = "center";
    row.style.textAlign = "center";
    row.style.overflowY = "none";
    row.style.border = "0.5px solid #1E2A5E";

    const title = document.createElement("p");
    title.innerText = item.title;
    title.style.border = "1px solid #1E2A5E";
    title.style.backgroundColor = "#E1D7B7";
    title.style.color = "black";

    const description = document.createElement("p");
    description.innerText = item.description;
    description.style.padding = "10px";
    description.style.overflowY = "auto";

    const dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate;

    const priority = document.createElement("p");
    priority.innerText = item.priority;
    priority.style.textDecoration = "underline";
    priority.style.transform = "scale(1.18)";

    row.className = setPriorityClass(item.priority);
    row.appendChild(title);
    row.appendChild(description);
    row.appendChild(dueDate);
    row.appendChild(priority);
    row.appendChild(createButtonEraser(list, item));
    return row;
}

function setPriorityClass(priority) {
    for (const x in PRIORITY) {
        if (PRIORITY[x] === priority) {
            return x;
        }
    }
}

function createButtonEraser(list, item) {
    const button = document.createElement("button");
    button.innerText = "Erase this item";
    button.style.width = "100px";
    button.style.marginLeft = "80px";
    button.style.borderRadius = "10px";
    button.style.fontWeight = "bolder";
    button.addEventListener("click", function() {
        eraseItem(list, item);
    });
    return button;
}

function removeChildFromIndex(list, item) {
    const divItem = document.querySelector("." + list.subject);
    divItem.removeChild(divItem.children[item.index]);
}

export {
    createDivItemRow,
    loadFirstTimeHomeScreen,
    removeChildFromIndex
}