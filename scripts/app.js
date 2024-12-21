const taskInputElement = document.getElementById("new-task");
const addButtonElement = document.querySelector(".form__button_add");
const todoListElement = document.querySelector(".form__list_todo");
const completedListElement = document.getElementById("completed-tasks");

function createNewTaskElement(taskString) {
  const listItemElement = document.createElement("li");
  listItemElement.className = "form__item";

  const checkBoxElement = document.createElement("input");
  const labelElement = document.createElement("label");
  const editInputElement = document.createElement("input");
  const editButtonElement = document.createElement("button");
  const deleteButtonElement = document.createElement("button");

  labelElement.innerText = taskString;
  labelElement.className = 'form__label';

  checkBoxElement.type = "checkbox";
  checkBoxElement.className = "form__input_checkbox";
  editInputElement.type = "text";
  editInputElement.className = "form__input";
  editInputElement.style.display = "none";

  editButtonElement.innerText = "Edit";
  editButtonElement.className = "form__button edit";

  deleteButtonElement.className = 'form__button form__button_delete';
  deleteButtonElement.setAttribute('aria-label', 'delete-task');

  listItemElement.appendChild(checkBoxElement);
  listItemElement.appendChild(labelElement);
  listItemElement.appendChild(editInputElement);
  listItemElement.appendChild(editButtonElement);
  listItemElement.appendChild(deleteButtonElement);

  return listItemElement;
}

function addTask(event) {
  event.preventDefault();
  if (!taskInputElement.value) return;
  const listItemElement = createNewTaskElement(taskInputElement.value);
  todoListElement.appendChild(listItemElement);
  bindTaskEvents(listItemElement, taskCompleted);
  taskInputElement.value = "";
}

function editTask() {
  const listItemElement = this.parentNode;
  const editInputElement = listItemElement.querySelector('input[type=text]');
  const labelElement = listItemElement.querySelector("label");
  const editBtnElement = this;
  const isEditMode = listItemElement.classList.toggle("editMode");

  if (isEditMode) {
    editInputElement.value = labelElement.innerText;
    editInputElement.style.display = "block";
    labelElement.classList.add("form__label_edit-mode");
    editBtnElement.innerText = "Save";
  } else {
    labelElement.innerText = editInputElement.value;
    editInputElement.style.display = "none";
    labelElement.classList.remove("form__label_edit-mode");
    editBtnElement.innerText = "Edit";
  }
}

function deleteTask() {
  const listItemElement = this.parentNode;
  const listElement = listItemElement.parentNode;
  if (listElement && listItemElement) listElement.removeChild(listItemElement);
}

function taskCompleted() {
  const listItemElement = this.parentNode;
  const labelElement = listItemElement.querySelector("label");
  if (listItemElement) {
    completedListElement.appendChild(listItemElement);
    bindTaskEvents(listItemElement, taskIncomplete);
    labelElement.classList.add("form__label_completed");
  }
}

function taskIncomplete() {
  const listItemElement = this.parentNode;
  if (listItemElement) {
    todoListElement.appendChild(listItemElement);
    bindTaskEvents(listItemElement, taskCompleted);
  }
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBoxElement = taskListItem.querySelector("input[type=checkbox]");
  const editButtonElement = taskListItem.querySelector("button.edit");
  const deleteButtonElement = taskListItem.querySelector("button.form__button_delete");

  if (checkBoxElement) checkBoxElement.onchange = checkBoxEventHandler;

  if (editButtonElement) editButtonElement.onclick = (event) => editTask.call(event.target);

  if (deleteButtonElement) deleteButtonElement.onclick = deleteTask;
}

addButtonElement.addEventListener("click", addTask);

for (let i = 0; i < todoListElement.children.length; i++) {
  bindTaskEvents(todoListElement.children[i], taskCompleted);
}

for (let i = 0; i < completedListElement.children.length; i++) {
  bindTaskEvents(completedListElement.children[i], taskIncomplete);
}