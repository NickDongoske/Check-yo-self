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

plusButton.addEventListener('click', addTaskHandler);

makeTaskList.addEventListener('click', makeToDoList);

taskList.addEventListener('click', deleteTaskItem);

leftSideForm.addEventListener('click', clearAll);

leftSideTitleInput.addEventListener('change', checkTitleInput);

function makeToDoList() {
  var spans = document.querySelectorAll(".task-item");
  let tasks = [];
  for (var i = 0; i < spans.length; i++){
    var task = new Task(spans[i].innerText);
    tasks.push(task.text);
  };
  var list = document.createElement('ul');
  for (var i = 0; i < tasks.length; i++) {
    list.innerHTML += `<li>${tasks[i]}</li>`;
  };
  var toDoList = new ToDoList(currentId, `${leftSideTitleInput.value}`, tasks);
  rightSideCards.insertAdjacentHTML('afterbegin', `
    <section class="to-do-card">
      <div class="task-title">
        <h3 class="card-title">Task Title</h3>
        <hr class="task-card-line"/>
      </div>
      <div class="task-checklist">
      </div>`);
  document.querySelector('.card-title').innerText = `${leftSideTitleInput.value}`;
  document.querySelector('.task-checklist').innerHTML = list.toString();
console.log(tasks);
return list;

  // makeList(tasks);
  // document.querySelector('.task-checklist').appendChild(makeList(tasks));
}
  // <li><input class="to-do-checkbox" type="checkbox" name="Task Completed" value="">${makeList(tasks)}</li></ul><hr class="task-card-line"/></div><div class="task-btns"><div class="btn-group"><img class="urgency" src="images/urgent.svg" alt="Lightning Bolt To Show Urgency"><figcaption>Urgent</figcaption></div><div class="btn-group"><img class="delete-card"src="images/delete.svg" alt="Delete Button"><figcaption>Delete</figcaption></div></div></section>`);

function makeList(array) {
console.log(array)
  var list = document.createElement('ul');
  for(var i = 0; i < array.length; i++) {
    // var item = document.createElement('li');
    list.innerHTML += `<li>${array[i]}</li>`
    // console.log("item inside loop:::", item);
    // item.appendChild(document.createTextNode(array[i]));
    // list.appendChild(item);
    // list.insertAdjacentHTML("afterbegin", `
    // <li><input class="to-do-checkbox" type="checkbox" name="Task Completed" value="">${array[i]}</li>`);
  }
  //
  // console.log(list);
  return list;
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
  taskList.insertAdjacentHTML('beforeend', '<li class="list-item"><button type="button" name="delete-button" class="delete-button"><img class="delete-button" src="images/delete.svg" alt="Delete Button for Task Item"></button><span class="new-task-item task-item">Added</span></li>');
  document.querySelector('.new-task-item').innerText = `${taskItemInput.value}`;
  taskArray.push(`${taskItemInput.value}`);
  taskItemInput.value = '';
  document.querySelector('.new-task-item').classList.remove('new-task-item');
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
    removeError(leftSideTitleInput);
  }
}
