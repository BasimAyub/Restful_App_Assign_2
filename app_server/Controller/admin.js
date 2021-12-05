// var adminM = require("../Models/admin");
var classM = require("../Models/class");
var quizM = require("../Models/quiz");
var assignmentM = require("../Models/assignment");
var materialM = require("../Models/material");
var studentM = require("../Models/student");
var teacherM = require("../Models/teacher");
var headM = require("../Models/head");
var QuizAttemptM = require("../Models/QuizAttempt");
var AssignmentAttemptM = require("../Models/AssignmentAttempt");

/* GET Operations */
module.exports.adminController = function (req, res, next) {
	res.send("respond with a resource");
};

module.exports.adminClassesController = function (req, res, next) {
	classM
		.find({})
		.populate("teachers")
		.populate("student.sid")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.adminStudentsController = function (req, res, next) {
	studentM
		.find()
		.sort("name")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.adminTeachersController = function (req, res, next) {
	teacherM
		.find()
		.sort("name")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.adminHeadsController = function (req, res, next) {
	headM
		.find()
		.sort("name")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.adminQuizController = function (req, res, next) {
	quizM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.adminAssignmentController = function (req, res, next) {
	assignmentM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.adminMaterialController = function (req, res, next) {
	materialM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.View_Attempted_Quiz = function (req, res, next) {
	QuizAttemptM.find()
		.populate("student")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.View_Attempted_Assignment = function (req, res, next) {
	assignmentM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.Class_Find_With_Id_Controller = function (req, res, next) {
	classM
		.find({ _id: req.params.id })
		.populate("teachers")
		.populate("student.sid")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.Quiz_Find_With_Id_Controller = function (req, res, next) {
	quizM.find({ _id: req.params.id }).exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.Material_Find_With_Id_Controller = function (req, res, next) {
	materialM.find({ _id: req.params.id }).exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.Assignment_Find_With_Id_Controller = function (req, res, next) {
	assignmentM.find({ _id: req.params.id }).exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.Student_Find_With_Id_Controller = function (req, res, next) {
	studentM
		.findById(req.params.id)
		.then((student) => {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json(student);
		})
		.catch((err) => next(err));
};

module.exports.Teacher_Find_With_Id_Controller = function (req, res, next) {
	teacherM
		.findById(req.params.id)
		.then(
			(teacher) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(teacher);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

//POST Operations
module.exports.addTeacher_Controller = function (req, res, next) {
	var teacher = {
		name: req.body.name,
		designation: req.body.designation,
	};
	teacherM
		.create(teacher)
		.then(
			(teacher) => {
				console.log("Teacher has been Added ", teacher);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(teacher);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

module.exports.addQuiz_Controller = function (req, res, next) {
	var quiz = {
		no: req.body.no,
		questions: req.body.questions,
		answers: req.body.answers,
		totalMarks: req.body.totalMarks,
	};
	quizM
		.create(quiz)
		.then(
			(quiz) => {
				console.log("Quiz has been Added ", quiz);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(quiz);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

module.exports.addAssign_Controller = function (req, res, next) {
	var assignment = {
		no: req.body.no,
		questions: req.body.questions,
		answers: req.body.answers,
		totalMarks: req.body.totalMarks,
	};
	assignmentM
		.create(assignment)
		.then(
			(assignment) => {
				console.log("Assignment has been Added ", assignment);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(assignment);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

module.exports.addMaterial_Controller = function (req, res, next) {
	var material = {
		lectureNo: req.body.lectureNo,
		title: req.body.title,
		descriptipn: req.body.descriptipn,
	};
	materialM
		.create(material)
		.then(
			(material) => {
				console.log("Material has been Added ", material);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(material);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

module.exports.addStudent_Controller = function (req, res, next) {
	var student = {
		name: req.body.name,
		rollno: req.body.rollno,
	};
	studentM
		.create(student)
		.then(
			(student) => {
				console.log("Student has been Added ", student);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(student);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

module.exports.addClass_Controller = function (req, res, next) {
	var Class = {
		name: req.body.name,
	};
	classM
		.create(Class)
		.then(
			(Class) => {
				console.log("Class has been Added ", Class);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(Class);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

//PUT Operations

//assign students to class
module.exports.assignStudent_toClass_Controller = function (req, res, next) {
	classM.findOneAndUpdate(
		{ _id: req.params.cid },
		{
			$push: {
				classStudents: {
					_id: req.params.sid,
				},
			},
		},
		{ new: true, upsert: false },
		function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		}
	);
};

//assign teacher to class
module.exports.assignClass_toTeacher_Controller = function (req, res, next) {
	classM.findOneAndUpdate(
		{ _id: req.params.cid },
		{ teacher: req.params.tid },
		{ new: true, upsert: false },
		function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		}
	);
};

//assign quiz to class
module.exports.assignQuiz_toClass_Controller = function (req, res, next) {
	classM.findOneAndUpdate(
		{ _id: req.params.cid },
		{
			$push: {
				classQuiz: {
					_id: req.params.qid,
				},
			},
		},
		{ new: true, upsert: false },
		function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		}
	);
};

//assign assignment to class
module.exports.assignAssignment_toClass_Controller = function (req, res, next) {
	classM.findOneAndUpdate(
		{ _id: req.params.cid },
		{
			$push: {
				classAssignment: {
					_id: req.params.aid,
				},
			},
		},
		{ new: true, upsert: false },
		function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		}
	);
};

//assign marks to quiz
module.exports.assignMarks_toQuiz_Controller = function (req, res, next) {
	quizM.findOneAndUpdate(
		{ _id: req.params.qid },
		{ totalMarks: req.params.num },
		{ new: true, upsert: false },
		function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		}
	);
};

//Delete Operations
module.exports.deleteMaterial_Controller = function (req, res, next) {
	materialM.deleteOne({ _id: req.params.id }, function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.deleteQuiz_Controller = function (req, res, next) {
	quizM.deleteOne({ _id: req.params.id }, function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.deleteAssignment_Controller = function (req, res, next) {
	assignmentM.deleteOne({ _id: req.params.id }, function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.deleteTeacher_Controller = function (req, res, next) {
	teacherM.deleteOne({ _id: req.params.id }, function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.deleteClass_Controller = function (req, res, next) {
	classM.deleteOne({ _id: req.params.id }, function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.deleteMarks_Controller = function (req, res, next) {
	quizM.findOneAndUpdate(
		{ _id: req.params.id },
		{ totalMarks: 0 },
		{ new: true, upsert: false },
		function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		}
	);
};

module.exports.deleteStudent_Controller = function (req, res, next) {
	studentM.deleteOne({ _id: req.params.id }, function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};
