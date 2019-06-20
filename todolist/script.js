class ToDoClass {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("")) || [];
    this.loadTasks();
    this.addEventListener();
    this.tam;
    this.perform;
    this.resultCompleted;
    this.resultAcitve;
  }

  addEventListener() {
    document.getElementById("addTask").addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        this.addTask(event.target.value);
        event.target.value = "";
      }
    });
  }

  completeTodo(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this.loadTasks();
  }

  addTask(task) {
    let newTask = { task: task, isComplete: false };
    let parentDiv = document.getElementById("addTask").parentElement;
    if (task === "") {
      parentDiv.classList.add("has-error");
    } else {
      parentDiv.classList.remove("has-error");
      this.tasks.push(newTask);
      this.loadTasks();
    }
  }

  deleteTodo(event, id) {
    //event.preventDefault();
    this.perform = {
      task: this.tasks[id].task,
      isComplete: this.tasks[id].isComplete
    };
    this.tam = this.tasks.splice(id, 1);
    this.loadTasks();
    console.log(this.tam);

    var btn = document.createElement("button");
    btn.innerHTML = "undo";
    document.body.appendChild(btn);

    btn.setAttribute("onclick", "toDo.unDo()");
    btn.setAttribute("style", "background: green; margin-left: 50%");
    setTimeout(function() {
      btn.remove();
    }, 3000);
  }

  unDo() {
    this.tasks.push(this.perform);
    console.log(this.tasks);
    this.loadTasks();
  }

  addTaskClick() {
    let target = document.getElementById("addTask");
    this.addTask(target.value);
    target.value = "";
  }

  selectActive() {
    let resultActive = this.tasks.filter(
      element => element.isComplete === false
    );

    if (resultActive.length > 0) {
      let taskHtml = resultActive.reduce(
        (html, task, index) => (html += this.generateTaskHtml(task, index)),
        ""
      );
      document.getElementById("taskList").innerHTML = taskHtml;
    } else {
      alert("Khong co ket qua");
    }
    this.resultActive = resultActive.length;
    console.log(this.resultActive);
  }

  selectCompleted() {
    let resultCompleted = this.tasks.filter(
      element => element.isComplete === true
    );

    if (resultCompleted.length > 0) {
      let taskHtml = resultCompleted.reduce(
        (html, task, index) => (html += this.generateTaskHtml(task, index)),
        ""
      );
      document.getElementById("taskList").innerHTML = taskHtml;
    } else {
      alert("Khong co ket qua");
    }
    this.resultCompleted = resultCompleted.length;
    console.log(this.resultCompleted);
  }

  tinhtoan() {
    let tong = this.tasks.length;
    let complete = (this.resultCompleted / tong) * 100;
    let active = (this.resultActive / tong) * 100;
    console.log(complete);
    console.log(active);
  }

  saveEdit(event, index) {
    event.preventDefault();
    let valueEdit = document.getElementById(index).value;
    this.tasks[index].task = valueEdit;
    this.tasks[index].isComplete = false;
    this.loadTasks();
  }
  updateToDo(event, index) {
    event.preventDefault();
    let displaybtn = document.getElementById(index);
    this.tasks[index].isComplete = false;
    displaybtn.disabled = false;
    displaybtn.focus();
  }

  generateTaskHtml(task, index) {
    return `
           
            <li class="list-group-item checkbox" style ="padding: 3px 11px;">
            
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo(${index})" value="" class="" ${
      task.isComplete ? "checked" : ""
    }></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${
                  task.isComplete ? "complete" : ""
                }">
                <input type="text" class="form-control" id="${index}"disabled style="border:none;background: white" value="${
      task.task
    }">
                </div>
                <a class="functions">
                
                <a onClick="toDo.deleteTodo(event, ${index})"><i class="fa fa-trash" ></i></a>
                <a style= "padding-top: px;" href="" onClick="toDo.updateToDo(event, ${index})"><i class="fa fa-edit" ></i></a>
                <a style= "padding-top: px;" href="" onClick="toDo.saveEdit(event, ${index})"><i class="fa fa-check" ></i></a>
                </div>
            </div>
            </li>
        `;
  }

  loadTasks() {
    let taskHtml = this.tasks.reduce(
      (html, task, index) => (html += this.generateTaskHtml(task, index)),
      ""
    );
    document.getElementById("taskList").innerHTML = taskHtml;

    localStorage.setItem("", JSON.stringify(this.tasks));
  }
}

let toDo;
window.addEventListener("load", () => {
  toDo = new ToDoClass();
});
