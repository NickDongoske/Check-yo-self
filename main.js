// var ToDoList = require('./todo-list');
// var Task = requires('task');

var taskItemInput = document.getElementById('left-side-task-input');
var leftSideTitleInput = document.getElementById('left-side-title-input');
var plusButton = document.getElementById('plus-button');
var taskList = document.querySelector('.task-list');
var makeTaskList = document.querySelector('#make-task-list');
var currentId = 0;
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

resetButtons();

function resetButtons() {
  makeTaskList.disabled = true;
  clearAllButton.disabled = true;
  plusButton.disabled = true;
}

function makeToDoList() {
  var spans = document.querySelectorAll(".task-item");
  let tasks = [];
  for (var i = 0; i < spans.length; i++){
    var task = new Task(spans[i].innerText);
    tasks.push(task);
  };
  var toDoList = new ToDoList({taskList: tasks, title: leftSideTitleInput.value});
  toDoLists.push(toDoList);
  rightSideCards.insertAdjacentHTML('afterbegin', `
    <section class="to-do-card">
      <div class="task-title">
        <h3 contenteditable= "true" class="card-title">Task Title</h3>
        <hr class="task-card-line"/>
      </div>
      <div class="task-checklist">
      ${makeList(tasks)}
      <hr class="task-card-line"/>
      </div>
      <div class="task-btns">
      <div class="btn-group">
        <img class="urgency card-not-urgent" src="images/urgent.svg" alt="Lightning Bolt To Show Urgency">
        <figcaption class="fig-caption">Urgent</figcaption>
      </div>
      <div class="btn-group"><img class="delete-card"src="images/delete.svg" alt="Delete Button">
      <figcaption>Delete</figcaption>
      </div>
      </div>
    </section>`);
  document.querySelector('.card-title').innerText = `${leftSideTitleInput.value}`;

  resetButtons();
  taskList.innerHTML = '';
  leftSideTitleInput.value = ' ';
  console.log(toDoList);
}
  // <li><input class="to-do-checkbox" type="checkbox" name="Task Completed" value="">${makeList(tasks)}</li></ul><hr class="task-card-line"/></div><div class="task-btns"><div class="btn-group"><img class="urgency" src="images/urgent.svg" alt="Lightning Bolt To Show Urgency"><figcaption>Urgent</figcaption></div><div class="btn-group"><img class="delete-card"src="images/delete.svg" alt="Delete Button"><figcaption>Delete</figcaption></div></div></section>`);

function makeList(array) {
console.log(array)
  var list = document.createElement('div');
  list.classList.add('task-checklist');
  for(var i = 0; i < array.length; i++) {
    list.innerHTML += `<p class="task-card-checklist" contenteditable= "true"><img src="images/checkbox.svg" class="checkbox unchecked">${array[i].text}</p>`
  }
  return list.innerHTML;
}

function errorBox(input) {
  input.style.border = '2px solid red';
}

function removeError(input) {
  input.style.border = '2px solid #1F1F3D';
}

function createTaskItem() {
  taskList.insertAdjacentHTML('beforeend', '<li class="list-item"><button type="button" name="delete-button" class="delete-button"><img class="delete-button" src="images/delete.svg" alt="Delete Button for Task Item"></button><span class="new-task-item task-item">Added</span></li>');
  document.querySelector('.new-task-item').innerText = `${taskItemInput.value}`;
  taskItemInput.value = '';
  document.querySelector('.new-task-item').classList.remove('new-task-item');
  plusButton.disabled = true;
}

function deleteTaskItem(event) {
  if (event.target.classList.contains('delete-button')) {
    event.target.closest('li').remove();
  }
}

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
}

function checkTitleInput() {
  if (leftSideTitleInput.value !== '') {
    clearAllButton.disabled = false;
    makeTaskList.disabled = false;
    removeError(leftSideTitleInput);
  }
}

function checkTaskInput() {
  if (taskItemInput.value !== '') {
    plusButton.disabled = false;
    removeError(taskItemInput);
  }
}

function changeCardContent(event) {
  // if the event.target is a checkbox, then change image and css of taskObject

  if (event.target.classList.contains('unchecked')) {
    // toDoLists[0].updateTask();
    event.target.closest('p').classList.add('task-card-checklist-checked');
    event.target.src = 'images/checkbox-active.svg';
    event.target.classList.remove('unchecked');
  } else if (event.target.classList.contains('checkbox')) {
    event.target.closest('p').classList.add('task-card-checklist');
    event.target.closest('p').classList.remove('task-card-checklist-checked');
    event.target.src = 'images/checkbox.svg';
    event.target.classList.add('unchecked');
  }
  // if the event.target has deletebutton class then delete the whole toDoList object
  // if the event.target is an urgency button then change css stuff and toDoList urgency property
  if (event.target.classList.contains('card-not-urgent')) {
    // findToDoList();
    event.target.src = 'images/urgent-active.svg';
    event.target.classList.remove('card-not-urgent');
    event.target.closest('section').classList.add('to-do-card-urgent');
    event.target.closest('figcaption').classList.add('fig-urgent');
  } else if (event.target.classList.contains('urgency')) {
    event.target.src = 'images/urgent.svg';
    event.target.classList.add('card-not-urgent');
    event.target.closest('section').classList.remove('to-do-card-urgent');
    event.target.closest('figcaption').classList.remove('fig-urgent');
  }

  if (event.target.classList.contains('delete-card')) {
    event.target.closest('section').remove();
  }
}

// function findToDoList(event) {
//   for (var i = 0; i < toDoLists.length; i++) {
//     if (event.target.closest('h3').innerText === toDoLists[i].title) {
//       event.target.src = 'images/urgent-active.svg';
//       event.target.classList.remove('card-not-urgent');
//       event.target.closest('section').classList.add('to-do-card-urgent');
//       event.target.closest('figcaption').classList.add('fig-urgent');
//     }
//   }
// }
