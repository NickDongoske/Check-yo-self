class ToDoList {
  constructor (obj) {
    this.id = Date();
    this.title = obj.title;
    this.urgent = false;
    this.taskList = obj.taskList;
  }

  updateToDo () {
    if (this.urgent === false) {
      this.urgent = true;
    } else {
      this.urgent = false;
    }
  };

  updateTask(task) {
    if (task.complete === false) {
      task.complete = true;
    } else {
      task.complete = false;
    }
  }
}

// module.exports = ToDoList;
