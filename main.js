// var ToDoList = require('./todo-list');
// var Task = requires('task');

var taskItemInput = document.getElementById('left-side-task-input');
var leftSideTitleInput = document.getElementById('left-side-title-input');
var plusButton = document.getElementById('plus-button');
var taskList = document.querySelector('.task-list');
var makeTaskList = document.querySelector('#make-task-list');
var toDoLists = [];
var rightSideCards = document.querySelector('.right-side-cards');
var leftSideForm = document.getElementById('left-side-form');
var output = '';
var clearAllButton = document.getElementById('clear-all-button');


plusButton.addEventListener('click', createTaskItem);

makeTaskList.addEventListener('click', makeToDoList);

taskList.addEventListener('click', deleteTaskItem);

leftSideForm.addEventListener('click', clearAll);

leftSideTitleInput.addEventListener('keyup', checkTitleInput);

taskItemInput.addEventListener('keyup', checkTaskInput);

rightSideCards.addEventListener('click', changeCardContent);

window.addEventListener('load', grabCurrentCards)

function grabCurrentCards() {
  resetButtons();
  reInstantiateObjects();
};


function reInstantiateObjects() {
  var parsedList = JSON.parse(localStorage.getItem("Mega List of To-Dos"));
  for (var i = 0; i < parsedList.length; i++) {
    var tasks = [];
    var toDoList = new ToDoList({title: parsedList[i].title, id: parsedList[i].id, taskList: parsedList[i].taskList, urgent: parsedList[i].urgent});
    for (var index = 0; index < toDoList.taskList.length; index++) {
      var task = new Task(toDoList.taskList[index].text, toDoList.taskList[index].complete);
      tasks.push(task);
    }
    toDoList.taskList = tasks;
    createCard(parsedList[i]);
    toDoLists.push(toDoList);
  }
};

function resetButtons() {
  makeTaskList.disabled = true;
  clearAllButton.disabled = true;
  plusButton.disabled = true;
};

function makeToDoList() {
  var toDoList = new ToDoList({taskList: instantiateTask(), title: leftSideTitleInput.value});
  toDoLists.push(toDoList);
  createCard(toDoList);
  resetButtons();
  taskList.innerHTML = '';
  leftSideTitleInput.value = ' ';
  toDoList.saveToStorage(toDoList, toDoLists);
};

function instantiateTask() {
  var spans = document.querySelectorAll(".task-item");
  var tasks = [];
  for (var i = 0; i < spans.length; i++){
    var task = new Task(spans[i].innerText);
    tasks.push(task);
  }
  return tasks;
};

function makeList(array) {
  var list = document.createElement('div');
  list.classList.add('task-checklist');
  for(var i = 0; i < array.length; i++) {
    if (array[i].complete === true) {
      list.innerHTML += `<p class="task-card-checklist task-card-checklist-checked" contenteditable= "true"><img data-taskid="${array[i].text}" src="images/checkbox-active.svg" class="checkbox">${array[i].text}</p>`
    } else {
      list.innerHTML += `<p class="task-card-checklist" contenteditable= "true"><img data-taskid="${array[i].text}" src="images/checkbox.svg" class="checkbox unchecked">${array[i].text}</p>`
    }
  }
  return list.innerHTML;
};

function errorBox(input) {
  input.style.border = '2px solid red';
};

function removeError(input) {
  input.style.border = '2px solid #1F1F3D';
};

function createTaskItem() {
  taskList.insertAdjacentHTML('beforeend', '<li class="list-item"><button type="button" name="delete-button" class="delete-button"><img class="delete-button" src="images/delete.svg" alt="Delete Button for Task Item"></button><span class="new-task-item task-item">Added</span></li>');
  document.querySelector('.new-task-item').innerText = `${taskItemInput.value}`;
  taskItemInput.value = '';
  document.querySelector('.new-task-item').classList.remove('new-task-item');
  plusButton.disabled = true;
};

function deleteTaskItem(event) {
  if (event.target.classList.contains('delete-button')) {
    event.target.closest('li').remove();
  }
};

function clearAll(event) {
  if (leftSideTitleInput.value === '' && taskList.innerHTML === '') {
    clearAllButton.disabled = true;
    errorBox(leftSideTitleInput);
  } else if (event.target.classList.contains('clear-all')) {
    taskItemInput.value = '';
    leftSideTitleInput.value = '';
    taskList.innerHTML = '';
    removeError(leftSideTitleInput);
  }
};

function checkTitleInput() {
  if (leftSideTitleInput.value !== '') {
    clearAllButton.disabled = false;
    makeTaskList.disabled = false;
    removeError(leftSideTitleInput);
  }
};

function checkTaskInput() {
  if (taskItemInput.value !== '') {
    plusButton.disabled = false;
    removeError(taskItemInput);
  }
};

function changeCardContent(event) {
  toggleTask(event);
  toggleUrgency(event);
  deleteToDo(event);
};

function toggleTask(event) {
  if (event.target.classList.contains('unchecked')) {
    findIndex().updateTask(findTask(findIndex()), toDoLists);
    event.target.closest('p').classList.add('task-card-checklist-checked');
    event.target.src = 'images/checkbox-active.svg';
    event.target.classList.remove('unchecked');
  } else if (event.target.classList.contains('checkbox')) {
    findIndex().updateTask(findTask(findIndex()), toDoLists);
    event.target.closest('p').classList.add('task-card-checklist');
    event.target.closest('p').classList.remove('task-card-checklist-checked');
    event.target.src = 'images/checkbox.svg';
    event.target.classList.add('unchecked');
  }
};

function toggleUrgency(event) {
  if (event.target.classList.contains('card-not-urgent')) {
    findIndex().updateToDo(toDoLists);
    event.target.src = 'images/urgent-active.svg';
    event.target.classList.remove('card-not-urgent');
    event.target.closest('section').classList.add('to-do-card-urgent');
    event.target.closest('figcaption').classList.add('fig-urgent');
  } else if (event.target.classList.contains('urgency')) {
    findIndex().updateToDo(toDoLists);
    event.target.src = 'images/urgent.svg';
    event.target.classList.add('card-not-urgent');
    event.target.closest('section').classList.remove('to-do-card-urgent');
    event.target.closest('figcaption').classList.remove('fig-urgent');
  }
};

function deleteToDo(event) {
  if ((event.target.classList.contains('delete-card')) && (checkComplete(findIndex().taskList))) {
      event.target.closest('section').remove();
      var currentIndex = findIndex();
      toDoLists.splice(toDoLists.indexOf(currentIndex), 1);
      currentIndex.deleteFromStorage(toDoLists);
  }
};

function findIndex() {
  for (var i = 0; i < toDoLists.length; i++) {
    if (toDoLists[i].id === event.target.parentNode.parentNode.parentNode.dataset.id) {
      return toDoLists[i];
    }
  }
};

function findTask(toDoList) {
  for (var i = 0; i < toDoList.taskList.length; i++) {
    if (toDoList.taskList[i].text === event.target.dataset.taskid) {
      return findIndex().taskList[i];
    }
  }
};

function checkComplete(taskList) {
  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].complete === false) {
      return false;
    }
  }
  return true;
};

function createCard(toDoList) {
  if (toDoList.urgent === true) {
    rightSideCards.insertAdjacentHTML('afterbegin', `
    <section data-id="${toDoList.id}" data-title="${toDoList.title}" class="to-do-card-urgent to-do-card">
      <div class="task-title">
        <h3 contenteditable= "true" class="card-title">${toDoList.title}</h3>
        <hr class="task-card-line"/>
      </div>
      <div class="task-checklist">
        ${makeList(toDoList.taskList)}
        <hr class="task-card-line"/>
      </div>
      <div class="task-btns">
        <div class="btn-group">
          <img class="urgency" src="images/urgent-active.svg" alt="Lightning Bolt To Show Urgency">
          <figcaption class="fig-caption fig-urgent">Urgent</figcaption>
        </div>
        <div class="btn-group">
          <img class="delete-card"src="images/delete.svg" alt="Delete Button">
          <figcaption>Delete</figcaption>
        </div>
      </div>
    </section>`);
  } else {
  rightSideCards.insertAdjacentHTML('afterbegin', `
  <section data-id="${toDoList.id}" data-title="${toDoList.title}" class="to-do-card">
    <div class="task-title">
      <h3 contenteditable= "true" class="card-title">${toDoList.title}</h3>
      <hr class="task-card-line"/>
    </div>
    <div class="task-checklist">
      ${makeList(toDoList.taskList)}
      <hr class="task-card-line"/>
    </div>
    <div class="task-btns">
      <div class="btn-group">
        <img class="urgency card-not-urgent" src="images/urgent.svg" alt="Lightning Bolt To Show Urgency">
        <figcaption class="fig-caption">Urgent</figcaption>
      </div>
      <div class="btn-group">
        <img class="delete-card"src="images/delete.svg" alt="Delete Button">
        <figcaption>Delete</figcaption>
      </div>
    </div>
  </section>`);
  }
};
