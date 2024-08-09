const { Router } = require("express");
const authenticator = require("../middleware/authenticator");

const usersControllers = require("../controllers/users");

const usersRouter = Router();

usersRouter.post("/signup", usersControllers.signup);
usersRouter.post("/login", usersControllers.login);

usersRouter.use(authenticator);

usersRouter.get("/validate-token", usersControllers.tokenValidation);
usersRouter.get("/stats", usersControllers.showStats);
usersRouter.post("/highscore", usersControllers.updateHighscore);

module.exports = usersRouter;
