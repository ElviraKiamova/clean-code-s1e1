const taskInputElement = document.getElementById("new-task");
const addButtonElement = document.querySelector(".form__button_add");
const todoListElement = document.querySelector(".form__list_todo");
const completedListElement = document.querySelector("completed-tasks");

//New task list item
const createNewTaskElement = function(taskString) {
  const listItemElement = document.createElement("li");
  const checkBoxElement = document.createElement("input");
  const labelElement = document.createElement("label");
  const editInputElement = document.createElement("input");
  const editButtonElement = document.createElement("button");
  const deleteButtonElement = document.createElement("button");
  const deleteButtonImgElement = document.createElement("img");

  labelElement.innerText = taskString;
  labelElement.className = 'task';

  checkBoxElement.type = "checkbox";
  editInputElement.type = "text";
  editInputElement.className = "task";

  editButtonElement.innerText = "Edit";
  editButtonElement.className = "edit";

  deleteButtonElement.className = "delete";
  deleteButtonImgElement.src = '/assets/remove.svg';
  deleteButtonElement.appendChild(deleteButtonImg);

  listItemElement.appendChild(checkBoxElement);
  listItemElement.appendChild(labelElement);
  listItemElement.appendChild(editInputElement);
  listItemElement.appendChild(editButtonElement);
  listItemElement.appendChild(deleteButtonElement);
  return listItemElement;
}

const addTask = function() {
  if (!taskInputElement.value) return;
  const listItemElement = createNewTaskElement(taskInputElement.value);
  todoListElement.appendChild(listItemElement);
  bindTaskEvents(listItemElement, taskCompleted);
  taskInputElement.value = "";
}

//Edit an existing task.
const editTask = function() {
  const listItemElement = this.parentNode;
  const editInputElement = listItemElement.querySelector('input[type=text]');
  const labelElement = listItemElement.querySelector("label");
  const editBtnElement = listItemElement.querySelector(".edit");
  const containsClass = listItemElement.classList.contains("editMode");
  //If class of the parent is .editmode
  if(containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    labelElement.innerText = editInputElement.value;
    editBtn.innerText = "Edit";
  } else {
    editInputElement.value = label.innerText;
    editBtnElement.innerText = "Save";
  }
  //toggle .editmode on the parent.
  listItemElement.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  const listItem = this.parentNode;
  completedListElement.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  const listItem = this.parentNode;
  todoListElement.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButtonElement.onclick = addTask;
addButtonElement.addEventListener("click",addTask);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  const checkBoxElement = taskListItem.querySelector("input[type=checkbox]");
  const editButtonElement = taskListItem.querySelector("button.edit");
  const deleteButtonElement = taskListItem.querySelector("button.delete");
  //Bind editTask to edit button.
  editButtonElement.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButtonElement.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBoxElement.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (const i = 0; i < todoListElement.children.length; i++){
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoListElement.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (const i = 0; i < completedListElement.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedListElement.children[i],taskIncomplete);
}

//Change edit to save when you are in edit mode.