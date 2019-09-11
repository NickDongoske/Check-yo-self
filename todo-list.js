class ToDoList {
  constructor (obj) {
    this.id = obj.id || Date();
    this.title = obj.title;
    this.urgent = obj.urgent || false;
    this.taskList = obj.taskList;
  }

  updateToDo (listOfToDos) {
    if (this.urgent === false) {
      this.urgent = true;
      localStorage.removeItem("Mega List of To-Dos");
      localStorage.setItem("Mega List of To-Dos", JSON.stringify(listOfToDos));
    } else {
      this.urgent = false;
      localStorage.removeItem("Mega List of To-Dos");
      localStorage.setItem("Mega List of To-Dos", JSON.stringify(listOfToDos));
    }
  };

  updateTask(task, listOfToDos) {
    if (task.complete === false) {
      task.complete = true;
      localStorage.removeItem("Mega List of To-Dos");
      localStorage.setItem("Mega List of To-Dos", JSON.stringify(listOfToDos));
    } else {
      task.complete = false;
      localStorage.removeItem("Mega List of To-Dos");
      localStorage.setItem("Mega List of To-Dos", JSON.stringify(listOfToDos));
    }
  }

  saveToStorage(toDoList, listOfToDos) {
    localStorage.setItem(`To Do List ${this.title}`, JSON.stringify(toDoList));
    localStorage.removeItem("Mega List of To-Dos");
    localStorage.setItem("Mega List of To-Dos", JSON.stringify(listOfToDos));
  }

  deleteFromStorage() {

  }
}

// module.exports = ToDoList;
