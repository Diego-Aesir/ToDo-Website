import "./styles.css";
import {
    loadFirstTimeHomeScreen
} from "./view/ToDoView.js";

const personalToDo = localStorage.getItem("personalToDo");
const content = document.querySelector("#content");

if(personalToDo == null) {
    loadFirstTimeHomeScreen();
}