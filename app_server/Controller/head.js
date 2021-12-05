var classM = require("../Models/class");
var quizM = require("../Models/quiz");
var assignmentM = require("../Models/assignment");
var materialM = require("../Models/material");
var studentM = require("../Models/student");
var QuizAttemptM = require("../Models/QuizAttempt");
var AssignmentAttemptM = require("../Models/AssignmentAttempt");

/* GET Operations */
module.exports.head_Controller = function (req, res, next) {
	res.send("This is head router");
};

module.exports.ClassController = function (req, res, next) {
	classM
		.find()
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

module.exports.result_Controller = function (req, res, next) {
	var QuizMarks = 0;
	var AssignmentMarks = 0;

	QuizAttemptM.find({ student: req.params.sid })
		.lean()
		.exec(function (err1, list1) {
			if (err1) {
				return next(err1);
			}
			list1.forEach(function (record) {
				QuizMarks = QuizMarks + record.marks;
				AssignmentAttemptM.find({ student: req.params.sid })
					.lean()
					.exec(function (err2, list2) {
						if (err2) {
							return next(err2);
						}
						list2.forEach(function (record2) {
							AssignmentMarks = AssignmentMarks + record2.marks;
						});
						res.json(
							"Quiz marks of student " +
								req.params.sid +
								" are " +
								QuizMarks +
								" and Assignment marks are " +
								AssignmentMarks
						);
					});
			});
		});
};

module.exports.classs_Result_Controller = function (req, res, next) {
	var totalStudents = 0;
	var QuizMarks = 0;
	var AssignmentMarks = 0;
	var QuizList = [];
	var AssignmentList = [];
	classM
		.find({ _id: req.params.cid })
		.lean()
		.exec(function (err1, list1) {
			if (err1) {
				return next(err1);
			}
			list1.forEach(function (record) {
				QuizList = record.classQuiz;
				AssignmentList = record.classAssignment;
				totalStudents = record.classStudents.length;
				for (var i = 0; i < QuizList.length; i++) {
					QuizAttemptM.find({ quiz: QuizList[i] })
						.lean()
						.exec(function (err2, list2) {
							if (err2) {
								return next(err2);
							}
							list2.forEach(function (record2) {
								QuizMarks += record2.marks;
							});
						});
				}
				for (var i = 0; i < AssignmentList.length; i++) {
					AssignmentAttemptM.find({ assignment: AssignmentList[i] })
						.lean()
						.exec(function (err3, list3) {
							if (err3) {
								return next(err3);
							}
							list3.forEach(function (record3) {
								AssignmentMarks += record3.marks;
							});
							res.json(
								"Total Students in class " +
									req.params.cid +
									" are " +
									totalStudents +
									" Quiz marks are " +
									QuizMarks +
									", Assignment marks are " +
									AssignmentMarks
							);
						});
				}
			});
		});
};

module.exports.MaterialController = function (req, res, next) {
	materialM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};
