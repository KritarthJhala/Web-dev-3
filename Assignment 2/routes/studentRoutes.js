const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../data/students");

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: getAllStudents() });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student id" });
  }

  const student = getStudentById(id);
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  res.status(200).json({ success: true, data: student });
});

router.post("/", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res
      .status(400)
      .json({ success: false, message: "Name and course are required" });
  }

  const newStudent = addStudent(name, course);
  res.status(201).json({ success: true, data: newStudent });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student id" });
  }

  const { name, course } = req.body;
  if (!name && !course) {
    return res
      .status(400)
      .json({ success: false, message: "Provide name or course to update" });
  }

  const updated = updateStudent(id, name, course);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  res.status(200).json({ success: true, data: updated });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student id" });
  }

  const deleted = deleteStudent(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  res.status(200).json({ success: true, message: "Student deleted successfully" });
});

module.exports = router;
