module.exports = app => {
  const courses = require("../controllers/course.controller.js");

  // Create a new Card
  app.post("/courses", courses.create);

  // Retrieve all Cardss
  app.get("/courses", courses.findAll);

  // Retrieve a single Card with CardId
  //  app.get("/courses/:courseId", courses.findOne);

  // Update a Card with CardId
  //app.put("/courses/:courseId", courses.update);

  // Delete a Card with CardId
  //app.delete("/courses/:courseId", courses.delete);
};
