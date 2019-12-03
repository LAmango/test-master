const models = require("./models.js");
const { Service } = models;

exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "Service must have a title"
    });
  }
  if (!req.body.description) {
    return res.status(400).send({
      message: "Service must have a description"
    });
  }

  const service = new Service({
    title: req.body.title,
    description: req.body.description
  });

  service
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while creating Service"
      });
    });
};

exports.delete = (req, res) => {
  if (!req.params.serviceId) {
    return res.status(400).send({
      message: "Cannot delete service that does not exist"
    });
  }

  Service.findByIdAndRemove(req.params.serviceId)
    .then(service => {
      if (!service) {
        return res.status(404).send({
          message: "Service not found with id " + req.params.serviceId
        });
      }
      res.send(service);
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Service not found with id " + req.params.serviceId
        });
      }
      return res.status(500).send({
        message: "Could not delete Service with id " + req.params.serviceId
      });
    });
};

exports.findAll = (req, res) => {
  Service.find()
    .then(services => {
      res.send(services);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving services"
      });
    });
};

exports.update = (req, res) => {
  if (!req.params.serviceId) {
    return res.status(400).send({
      message: "Cannot udpate service that does not exist"
    });
  }
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({
      message: "Title or description cannot be empty"
    });
  }

  Service.findByIdAndUpdate(req.params.serviceId, {
    title: req.body.title,
    description: req.body.description
  })
    .then(service => {
      if (!service) {
        return res.status(404).send({
          message: "Service not found with id " + req.params.serviceId
        });
      }
      res.send(service);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Service not found with id " + req.params.serviceId
        });
      }
      return res.status(500).send({
        message: "Error updating service with id " + req.params.serviceId
      });
    });
};
