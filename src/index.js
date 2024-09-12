import "./styles.css";
import {
    createAddRowDiv,
    loadFirstTimeHomeScreen,
    loadUserList
} from "./view/ToDoView.js";

const content = document.querySelector("#content");

if(localStorage.getItem("personalToDoList") == null) {
    loadFirstTimeHomeScreen();
    content.appendChild(createAddRowDiv());
} else {
    loadUserList();
}