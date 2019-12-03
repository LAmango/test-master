module.exports = app => {
  const users = require("./controllers.js");

  app.post("/login", users.login);

  app.get("/users", users.findAll);

  app.get("/users/:userId", users.findOne);

  app.put("/users/:userId", users.update);

  app.delete("/users/:userId", users.delete);

  app.post("/register", users.register);

  //app.post("/logout", users.logout);
};
