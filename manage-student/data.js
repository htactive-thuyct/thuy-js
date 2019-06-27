const students = [
  { id: "jeruy", name: "Thuy", class: "PNV20A" },
  { id: "je2uy", name: "Thuong", class: "PNV20B" },
  { id: "je1uy", name: "Nhung", class: "PNV19A" }
];

const Teacher = [
  { id: 1, name: "Hồng Nhung", gender: "Female", idClass: 1 },
  { id: 2, name: "Công Đình", gender: "Male", idClass: 2 },
  { id: 3, name: "Thùy Trang", gender: "Female", idClass: 3 },
  { id: 4, name: "Anh Duy", gender: "Male", idClass: 4 }
];

const Class = [
  { id: 1, name: "PNV20A", idTeacher: 1 },
  { id: 2, name: "PNV20B", idTeacher: 2 },
  { id: 3, name: "PNV21B", idTeacher: 3 },
  { id: 4, name: "PNV21A", idTeacher: 4 }
];

const Subject = [
  { id: 1, nameSub: "IT" },
  { id: 2, nameSub: "PLT" },
  { id: 3, nameSub: "XML" },
  { id: 4, nameSub: "OOP" }
];

const Score = [
  { idSub: 1, idStudent: 1, nameSub: "IT", score: 10 },
  { idSub: 2, idStudent: 2, nameSub: "PLT", score: 8 },
  { idSub: 3, idStudent: 3, nameSub: "XML", score: 5 },
  { idSub: 4, idStudent: 4, nameSub: "OOP", score: 9 }
];

let data = JSON.parse(localStorage.getItem("sinhvien"));
if (data === null || data === undefined) {
  localStorage.setItem("sinhvien", JSON.stringify(students));
  //   localStorage.setItem("giaovien", JSON.stringify(Teacher));
  //   localStorage.setItem("lop", JSON.stringify(Class));
  //   localStorage.setItem("monhoc", JSON.stringify(Subject));
  //   localStorage.setItem("diem", JSON.stringify(Score));
}
