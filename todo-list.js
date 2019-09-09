class ToDoList {
  constructor (obj) {
    this.id = Date();
    this.title = obj.title;
    this.urgent = false;
    this.taskList = obj.taskList;
  }

  updateToDo () {
    // update urgency to false;
    // update title

  }

  updateTask(event) {
    // this.task.complete = true;
    event.target.closest('p').classList.add('task-card-checklist-checked');
    event.target.src = 'images/checkbox-active.svg';
    event.target.classList.remove('unchecked');
    // updated complete;
    // update css (image, italics and color)

  }
}

// module.exports = ToDoList;
