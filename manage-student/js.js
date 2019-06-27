let students = JSON.parse(localStorage.getItem("sinhvien"));
let randomId = len => {
  var rdmString = "";
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random()
      .toString(36)
      .substr(2)
  );
  return rdmString.substr(0, len);
};

let classes = ["PNV20A", "PNV20B", "PNV19A", "PNV19B"];

let randomClass = () => {
  let temp = document.getElementById("class").value;
  if (temp === "") {
    temp = classes[Math.floor(Math.random() * classes.length)];
  }
  return temp;
};
let showAdd = () => {
  document.getElementById("add").style.display = "block";
};
let addStudent = () => {
  let newStudent = {
    id: randomId(5),
    name: document.getElementById("name").value,
    class: randomClass()
  };

  students.push(newStudent);
  loadStudent();

  // students.push(newStudent);
  console.log(students);
};

let search = () => {
  var inputSearch = document.getElementById("inputSearch").value;
};
search();
let updateStudent = id => {
  let index = students.findIndex(item => item.id == id);
  console.log(index);
  let lbId = document.getElementById(id + "-id");
  let lbName = document.getElementById(id + "-name");
  let lbClass = document.getElementById(id + "-class");
  lbId.removeAttribute("readonly");
  lbName.removeAttribute("readonly");
  lbClass.removeAttribute("readonly");
  focus();

  let update = document.getElementById("update-" + id);
  update.hidden = true;

  let save = document.getElementById("save-" + id);
  save.hidden = false;
};

let saveStudent = id => {
  let index = students.findIndex(item => item.id == id);
  let vlID = document.getElementById(id + "-id").value;
  let vlName = document.getElementById(id + "-name").value;
  let vlClass = document.getElementById(id + "-class").value;
  students[index].id = vlID;
  students[index].name = vlName;
  students[index].class = vlClass;
  loadStudent();
};

let deleteStudent = id => {
  let index = students.findIndex(item => item.id == id);
  console.log(index);

  students.splice(index, 1);
  loadStudent();
};
let showStudent = hs => {
  return `
  <tr>
  <td style="hieght: 20px"> <input type="text" class="form-control" id="${
    hs.id
  }-id" readonly style="border:none;background-color:#fff" value=" ${
    hs.id
  }"></td>
  <td> <input type="text" class="form-control" id="${
    hs.id
  }-name" readonly style="border:none;background-color:#fff" value="${
    hs.name
  }"> </td>
  <td> <input type="text" class="form-control" id="${
    hs.id
  }-class" readonly style="border:none;background-color:#fff" value="${
    hs.class
  }"></td>
  <td><a href="#" id="update-${hs.id}"  onclick="updateStudent('${
    hs.id
  }')"><i class="fa fa-pencil" style="color:#634416"></i></a>&nbsp&nbsp
  <a href="#" id="save-${hs.id}" hidden onclick ="saveStudent('${
    hs.id
  }')"><i class="fa fa-check" style="color:green"></i></a>&nbsp&nbsp
  <a href="#" onclick ="deleteStudent('${
    hs.id
  }')"><i class="fa fa-trash" style="color:red"></i></a>&nbsp&nbsp
  </td>
</tr>
  `;
};
let loadStudent = () => {
  let studentHtml = students.reduce(
    (html, hs, index) => (html += showStudent(hs, index)),
    ""
  );
  document.getElementById("student-body").innerHTML = studentHtml;

  // document.getElementById("edit").style.display = "none";
  localStorage.setItem("sinhvien", JSON.stringify(students));
};
loadStudent();
