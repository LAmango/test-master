const models = require("../models/card.model.js");
const { Card } = models;

// Create and Save a new Card
exports.create = (req, res) => {
  //Validate request
  if (!req.body.front || !req.body.back) {
    return res.status(400).send({
      message: "Card content cannot be empty"
    });
  }

  // Create a card
  const card = new Card({
    front: req.body.front,
    back: req.body.back
  });

  card
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Card"
      });
    });
};

// Retrieve and return all cards from the database.
exports.findAll = (req, res) => {
  Card.find()
    .then(cards => {
      res.send(cards);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving cards"
      });
    });
};

// Find a single card with a cardId
exports.findOne = (req, res) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (!card) {
        return res.status(404).send({
          message: "Card not found with id " + req.params.cardId
        });
      }
      res.send(card);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Card not found with id " + req.params.cardId
        });
      }
      return res.status(500).send({
        message: "Error retrieving card with id " + req.params.cardId
      });
    });
};

// Update a card identified by the cardId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.back || !req.body.front) {
    return res.status(400).send({
      message: "Card content can not be empty"
    });
  }
  // Find one card and update it
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      front: req.body.front,
      back: req.body.back
    },
    { new: true }
  )
    .then(card => {
      if (!card) {
        return res.status(404).send({
          message: "Card not found with id " + req.params.cardId
        });
      }
      res.send(card);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Card not found with id " + req.params.cardId
        });
      }
      return res.status(500).send({
        message: "Error updating card with id " + req.params.cardId
      });
    });
};

// Delete a card with the specified cardId in the request
exports.delete = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if (!card) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.cardId
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.cardId
        });
      }
      return res.status(500).send({
        message: "Could not delete card with id " + req.params.cardId
      });
    });
};
