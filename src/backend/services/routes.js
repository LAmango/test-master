module.exports = app => {
  const services = require("./controllers.js");

  app.post("/services", services.create);

  app.delete("/services/:serviceId", services.delete);

  app.get("/services", services.findAll);

  app.put("/services/:serviceId", services.update);
};
