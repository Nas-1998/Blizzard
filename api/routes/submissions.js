const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const submissionsController = require("../controllers/submissions");
const restrictTo = require("../middleware/restrictTo");

const submissionsRouter = Router();

submissionsRouter.use(authenticator);

submissionsRouter.post("/", submissionsController.create);

submissionsRouter.use(restrictTo(["admin", "teacher"]));

submissionsRouter.get("/", submissionsController.show);

module.exports = submissionsRouter;
