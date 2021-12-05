var classM = require("../Models/class");
var quizM = require("../Models/quiz");
var assignmentM = require("../Models/assignment");
var materialM = require("../Models/material");
var studentM = require("../Models/student");
var QuizAttemptM = require("../Models/QuizAttempt");
var AssignmentAttemptM = require("../Models/AssignmentAttempt");

/* GET Operations */
module.exports.teacherController = function (req, res, next) {
	res.send("respond with a resource");
};

module.exports.viewAttemptedQuizesController = function (req, res, next) {
	QuizAttemptM.find({ class: req.params.cid })
		.populate("student")
		.populate("quiz")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};
module.exports.viewAttemptedAssignmentsController = function (req, res, next) {
	AssignmentAttemptM.find({ class: req.params.cid })
		.populate("student")
		.populate("assignment")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.viewAttemptedQuizWithIdController = function (req, res, next) {
	QuizAttemptM.find({ _id: req.params.aqid })
		.populate("student")
		.populate("quiz")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.viewAttemptedAssignmentWithIdController = function (
	req,
	res,
	next
) {
	AssignmentAttemptM.find({ _id: req.params.aaid })
		.populate("student")
		.populate("assignment")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.materialController = function (req, res, next) {
	materialM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

//POST Operations

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

module.exports.assignMarks_toStudent_Controller = function (req, res, next) {
	QuizAttemptM.findOneAndUpdate(
		{ student: req.params.sid },
		{ marks: req.params.num },
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

//assign material to class
module.exports.assignMaterial_toClass_Controller = function (req, res, next) {
	classM.findOneAndUpdate(
		{ _id: req.params.cid },
		{
			$push: {
				classMaterial: {
					_id: req.params.mid,
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

module.exports.deleteMarks_Controller = function (req, res, next) {
	quizM.findOneAndUpdate(
		{ _id: req.params.id },
		{ totalMarks: 0 },
		function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		}
	);
};
