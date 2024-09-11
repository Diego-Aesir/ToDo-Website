import {
    PRIORITY
} from "../models/ToDoList.js";

import {
    createStandardList,
    insertItemsOnObjectFromList,
    eraseItem,
    eraseConfirmation,
    createNewItem,
    addConfirmation
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
    row.style.gridTemplateColumns = "150px 1fr 150px 110px";
    row.style.border = "2px solid #1E2A5E";

    const itemsDiv = createItemsDiv(list);

    row.appendChild(createDivSubject(list));
    row.appendChild(itemsDiv);
    row.appendChild(insertAddtiveItem(list, itemsDiv));
    row.appendChild(createButtonExclude(row, list));
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
    divisor.style.scrollSnapType = "x mandatory";
    divisor.style.border = "0.5px solid #1E2A5E";
    divisor.className = list.subject;
    insertItemsOnObjectFromList(list, divisor);
    return divisor;
}

function createButtonExclude(row, list) { 
    const buttonExclude = document.createElement("button");
    buttonExclude.innerText = "Exclude ToDo List";
    buttonExclude.style.height = "30vh";
    buttonExclude.addEventListener("click", () => {
        if(eraseConfirmation("ToDo Row List: " + list.subject)) {
            row.remove();
        }
    });
    return buttonExclude;
}

function createItemOnDiv(list, item) {
    const object = document.createElement("div");
    object.style.display = "grid";
    object.style.gridTemplateColumns = "255px";
    object.style.gridTemplateRows = "repeat(auto-fill, 55px)";
    object.style.gap = "1px";
    object.style.alignItems = "center";
    object.style.textAlign = "center";
    object.style.overflowY = "none";
    object.style.border = "0.5px solid #1E2A5E";

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

    object.className = setPriorityClass(item.priority);
    object.appendChild(title);
    object.appendChild(description);
    object.appendChild(dueDate);
    object.appendChild(priority);
    object.appendChild(createButtonEraser(list, item));
    return object;
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

function insertAddtiveItem(list, row) {
    const itemAdd = document.createElement("div");
    itemAdd.style.width = "7vw";
    itemAdd.style.height = "28vh";
    itemAdd.style.border = "10px solid #7C93C3";
    itemAdd.style.backgroundColor = "whitesmoke";
    itemAdd.className = "addButton";
    itemAdd.addEventListener("mouseover", () => {
        itemAdd.style.transform = "scale(1.01)";
        itemAdd.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    });
    itemAdd.addEventListener("mouseleave", () => {
        itemAdd.style.transform = "scale(1)";
        itemAdd.style.boxShadow = "none";
    });
    itemAdd.addEventListener("click", function(){
       return newItemCreationModal(list, row);
    });
    return itemAdd;
}

function newItemCreationModal(list, row) {
    const dialog = document.createElement("dialog");
    let form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "10px";

    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("title", "itemTitle");
    title.setAttribute("placeholder", "Item Title");

    let description = document.createElement("input");
    description.setAttribute("type", "text");
    description.setAttribute("description", "itemDescription");
    description.setAttribute("placeholder", "Item Description");

    let date = document.createElement("input");
    date.setAttribute("type", "date");
    date.setAttribute("date", "itemDate");
    date.setAttribute("placeholder", "Due Date");

    let priority = document.createElement("select");
    priority.setAttribute("name", "itemPriority");

    for (const key in PRIORITY) {
        if (Object.hasOwnProperty.call(PRIORITY, key)) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = PRIORITY[key];
            priority.appendChild(option);
        }
    }

    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Confirm");

    let cancelButton = document.createElement("button");
    cancelButton.setAttribute("type", "button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => {
        dialog.close();
        document.body.removeChild(dialog);
    });

    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(date);
    form.appendChild(priority);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);
    
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();

    form.addEventListener("submit", () => {       
        event.preventDefault(); 
        if(addConfirmation("New ToDo Item")) {
            let newItem = createNewItem(
                form.elements.item(0).value,
                form.elements.item(1).value,
                formatDate(form.elements.item(2).value),
                PRIORITY[form.elements.item(3).value]
            );
            list.addItem(newItem);
            row.appendChild(createItemOnDiv(list, newItem));
            dialog.close();
            document.body.removeChild(dialog);
        }
    });
}

function formatDate(date) {
    const [year, month, day] = date.split("-");
    return day + "/" + month + "/" + year;
}

export {
    createItemOnDiv,
    loadFirstTimeHomeScreen,
    removeChildFromIndex,
    insertAddtiveItem,
    newItemCreationModal
}