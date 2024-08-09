const { Router } = require("express");
const charactersController = require("../controllers/character");

const characterRouter = Router();

// characterRouter.get("/");
characterRouter.get("/:id", charactersController.show);
characterRouter.get("/", charactersController.showAll);

module.exports = characterRouter;
