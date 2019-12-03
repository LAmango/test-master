const models = require("../models/card.model.js");
const userModel = require("../users/models.js");
const { CardSet } = models;

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Cardset content cannot be empty"
    });
  }

  const cardset = new CardSet({
    name: req.body.name
  });

  cardset.cards.push({ front: "", back: "" });

  cardset
    .save()
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while creating Cardset"
      });
    });
};

exports.delete = (req, res) => {
  if (!req.params.cardsetId) {
    return res.status(400).send({
      message: "Cannot delete cardset that does not exist"
    });
  }

  CardSet.findByIdAndRemove(req.params.cardsetId)
    .then(cardset => {
      if (!cardset) {
        return res.status(404).send({
          message: "Cardset not found with id " + req.params.cardsetId
        });
      }
      res.send(cardset);
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Cardset not found with id " + req.params.cardsetId
        });
      }
      return res.status(500).send({
        message: "Could not delete Cardset with id " + req.params.cardsetId
      });
    });
};

exports.findAll = (req, res) => {
  CardSet.find()
    .then(cardset => {
      res.send(cardset);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving cardsets"
      });
    });
};

exports.addCard = (req, res) => {
  if (!req.body.card && !req.params.cardId) {
    return res.status(400).send({
      message: "Trying to update cardset with no card!"
    });
  }

  CardSet.findByIdAndUpdate(
    req.params.cardsetId,
    { $push: { cards: req.body.card } },
    { new: true }
  )
    .then(cardset => {
      if (!cardset) {
        return res.status(404).send({
          message: "Cardset not found with id " + req.params.cardsetId
        });
      }
      res.send(cardset);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "CardSet not found with id " + req.params.cardsetId
        });
      }
      return res.status(500).send({
        message: "Error update card with id " + req.params.cardsetId
      });
    });
};

exports.updateCard = (req, res) => {
  if (req.body.delete) {
    CardSet.findByIdAndUpdate(req.params.cardsetId, {
      $pull: { cards: { _id: req.params.cardId } }
    })
      .then(cardset => {
        if (!cardset) {
          return res.status(404).send({
            message: "Cardset not found with id " + req.params.cardsetId
          });
        }
        res.send(cardset);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "CardSet not found with id " + req.params.cardsetId
          });
        }
        return res.status(500).send({
          message: "Error update card with id " + req.params.cardsetId
        });
      });
  } else if (req.body.card.front) {
    CardSet.findOneAndUpdate(
      { _id: req.params.cardsetId, "cards._id": req.params.cardId },
      {
        $set: { "cards.$.front": req.body.card.front }
      },
      {
        new: true
      }
    )
      .then(cardset => {
        if (!cardset) {
          return res.status(404).send({
            message: "Cardset not found with id " + req.params.cardsetId
          });
        }
        res.send(cardset);
      })
      .catch(err => {
        if ((err.kind = "ObjectId")) {
          return res.status(404).send({
            message: "CardSet not found with id " + req.params.cardsetId
          });
        }
        return res.status(500).send({
          message: "Error update card with id " + req.params.cardsetId
        });
      });
  } else if (req.body.card.back) {
    CardSet.findOneAndUpdate(
      { _id: req.params.cardsetId, "cards._id": req.params.cardId },
      {
        $set: { "cards.$.back": req.body.card.back }
      },
      {
        new: true
      }
    )
      .then(cardset => {
        if (!cardset) {
          return res.status(404).send({
            message: "Cardset not found with id " + req.params.cardsetId
          });
        }
        res.send(cardset);
      })
      .catch(err => {
        if ((err.kind = "ObjectId")) {
          return res.status(404).send({
            message: "CardSet not found with id " + req.params.cardsetId
          });
        }
        return res.status(500).send({
          message: "Error update card with id " + req.params.cardsetId
        });
      });
  }
};
