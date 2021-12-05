var express = require("express");
var router = express.Router();
var studentC = require("../Controller/student");

// GET Operations
router.get("/", studentC.student_Controller);
router.get("/viewquiz/:cid", studentC.QuizController);
router.get("/viewassignment/:cid", studentC.AssignmentController);
router.get("/viewmaterial/:cid", studentC.MaterialController);
router.get("/material/:mid", studentC.Material_Find_With_Id_Controller);
router.get("/results/:sid", studentC.result_Controller);
router.get("/result/:cid", studentC.result_forClass_Controller);

// POST Operations
router.post("/attemptquiz/:sid/:qid/:cid", studentC.attempt_Quiz_Controller);
router.post(
	"/submitassignment/:sid/:aid/:cid",
	studentC.submit_Assign_Controller
);
module.exports = router;
