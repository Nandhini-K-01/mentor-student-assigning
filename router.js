const { application } = require("express");
const express = require("express");
const models = require("./models");

const router = express.Router();

router.post("/creatementor", models.createMentor);
router.post("/createstudent", models.createStudent);
router.get("/getstudents", models.getStudent);
router.get("/getmentors", models.getMentor);
router.put("/assignstudent/:id", models.assignStudent);
router.put("/changeorassignmentor/:id", models.changeorAssignMentor);
router.get("/studentdetails", models.getAllStudents);

module.exports = router;
