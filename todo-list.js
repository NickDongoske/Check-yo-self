class ToDoList {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.urgent = false;
    this.taskList = obj.taskList;
  }

  // updateToDo () {
  //   update urgency to false;
  //   update title
  // }

  updateTask(event) {
    event.target.closest('p').classList.add('task-card-checklist-checked');
    event.target.src = 'images/checkbox-active.svg';
    this.task.complete = true;
    // updated complete;
    // update css (image, italics and color)

  }
}

// module.exports = ToDoList;
