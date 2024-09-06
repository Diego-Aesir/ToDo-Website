import {
    PRIORITY
} from "../models/ToDoList.js";

import {
    createStandardList,
    insertItemsOnObject
} from "../controller/ToDoController.js";

const content = document.querySelector("#content");

function loadFirstTimeHomeScreen() {
    content.appendChild(createRow(createStandardList()));
}

function createRow(list) {
    const row = document.createElement("div");
    row.style.height = "250px";
    row.style.display = "grid";
    row.style.gridTemplateRows = "250px";
    row.style.gridTemplateColumns = "150px 1fr";
    row.style.border = "2px solid #1E2A5E";

    row.appendChild(createDivSubject(list));
    row.appendChild(createItemsDiv(list));
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
    divisor.style.display = "grid";
    divisor.style.gridTemplateRows = "250px";
    divisor.style.gridTemplateColumns = "repeat(auto-fill, 250px)";
    divisor.style.gap = "5px";
    insertItemsOnObject(list, divisor);
    return divisor;
}

function createDivItemRow(item) {
    let row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = "250px";
    row.style.gridTemplateRows = "repeat(auto-fill, 60px)";
    row.style.gap = "1px";
    row.style.alignItems = "center";
    row.style.textAlign = "center";
    row.style.overflowY = "none";
    row.style.border = "0.5px solid #1E2A5E";

    let title = document.createElement("p");
    title.innerText = item.title;
    title.style.border = "1px solid #1E2A5E";
    title.style.backgroundColor = "#E1D7B7";
    title.style.color = "black";

    let description = document.createElement("p");
    description.innerText = item.description;
    description.style.padding = "10px";
    description.style.overflowY = "auto";

    let dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate;

    let priority = document.createElement("p");
    priority.innerText = item.priority;
    priority.style.textDecoration = "underline";
    priority.style.transform = "scale(1.18)";

    row.className = setPriorityClass(item.priority);
    row.appendChild(title);
    row.appendChild(description);
    row.appendChild(dueDate);
    row.appendChild(priority);
    return row;
}

function setPriorityClass(priority) {
    for (const x in PRIORITY) {
        if (PRIORITY[x] === priority) {
            return x;
        }
    }
}

export {
    createDivItemRow,
    loadFirstTimeHomeScreen
}