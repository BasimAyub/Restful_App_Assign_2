var express = require("express");
var router = express.Router();
var teacherC = require("../Controller/teacher");

router.get("/", teacherC.teacherController);
router.get("/viewattquiz/:cid", teacherC.viewAttemptedQuizesController);
router.post("/addQuiz", teacherC.addQuiz_Controller);
router.get("/viewattquiz/:aqid", teacherC.viewAttemptedQuizWithIdController);
router.delete("/delquiz/:id", teacherC.deleteQuiz_Controller);
router.get("/viewattassign/:cid", teacherC.viewAttemptedAssignmentsController);
router.post("/addassign", teacherC.addAssign_Controller);
router.get(
	"/viewattassign/:aaid",
	teacherC.viewAttemptedAssignmentWithIdController
);
router.delete("/delassignment/:id", teacherC.deleteAssignment_Controller);
router.post("/addmaterial", teacherC.addMaterial_Controller);
router.get("/materilas", teacherC.materialController);
router.delete("/delmaterial/:id", teacherC.deleteMaterial_Controller);
router.put(
	"/addmarks/:num/quiz/:qid",
	teacherC.assignMarks_toStudent_Controller
);
router.put(
	"/updatemarks/:num/student/:sid",
	teacherC.assignMarks_toStudent_Controller
);
router.delete("/delmarks/:id", teacherC.deleteMarks_Controller);

//assign quiz to class
router.put(
	"/assign/quiz/:qid/class/:cid",
	teacherC.assignQuiz_toClass_Controller
);

//assign assignment to class
router.put(
	"/assign/assignment/:aid/class/:cid",
	teacherC.assignAssignment_toClass_Controller
);

//assign material to class
router.put(
	"/assign/material/:mid/class/:cid",
	teacherC.assignMaterial_toClass_Controller
);

module.exports = router;
