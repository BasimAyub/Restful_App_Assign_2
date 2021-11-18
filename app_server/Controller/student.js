var classM = require("../Models/class");
var quizM = require("../Models/quiz");
var assignmentM = require("../Models/assignment");
var materialM = require("../Models/material");
var studentM = require("../Models/student");

/* GET Operations */
module.exports.student_Controller = function (req, res, next) {
	res.send("respond with a resource");
};

module.exports.QuizController = function (req, res, next) {
	quizM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.AssignmentController = function (req, res, next) {
	assignmentM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
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

module.exports.Material_Find_With_Id_Controller = function (req, res, next) {
	materialM.find({ _id: req.params.id }).exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.result_Controller = function (req, res, next) {
	studentM
		.find({ _id: req.params.sid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				console.log("Checking for class " + record._id);
				console.log("Quiz of student is " + record.quiz);
				quizM.find({ _id: record.quiz._id }, function (error, results) {
					if (error) {
						return next(error);
					}
				});
			});
			res.json(records);
		});
};

//POST Operations
module.exports.attempt_Quiz_Controller = function (req, res, next) {
	studentM
		.find({ _id: req.params.sid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				console.log("Checking for student " + record._id);
				console.log("Quiz of student is " + record.quiz._id);
				quizM.findOneAndUpdate(
					{ _id: record.quiz._id },
					{ answers: req.body.answers },
					{ new: true, upsert: false },
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

module.exports.submit_Assign_Controller = function (req, res, next) {
	studentM
		.find({ _id: req.params.sid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				console.log("Checking for student " + record._id);
				console.log("Quiz of student is " + record.assignment._id);
				assignmentM.findOneAndUpdate(
					{ _id: record.assignment._id },
					{ answers: req.body.answers },
					{ new: true, upsert: false },
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
