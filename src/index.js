import "./styles.css";
import {
    ToDoList,
    ToDoItem,
    PRIORITY
} from "./models/ToDoList.js";
const personalToDo = localStorage.getItem("personalToDo");
const content = document.querySelector("#content");

if(personalToDo == null) {
    let list = createStandardList();
    //console.log(list.items);
    //console.log(list.getItemOnIndex(0));
    navigateListAndInsert(list.items, content);
}

function createToDoList() {
    
}

function createStandardList() {
    const list = new ToDoList;
    const item = new ToDoItem("Ir para Academia", "Preciso cuidar de minha saude, entao vou iniciar uma rotina de Academia", "01/01/2025", PRIORITY.URGENT);
    const item2 = new ToDoItem("Comecar uma dieta", "Para entrar com o pe direito no ano novo, vou comercar uma nova dieta", "01/01/2025", PRIORITY.IMPORTANT);
    const item3 = new ToDoItem("Arrumar cama", "Vou arrumar a cama amanha!", "01/01/2025", PRIORITY.NO_HURRY);
    list.addItem(item);
    list.addItem(item2);
    list.addItem(item3);
    return list;
}

function navigateListAndInsert(list, object) {
    for(let x in list) {
        object.appendChild(createDivItemRow(list[x]));
    }
}

function createDivItemRow(item) {
    let row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    row.style.gridTemplateRows = "100px";
    row.style.alignItems = "center";
    row.style.textAlign = "center";

    let title = document.createElement("p");
    title.innerText = item.title;

    let description = document.createElement("p");
    description.innerText = item.description;
    description.style.padding = "10px";
    description.style.overflowY = "auto";

    let dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate;

    let priority = document.createElement("p");
    priority.innerText = item.priority;
    priority.className = setPriorityClass(item.priority);
    console.log(priority.className);

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