var express = require("express");
var router = express.Router();
var studentC = require("../Controller/student");

// GET Operations
router.get("/", studentC.student_Controller);
router.get("/viewquiz", studentC.QuizController);
router.get("/viewassignment", studentC.AssignmentController);
router.get("/viewmaterial", studentC.MaterialController);
router.get("/material/:id", studentC.Material_Find_With_Id_Controller);
router.get("/result/sid", studentC.result_Controller);
router.get("/result/:id", studentC.result_Controller);

// POST Operations
router.put("/attemptquiz/:sid", studentC.attempt_Quiz_Controller);
router.post("/submitassignment", studentC.submit_Assign_Controller);
module.exports = router;
