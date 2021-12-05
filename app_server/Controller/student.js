var classM = require("../Models/class");
var quizM = require("../Models/quiz");
var assignmentM = require("../Models/assignment");
var materialM = require("../Models/material");
var studentM = require("../Models/student");
var QuizAttemptM = require("../Models/QuizAttempt");
var AssignmentAttemptM = require("../Models/AssignmentAttempt");

/* GET Operations */
module.exports.student_Controller = function (req, res, next) {
	res.send("respond with a resource");
};

module.exports.QuizController = function (req, res, next) {
	classM
		.find({ _id: req.params.cid })
		.populate("classQuiz.qid")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			res.json(results);
		});
};

module.exports.AssignmentController = function (req, res, next) {
	classM
		.find({ _id: req.params.cid })
		.populate("classAssignment.aid")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			res.json(results);
		});
};

module.exports.MaterialController = function (req, res, next) {
	materialM.find({ _id: req.params.mid }).exec(function (error, results) {
		if (error) {
			return next(error);
		}
		res.json(results);
	});
};

module.exports.Material_Find_With_Id_Controller = function (req, res, next) {
	classM
		.find({ _id: req.params.cid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				classAssignment.find(
					{ _id: req.params.aid },
					function (error, results) {
						if (error) {
							return next(error);
						}
					}
				);
			});
			res.json(records);
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
							"Quiz marks are " +
								QuizMarks +
								", Assignment marks are " +
								AssignmentMarks
						);
					});
			});
		});
};

module.exports.result_forClass_Controller = function (req, res, next) {
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
								"Quiz marks are " +
									QuizMarks +
									", Assignment marks are " +
									AssignmentMarks
							);
						});
				}
			});
		});
};

//POST Operations
module.exports.attempt_Quiz_Controller = function (req, res, next) {
	var originalAnswers;
	var studentAnswers = req.body.answers;
	var rightAnswers = 0;

	quizM
		.find({ _id: req.params.qid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				originalAnswers = record.answers;
				for (var i = 0; i < originalAnswers.length; i++) {
					if (studentAnswers[i] == originalAnswers[i]) {
						rightAnswers++;
					}
				}
				QuizAttemptM.create({
					student: req.params.sid,
					quiz: req.params.qid,
					class: req.params.cid,
					answers: req.body.answers,
					marks: rightAnswers * 10,
				})
					.then(
						(result) => {
							console.log(
								"Quiz has been attempted by student ",
								req.params.sid
							);
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
						},
						(err) => next(err)
					)
					.catch((err) => next(err));
			});
			res.json(records);
		});
};

module.exports.submit_Assign_Controller = function (req, res, next) {
	var originalAnswers;
	var studentAnswers = req.body.answers;
	var rightAnswers = 0;

	assignmentM
		.find({ _id: req.params.aid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				originalAnswers = record.answers;
				for (var i = 0; i < originalAnswers.length; i++) {
					if (studentAnswers[i] == originalAnswers[i]) {
						rightAnswers++;
					}
				}
				AssignmentAttemptM.create({
					student: req.params.sid,
					assignment: req.params.aid,
					class: req.params.cid,
					answers: req.body.answers,
					marks: rightAnswers * 10,
				})
					.then(
						(result) => {
							console.log(
								"Assignment has been attempted by student ",
								req.params.sid
							);
							res.statusCode = 200;
							// res.setHeader("Content-Type", "application/json");
						},
						(err) => next(err)
					)
					.catch((err) => next(err));
			});
			res.json(records);
		});
};
