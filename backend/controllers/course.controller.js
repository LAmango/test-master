const models = require("../models/card.model.js");
const { Course } = models;

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Course name cannot be empty"
    });
  }

  // Create course
  const course = new Course({
    name: req.body.name
  });

  course
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Course"
      });
    });
};

exports.findAll = (req, res) => {
  Course.find()
    .then(courses => {
      res.send(courses);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving courses"
      });
    });
};
