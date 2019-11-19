module.exports = app => {
  const cardset = require("../controllers/cardset.controller.js");

  app.post("/cardsets", cardset.create);

  app.delete("/cardsets/:cardsetId", cardset.delete);

  app.get("/cardsets", cardset.findAll);

  app.put("/cardsets/:cardsetId/:cardId", cardset.updateCard);

  app.post("/cardsets/:cardsetId", cardset.addCard);
};
