// var ToDoList = require('./todo-list');
// var Task = requires('task');

var taskItemInput = document.getElementById('left-side-task-input');
var leftSideTitleInput = document.getElementById('left-side-title-input');
var plusButton = document.getElementById('plus-button');
var taskList = document.querySelector('.task-list');
var makeTaskList = document.querySelector('#make-task-list');
var currentId = 0;
var taskArray = [];
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
    tasks.push(task.text);
  };
  var toDoList = new ToDoList({taskList: tasks, title: leftSideTitleInput.value});
  rightSideCards.insertAdjacentHTML('afterbegin', `
    <section class="to-do-card">
      <div class="task-title">
        <h3 class="card-title">Task Title</h3>
        <hr class="task-card-line"/>
      </div>
      <div class="task-checklist">
      ${makeList(tasks)}
      <hr class="task-card-line"/>
      </div>
      <div class="task-btns">
      <div class="btn-group">
        <img class="urgency" src="images/urgent.svg" alt="Lightning Bolt To Show Urgency">
        <figcaption>Urgent</figcaption>
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
}
  // <li><input class="to-do-checkbox" type="checkbox" name="Task Completed" value="">${makeList(tasks)}</li></ul><hr class="task-card-line"/></div><div class="task-btns"><div class="btn-group"><img class="urgency" src="images/urgent.svg" alt="Lightning Bolt To Show Urgency"><figcaption>Urgent</figcaption></div><div class="btn-group"><img class="delete-card"src="images/delete.svg" alt="Delete Button"><figcaption>Delete</figcaption></div></div></section>`);

function makeList(array) {
console.log(array)
  var list = document.createElement('div');
  list.classList.add('task-checklist');
  for(var i = 0; i < array.length; i++) {
    list.innerHTML += `<p class="task-card-checklist"><img src="images/checkbox.svg" class="checkbox">${array[i]}</p>`
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
  taskArray.push(`${taskItemInput.value}`);
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
  if(leftSideTitleInput.value === '' && taskList.innerHTML === '') {
    clearAllButton.disabled = true;
    errorBox(leftSideTitleInput);
} else if(event.target.classList.contains('clear-all')) {
    taskItemInput.value = '';
    leftSideTitleInput.value = '';
    taskList.innerHTML = '';
    removeError(leftSideTitleInput);
  }
}

function checkTitleInput() {
  if(leftSideTitleInput.value !== '') {
    clearAllButton.disabled = false;
    makeTaskList.disabled = false;
    removeError(leftSideTitleInput);
  }
}

function checkTaskInput() {
  if(taskItemInput.value !== '') {
    plusButton.disabled = false;
    removeError(taskItemInput);
  }
}
