class ToDoClass {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("")) || [];
    this.loadTasks();
    this.addEventListener();
    this.index;
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

  completeTodo(id) {
    let m = this.tasks.findIndex(item => item.id == id);
    console.log(m);
    this.tasks[m].isComplete = !this.tasks[m].isComplete;
    this.loadTasks();
  }
  completeAll() {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].isComplete = true;
    }
    this.loadTasks();

    console.log(this.tasks);
  }
  removeComplete = () => {
    let a = (this.tasks = this.tasks.filter(t => !t.isComplete));
    this.loadTasks();
  };

  updateToDo(event, id) {
    event.preventDefault();
    let index = this.tasks.findIndex(item => item.id == id);
    let displaybtn = document.getElementById(id);
    this.tasks[index].isComplete = false;
    displaybtn.disabled = false;
    displaybtn.focus();

    let update = document.getElementById("update-" + id);
    update.hidden = true;

    let save = document.getElementById("save-" + id);
    save.hidden = false;
  }

  saveEdit(event, id) {
    event.preventDefault();
    let index = this.tasks.findIndex(item => item.id == id);
    let valueEdit = document.getElementById(id).value;
    this.tasks[index].task = valueEdit;
    this.tasks[index].isComplete = false;
    this.loadTasks();
  }

  addTask(task) {
    let newTask = { id: toDo.randomId(5), task: task, isComplete: false };
    let parentDiv = document.getElementById("addTask").parentElement;
    if (task === "") {
      parentDiv.classList.add("has-error");
    } else {
      parentDiv.classList.remove("has-error");
      this.tasks.push(newTask);
      this.loadTasks();
    }
    console.log(this.tasks);
  }

  deleteTodo(event, id) {
    let m = this.tasks.findIndex(item => item.id == id);
    // this.index = m;
    // console.log(this.index);

    this.perform = {
      id: this.tasks[m].id,
      task: this.tasks[m].task,
      isComplete: this.tasks[m].isComplete
    };
    console.log(this.perform);
    this.tasks.splice(m, 1);
    this.loadTasks();

    var btn = document.createElement("button");
    btn.innerHTML = "undo";
    document.body.appendChild(btn);

    btn.setAttribute("onclick", "toDo.unDo()");
    btn.setAttribute("id", "button");
    btn.setAttribute("style", "background: green; margin-left: 50%");
    setTimeout(function() {
      btn.remove();
    }, 3000);
  }

  unDo() {
    this.tasks.splice(this.index, 0, this.perform);
    var btn = document.getElementById("button");
    btn.remove();
    console.log(this.tasks);
    this.loadTasks();
  }

  randomId(len) {
    var rdmString = "";
    for (
      ;
      rdmString.length < len;
      rdmString += Math.random()
        .toString(36)
        .substr(2)
    );
    return rdmString.substr(0, len);
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
    let complete = Math.round((this.resultCompleted / tong) * 100);
    let active = Math.round((this.resultActive / tong) * 100);
    console.log(" Hoan thanh " + complete + "%");
    console.log(" Chua Hoan thanh " + active + "%");
    // var lable = document.createElement("lable");
    // lable.innerHTML = " Hoan thanh " + complete + "%";
    // document.body.appendChild(lable);

    // lable.setAttribute("id", "lable");
    // lable.setAttribute("class", "label label-success");
    // lable.setAttribute("style", "font-size: 250%;");
    // setTimeout(function() {
    //   lable.remove();
    // }, 5000);
  }

  generateTaskHtml(task, id) {
    return `
           
            <li class="list-group-item checkbox" style ="padding: 3px 11px;">
            
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo('${
                  task.id
                }')" value="" class="" ${
      task.isComplete ? "checked" : ""
    }></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${
                  task.isComplete ? "complete" : ""
                }">
                <input type="text" class="form-control" id=${
                  task.id
                } disabled style=" border:none; background:white" value="${
      task.task
    }">
                </div>
                <div>
                <a class="functions">
                <a onClick="toDo.deleteTodo(event, '${
                  task.id
                }')"><i class="fa fa-trash" ></i></a>
                <a style= "padding-top: px;" id="update-${
                  task.id
                }" onClick="toDo.updateToDo(event, '${
      task.id
    }')"><i class="fa fa-pencil" ></i></a>     
                <a hidden style= "padding-top: px;" id="save-${
                  task.id
                }" onClick="toDo.saveEdit(event, '${
      task.id
    }')">   <i class="fa fa-check" ></i></a>          
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
