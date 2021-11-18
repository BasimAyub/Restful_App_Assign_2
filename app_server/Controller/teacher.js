var classM = require("../Models/class");
var quizM = require("../Models/quiz");
var assignmentM = require("../Models/assignment");
var materialM = require("../Models/material");
var studentM = require("../Models/student");

/* GET Operations */
module.exports.teacherController = function (req, res, next) {
	res.send("respond with a resource");
};

module.exports.viewAttemptedQuizesController = function (req, res, next) {
	quizM.find({}).exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.Quiz_Find_With_Id_Controller = function (req, res, next) {
	quizM
		.find({ _id: req.params.id })
		.populate("quizes")
		.exec(function (error, results) {
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

module.exports.materialController = function (req, res, next) {
	materialM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.viewAttemptedAssignmentsController = function (req, res, next) {
	res.send("respond with a resource");
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

//PUT Operations
module.exports.assignMarks_toStudent_Controller = function (req, res, next) {
	studentM
		.find({ _id: req.params.sid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				for (var i = 0; i < record.students.length; i++) {
					quizM.findOneAndUpdate(
						{ obtainedMarks: req.params.num },
						function (error) {
							if (error) {
								return next(error);
							}
						}
					);
				}
			});
			res.json(records);
		});
};

//assign quiz to class
module.exports.assignQuiz_toClass_Controller = function (req, res, next) {
	classM
		.find({ _id: req.params.cid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				console.log("Checking for class " + record._id);
				console.log("Students in class are " + record.students.length);
				for (var i = 0; i < record.students.length; i++) {
					console.log("Checking for student " + record.students[i]._id);
					studentM.findOneAndUpdate(
						{ _id: record.students[i]._id },
						{ quiz: req.params.qid },
						function (error, results) {
							if (error) {
								return next(error);
							}
						}
					);
				}
			});
			res.json(records);
		});
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
