// var ToDoList = require('./todo-list');
// var Task = requires('task');

var taskItemInput = document.getElementById('left-side-task-input');
var leftSideTitleInput = document.getElementById('left-side-title-input').value;
var plusButton = document.getElementById('plus-button');
var taskList = document.querySelector('.task-list');
var makeTaskList = document.querySelector('#make-task-list');
var currentId = 0;
var taskArray = document.querySelectorAll('.task-item');
var rightSideCards = document.querySelector('.right-side-cards');


plusButton.addEventListener('click', addTaskHandler);

makeTaskList.addEventListener('click', makeToDoList);


function makeToDoList() {
  var toDoList = new ToDoList(currentId, leftSideTitleInput, taskArray);
  rightSideCards.insertAdjacentHTML('afterbegin', '<section class="to-do-card"><div class="task-title"><h3>Task Title</h3><hr class="task-card-line"/></div><div class"task-checklist"><ul class="checklist"><li><input class="to-do-checkbox" type="checkbox" name="Task Completed" value="">Hello</li></ul><hr class="task-card-line"/></div><div class="task-btns"><div class="btn-group"><img class="urgency" src="images/urgent.svg" alt="Lightning Bolt To Show Urgency"><figcaption>Urgent</figcaption></div><div class="btn-group"><img class="delete-card"src="images/delete.svg" alt="Delete Button"><figcaption>Delete</figcaption></div></div></section>');
  currentId++;
}


function addTaskHandler() {
  var bAddTaskHandler = true;
  if (taskItemInput.value === '') {
    errorBox(taskItemInput);
    bAddTaskHandler = false;
  } else {
    removeError(taskItemInput);
  }
  if (bAddTaskHandler) {
    createTaskItem();
  }
}

function errorBox(input) {
  input.style.border = '2px solid red';
}

function removeError(input) {
  input.style.border = '2px solid #1F1F3D';
}

function createTaskItem() {
  taskList.insertAdjacentHTML('beforeend', '<li class="task-item"><button type="button" name="delete-button" class="delete-button"><img class="delete-button" src="images/delete.svg" alt="Delete Button for Task Item"></button><span class="new-task-item">Added</span></li>');
  document.querySelector('.new-task-item').innerText = `${taskItemInput.value}`;
  taskItemInput.value = '';
  document.querySelector('.new-task-item').classList.remove('new-task-item');
}
