var taskItemInput = document.getElementById('left-side-task-input');
var plusButton = document.getElementById('plus-button');
var taskList = document.querySelector('.task-list');

plusButton.addEventListener('click', addTaskHandler);



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
  taskList.insertAdjacentHTML('beforeend', '<li><button type="button" name="delete-button" class="delete-button"><img class="delete-button" src="images/delete.svg" alt="Delete Button for Task Item"></button><span class="new-task-item">Added</span></li>');
  document.querySelector('.new-task-item').innerText = `${taskItemInput.value}`;
  taskItemInput.value = '';
  document.querySelector('.new-task-item').classList.remove('new-task-item');
}
