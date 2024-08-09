const { Router } = require("express");
const eventsController = require("../controllers/events");

const eventsRouter = Router();

eventsRouter.get("/:characterId", eventsController.index);

module.exports = eventsRouter;
