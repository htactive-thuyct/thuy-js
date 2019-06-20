var TIME_OUT = 5;

// funtion show confirm on click
document.getElementById("delete").addEventListener("click", function() {
  var confirmTitle = "Are you sure?";
  var confirmDesc =
    "Your action will erase the data, can not recoverable. Be careful!";

  showConfirm(confirmTitle, confirmDesc);
});

// function show confirm
function showConfirm(title, desc) {
  document
    .getElementsByClassName("confirm")[0]
    .setAttribute("style", "display: block");

  var confirmTitle = document.getElementsByClassName(
    "confirm-content-title"
  )[0];
  var confirmDesc = document.getElementsByClassName("confirm-content-desc")[0];

  confirmTitle.innerHTML = title;
  confirmDesc.innerHTML = desc;
}

// close confirm event
document.getElementById("cancle").addEventListener("click", function() {
  var confirm = document.getElementsByClassName("confirm")[0];
  confirm.setAttribute("style", "display: none");
  console.log("Da close confirm");
});

// delete event
document.getElementById("confirm-delete").addEventListener("click", function() {
  var confirm = document.getElementsByClassName("confirm")[0];
  confirm.setAttribute("style", "display: none");
  console.log("Da xoa");

  // show undo button
  showUndoButton(TIME_OUT);
});

function showUndoButton() {
  var undoButton = document.createElement("button");
  undoButton.setAttribute("id", "undo");

  // Add undo button to DOM tree
  document.getElementById("action-area").appendChild(undoButton);

  countDown();

  // Create event when click undo
  document.getElementById("undo").addEventListener("click", function() {
    console.log("Da undo");
  });
}

function countDown() {
  var timeOut = setTimeout("countDown()", 1000);
  document.getElementById("undo").innerText = "Undo (" + TIME_OUT + ")";
  console.log(TIME_OUT);
  TIME_OUT--;

  if (TIME_OUT <= 0) {
    overTime(timeOut);
  }
}

function overTime(timeOut) {
  clearTimeout(timeOut);
  document.getElementById("undo").remove();
}
