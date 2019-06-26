let students = [
  { id: "jeruy", name: "Thuy", class: "PNV20A" },
  { id: "je2uy", name: "Thuong", class: "PNV20B" },
  { id: "je1uy", name: "Nhung", class: "PNV19A" }
];

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

let addStudent = () => {
  let newStudent = {
    id: randomId(5),
    name: document.getElementById("name").value,
    class: randomClass()
  };

  students.push(newStudent);
  console.log(students);
  showStudent();
};
let edit = () => {
  var r = confirm("Bạn có muốn chỉnh sửa");
  if (r == true) {
    document.getElementById("add").style.display = "none";
    document.getElementById("edit").style.display = "block";
  } else {
  }
};
let showStudent = () => {
  document.getElementById("add").style.display = "block";
  document.getElementById("edit").style.display = "none";
  var col = [];
  for (var i = 0; i < students.length; i++) {
    for (var key in students[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (let i = 0; i < students.length; i++) {
    tr = table.insertRow(-1);
    for (let j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = students[i][col[j]];
    }
    tr.addEventListener("click", edit);
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("myTable");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
};
showStudent();
