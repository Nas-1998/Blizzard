const User = require("../models/User");

const restrictTo = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user);

      if (roles.includes(user.role)) {
        return next();
      } else {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  };
};

module.exports = restrictTo;
