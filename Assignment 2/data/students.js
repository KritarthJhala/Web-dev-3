let students = [
  { id: 1, name: "Rahul", course: "BCA" },
  { id: 2, name: "Priya", course: "BTech" },
  { id: 3, name: "Amit", course: "BCA" },
];

let nextId = 4;

function getAllStudents() {
  return students;
}

function getStudentById(id) {
  return students.find((s) => s.id === id);
}

function addStudent(name, course) {
  const newStudent = { id: nextId++, name, course };
  students.push(newStudent);
  return newStudent;
}

function updateStudent(id, name, course) {
  const student = getStudentById(id);
  if (!student) return null;
  if (name !== undefined) student.name = name;
  if (course !== undefined) student.course = course;
  return student;
}

function deleteStudent(id) {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return false;
  students.splice(index, 1);
  return true;
}

module.exports = {getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent,};
