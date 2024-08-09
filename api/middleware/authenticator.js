const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
    if (err) return res.status(403).json({ err: err + "Invalid token" });

    req.user = data.user_id;
    next();
  });
};

module.exports = authenticator;
