import "./styles.css";
import {
    ToDoList,
    ToDoItem,
    PRIORITY
} from "./models/ToDoList.js";
const personalToDo = localStorage.getItem('personalToDo');
const content = document.getElementById("content");

if(personalToDo == null) {

}

function createToDoList() {
    
}

const item = new ToDoItem("Um", "Caminhar amanha", "03/12/2024", PRIORITY.IMPORTANT);
const item2 = new ToDoItem("Dois", "Caminhar amanha", "03/12/2024", PRIORITY.IMPORTANT);

console.log(item.priority);
const list = new ToDoList(0);
list.addItem(item);
list.addItem(item2);

console.log(list.items);
list.removeItem(1);
console.log(list.items);
