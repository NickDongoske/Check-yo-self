class ToDoList {
  constructor (obj) {
    this.id = obj.id || Date();
    this.title = obj.title;
    this.urgent = obj.urgent || false;
    this.taskList = obj.taskList;
  };

  updateToDo (listOfToDos) {
    if (this.urgent === false) {
      this.urgent = true;
      this.updateStorage(listOfToDos);
    } else {
      this.urgent = false;
      this.updateStorage(listOfToDos);
    }
  };

  updateTask(task, listOfToDos) {
    if (task.complete === false) {
      task.complete = true;
      this.updateStorage(listOfToDos);
    } else {
      task.complete = false;
      this.updateStorage(listOfToDos);
    }
  };

  saveToStorage(toDoList, listOfToDos) {
    localStorage.setItem(`To Do List ${this.title}`, JSON.stringify(toDoList));
    this.updateStorage(listOfToDos);
  };

  deleteFromStorage(listOfToDos) {
    localStorage.removeItem(`To Do List ${this.title}`);
    this.updateStorage(listOfToDos);
  };

  updateStorage(listOfToDos) {
    localStorage.removeItem("Mega List of To-Dos");
    localStorage.setItem("Mega List of To-Dos", JSON.stringify(listOfToDos));
  };
};

// module.exports = ToDoList;
