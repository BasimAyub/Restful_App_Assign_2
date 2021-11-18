var express = require("express");
var router = express.Router();
var adminC = require("../Controller/admin");

/* GET Operations */
router.get("/", adminC.adminController);
router.get("/classes", adminC.adminClassesController);
router.get("/students", adminC.adminStudentsController);
router.get("/teachers", adminC.adminTeachersController);
router.get("/quiz", adminC.adminQuizController);
router.get("/assignment", adminC.adminAssignmentController);
router.get("/material", adminC.adminMaterialController);
// not implemented
router.get("/attemptquiz", adminC.View_Attempted_Quiz);
router.get("/attemptassign", adminC.View_Attempted_Assignment);

router.get("/class/:id", adminC.Class_Find_With_Id_Controller);
router.get("/quiz/:id", adminC.Quiz_Find_With_Id_Controller);
router.get("/assignment/:id", adminC.Assignment_Find_With_Id_Controller);
router.get("/material/:id", adminC.Material_Find_With_Id_Controller);
router.get("/student/:id", adminC.Student_Find_With_Id_Controller);
router.get("/teacher/:id", adminC.Teacher_Find_With_Id_Controller);

//POST Operations
router.post("/addteacher", adminC.addTeacher_Controller);
router.post("/addquiz", adminC.addQuiz_Controller);
router.post("/addassign", adminC.addAssign_Controller);
router.post("/addmaterial", adminC.addMaterial_Controller);
router.post("/addstudent", adminC.addStudent_Controller);
router.post("/addclass", adminC.addClass_Controller);

//PUT Operations
//assign students to class
router.put(
	"/assign/student/:sid/class/:cid",
	adminC.assignStudent_toClass_Controller
);

//assign teacher to class
router.put(
	"/assign/teacher/:tid/class/:cid",
	adminC.assignClass_toTeacher_Controller
);

//assign quiz to class
router.put(
	"/assign/quiz/:qid/class/:cid",
	adminC.assignQuiz_toClass_Controller
);

//assign assignment to class
router.put(
	"/assign/assignment/:aid/class/:cid",
	adminC.assignAssignment_toClass_Controller
);

//assign marks to quiz
router.put(
	"/assign/marks/:num/quiz/:qid",
	adminC.assignMarks_toQuiz_Controller
);

//assign marks to student
router.put(
	"/assign/marks/:num/student/:sid",
	adminC.assignMarks_toStudent_Controller
);
//Delete Operations
router.delete("/delmaterial/:id", adminC.deleteMaterial_Controller);
router.delete("/delquiz/:id", adminC.deleteQuiz_Controller);
router.delete("/delassignment/:id", adminC.deleteAssignment_Controller);
router.delete("/delstudent/:id", adminC.deleteStudent_Controller);
router.delete("/delteacher/:id", adminC.deleteTeacher_Controller);
router.delete("/delclass/:id", adminC.deleteClass_Controller);
router.delete("/delmarks/:id", adminC.deleteMarks_Controller);

module.exports = router;
