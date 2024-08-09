const { Router } = require("express");
const questionsController = require("../controllers/questions");

const questionsRouter = Router();

// questionsRouter.get("/");
questionsRouter.get("/:eventId", questionsController.show);

module.exports = questionsRouter;
