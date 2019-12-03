module.exports = app => {
  const cards = require("../controllers/card.controller.js");

  // Create a new Card
  app.post("/cards", cards.create);

  // Retrieve all Cardss
  app.get("/cards", cards.findAll);

  // Retrieve a single Card with CardId
  app.get("/cards/:cardId", cards.findOne);

  // Update a Card with CardId
  app.put("/cards/:cardId", cards.update);

  // Delete a Card with CardId
  app.delete("/card/:cardId", cards.delete);
};
