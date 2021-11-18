var express = require("express");
var router = express.Router();
var teacherC = require("../Controller/teacher");

/* GET Operations */
router.get("/", teacherC.teacherController);
router.get("/viewattquiz", teacherC.viewAttemptedQuizesController);
router.get("/quiz/:id", teacherC.Quiz_Find_With_Id_Controller);
router.get("/viewattassign", teacherC.viewAttemptedAssignmentsController);
router.get("/assign/:id", teacherC.Assignment_Find_With_Id_Controller);
router.get("/materilas", teacherC.materialController);

//POST Operations
router.post("/addQuiz", teacherC.addQuiz_Controller);
router.post("/addassign", teacherC.addAssign_Controller);
router.post("/addmaterial", teacherC.addMaterial_Controller);
router.put(
	"/addmarks/:num/student/:sid",
	teacherC.assignMarks_toStudent_Controller
);

//PUT Operations
router.put(
	"/addmarks/:num/student/:sid",
	teacherC.assignMarks_toStudent_Controller
);
//assign quiz to class
router.put(
	"/assign/quiz/:qid/class/:cid",
	teacherC.assignQuiz_toClass_Controller
);

//Delete Operations
router.delete("/delmaterial/:id", teacherC.deleteMaterial_Controller);
router.delete("/delquiz/:id", teacherC.deleteQuiz_Controller);
router.delete("/delassignment/:id", teacherC.deleteAssignment_Controller);
router.delete("/delmarks/:id", teacherC.deleteMarks_Controller);

module.exports = router;
